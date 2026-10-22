"""Backdrop replacement + export for the 360 pipeline (Mega Cars v2).

Keeps the car (alpha) and the real floor around it; everything else becomes a seamless backdrop.
Car colour pixels are never changed: inside the keep-mask the output equals the source frame.

usage: python composite.py WORK_DIR OUT_DIR
  WORK_DIR/selected_stab.json (frames placed by the scale rule, see stabilize.py), else selected.json
  [{"src": ".../frame.jpg", "mask": ".../alpha.png", "angle": deg}, ...]
  writes OUT_DIR/{A,B}/{1440,960}/NNN.webp and OUT_DIR/stats.json
"""
import json, os, sys, time
import numpy as np
from PIL import Image, ImageFilter

work, out = sys.argv[1], sys.argv[2]
sel_file = 'selected_stab.json' if os.path.exists(os.path.join(work, 'selected_stab.json')) else 'selected.json'
sel = json.load(open(os.path.join(work, sel_file), encoding='utf-8'))
t0 = time.time()

first = np.asarray(Image.open(sel[0]['src']).convert('RGB'))
H, W = first.shape[:2]

# --- real floor region -------------------------------------------------------------
# Static camera + rotating stage: the floor around the car is the same ellipse in every
# frame. Estimated from the union of the lower parts of all car masks (the swept footprint).
# For an orbit shoot this ellipse comes from the COLMAP ground plane instead.
alphas = [np.asarray(Image.open(s['mask']).convert('L')).astype(np.float32) / 255 for s in sel]
foot = np.zeros((H, W), np.float32)
for a in alphas:
    ys, xs = np.nonzero(a > 0.5)
    if len(ys) == 0:
        continue
    y_lo = np.percentile(ys, 99.5)
    band = (a > 0.5) & (np.arange(H)[:, None] > y_lo - 0.18 * (ys.max() - ys.min()))
    foot = np.maximum(foot, band.astype(np.float32))
ys, xs = np.nonzero(foot)
cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
rx, ry = (xs.max() - xs.min()) / 2 * 1.12, (ys.max() - ys.min()) / 2 * 1.35
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
ell = (((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2) <= 1
floor = Image.fromarray((ell * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.035 * W))
floor = np.asarray(floor).astype(np.float32) / 255  # soft edge into the backdrop

# --- seamless backdrops ------------------------------------------------------------
def backdrop(kind):
    v = yy / H
    r = np.sqrt(((xx - cx) / (0.9 * W)) ** 2 + ((yy - cy) / (0.9 * H)) ** 2)
    if kind == 'A':   # light studio: off-white sweep, slightly darker towards the floor and edges
        lum = 0.93 - 0.07 * v - 0.05 * r
        rgb = np.stack([lum, lum * 0.996, lum * 0.988], -1)
    else:             # dark hall: near black, soft pool of light around the stage
        lum = 0.055 + 0.07 * np.exp(-(((xx - cx) / (0.55 * W)) ** 2 + ((yy - cy) / (0.45 * H)) ** 2))
        rgb = np.stack([lum * 0.97, lum * 0.985, lum * 1.03], -1)
    noise = np.random.default_rng(3).normal(0, 0.004, (H, W, 1))
    return np.clip(rgb + noise, 0, 1).astype(np.float32)

backs = {k: backdrop(k) for k in ('A', 'B')}

# --- 4:3 crop around the stage centre, inside the area every frame really covers --------------
cov_path = os.path.join(work, 'cover_all.png')
valid = (np.asarray(Image.open(cov_path)) > 0) if (sel_file == 'selected_stab.json' and os.path.exists(cov_path)) else np.ones((H, W), bool)
ii = np.pad(valid.astype(np.int32).cumsum(0).cumsum(1), ((1, 0), (1, 0)))
def full(x0, y0, w, h):  # every pixel of the rectangle has source content
    return x0 >= 0 and y0 >= 0 and x0 + w <= W and y0 + h <= H and \
        ii[y0 + h, x0 + w] - ii[y0, x0 + w] - ii[y0 + h, x0] + ii[y0, x0] == w * h
crop = None
for ch in range(H, H // 2, -2):
    cw = int(round(ch * 4 / 3)); x0 = int(round(min(max(cx - cw / 2, 0), W - cw)))
    for y0 in sorted(range(0, H - ch + 1, 2), key=lambda y: abs(y - (H - ch) / 2)):
        if full(x0, y0, cw, ch):
            crop = (x0, y0, cw, ch); break
    if crop: break
x0, y0, cw, ch = crop
sizes = {1440: (1440, 1080), 960: (960, 720)}
stats = {'frames': len(sel), 'source': sel_file, 'stage_center': [round(cx), round(cy)], 'crop': [x0, y0, cw, ch], 'bytes': {}}
for k in backs:
    for s in sizes:
        os.makedirs(os.path.join(out, k, str(s)), exist_ok=True)
        stats['bytes'][f'{k}/{s}'] = 0

untouched_max = 0
for i, (s, a) in enumerate(zip(sel, alphas)):
    src = np.asarray(Image.open(s['src']).convert('RGB')).astype(np.float32) / 255
    keep = np.maximum(a, floor)[..., None]
    for k, bg in backs.items():
        comp = src * keep + bg * (1 - keep)
        img8 = (np.clip(comp, 0, 1) * 255 + 0.5).astype(np.uint8)
        if k == 'B':
            m = a >= 0.999
            if m.any():
                untouched_max = max(untouched_max, int(np.abs(img8[m].astype(int) - (src[m] * 255 + 0.5).astype(int)).max()))
        crop_img = Image.fromarray(img8[y0:y0 + ch, x0:x0 + cw])
        for sz, (w, h) in sizes.items():
            p = os.path.join(out, k, str(sz), f'{i:03d}.webp')
            crop_img.resize((w, h), Image.LANCZOS).save(p, 'WEBP', quality=80, method=6)
            stats['bytes'][f'{k}/{sz}'] += os.path.getsize(p)
    if i == 0:
        for k in backs:
            for sz in sizes:
                stats.setdefault('first_frame_bytes', {})[f'{k}/{sz}'] = os.path.getsize(os.path.join(out, k, str(sz), '000.webp'))

stats['car_pixels_max_diff'] = untouched_max
stats['seconds'] = round(time.time() - t0, 1)
json.dump(stats, open(os.path.join(out, 'stats.json'), 'w'), indent=1)
print(json.dumps(stats, indent=1))
