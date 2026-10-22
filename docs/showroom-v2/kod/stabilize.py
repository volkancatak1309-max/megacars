"""Scale rule (Volkan, 22.10.2026): place every selected frame by COLMAP geometry, never by the car's box.

For each frame:  level the horizon (roll from COLMAP's vertical axis), scale by dist_rel = d_i / median(d)
(the distance camera - car centre), and move the projected car centre to one fixed point.
A frame shot from further away is enlarged exactly as much as the distance says; the car still looks
wide from the side and narrow from the front, as it does in reality. Bounding-box equalising is forbidden.
The same transform is applied to the alpha mask. Colours are not changed (geometric resampling only).

usage: python stabilize.py WORK_DIR
reads WORK_DIR/selected.json + geometry.json, writes WORK_DIR/stab/NNN.{jpg,png}, selected_stab.json, stab_stats.json
"""
import json, os, sys, time
import numpy as np
from PIL import Image

work = sys.argv[1]
sel = json.load(open(os.path.join(work, 'selected.json')))
geom = json.load(open(os.path.join(work, 'geometry.json')))
out = os.path.join(work, 'stab'); os.makedirs(out, exist_ok=True)
t0 = time.time()

g = [geom[os.path.basename(s['src'])] for s in sel]
target = np.median([x['car_center_px'] for x in g], axis=0)     # one fixed point for the car centre
new, widths = [], []
cover_all = None  # pixels that have source content in EVERY frame (no invented pixels at the edges)
for i, (s, x) in enumerate(zip(sel, g)):
    im = Image.open(s['src']).convert('RGB'); al = Image.open(s['mask']).convert('L')
    W, H = im.size
    k = x['dist_rel']                         # scale from distance only
    a = np.radians(x['roll_deg'])             # tilt of the world vertical in this image (y axis points down)
    cxp, cyp = x['car_center_px']
    # forward map: q = target + k * Rot(-a) * (p - car_centre)  -> world vertical becomes image vertical
    # PIL needs the inverse (output -> input): p = car_centre + Rot(a) / k * (q - target)
    ca, sa = np.cos(a), np.sin(a)
    inv = np.array([[ca / k, -sa / k], [sa / k, ca / k]])
    off = np.array([cxp, cyp]) - inv @ target
    coeffs = (inv[0, 0], inv[0, 1], off[0], inv[1, 0], inv[1, 1], off[1])
    im2 = im.transform((W, H), Image.AFFINE, coeffs, resample=Image.BICUBIC, fillcolor=(0, 0, 0))
    al2 = al.transform((W, H), Image.AFFINE, coeffs, resample=Image.BILINEAR, fillcolor=0)
    cov = np.asarray(Image.new('L', (W, H), 255).transform((W, H), Image.AFFINE, coeffs, resample=Image.NEAREST, fillcolor=0)) > 0
    cover_all = cov if cover_all is None else (cover_all & cov)
    p_im, p_al = os.path.join(out, f'{i:03d}.jpg'), os.path.join(out, f'{i:03d}.png')
    im2.save(p_im, quality=97); al2.save(p_al)
    ys, xs = np.nonzero(np.asarray(al2) > 127)
    widths.append(int(xs.max() - xs.min()) if len(xs) else 0)
    new.append({**s, 'src': p_im, 'mask': p_al, 'scale': k, 'roll_fix_deg': round(float(np.degrees(a)), 3)})

Image.fromarray((cover_all * 255).astype(np.uint8)).save(os.path.join(work, 'cover_all.png'))
json.dump(new, open(os.path.join(work, 'selected_stab.json'), 'w'), indent=1)
st = {
    'frames': len(new),
    'scale_min_max': [round(min(n['scale'] for n in new), 4), round(max(n['scale'] for n in new), 4)],
    'roll_fix_max_deg': round(max(abs(n['roll_fix_deg']) for n in new), 3),
    'car_center_target_px': [round(float(v), 1) for v in target],
    # natural change of the car's width while it turns (kept, not equalised)
    'car_width_px_min_max': [min(widths), max(widths)],
    'car_width_ratio_max_over_min': round(max(widths) / max(1, min(widths)), 2),
    'seconds': round(time.time() - t0, 1),
}
json.dump(st, open(os.path.join(work, 'stab_stats.json'), 'w'), indent=1)
print(json.dumps(st, indent=1))
