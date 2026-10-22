"""Camera poses with COLMAP (pycolmap) -> angle and distance of every frame around the car centre
-> 72 frames at equal angle steps + per-frame geometry for the scale rule.

Only features inside the car mask are used, so the result is the camera path *relative to the car*.
That works for both shoots: walking around a parked car, and a car on a turntable in front of a fixed camera.

Scale rule (Volkan, 22.10.2026): frames are scaled by the COLMAP distance "camera - car centre";
camera height and horizon are kept fixed. Equalising the car's bounding box per frame is forbidden
(the car would seem to grow and shrink while turning; wide from the side, narrow from the front is natural).

usage: python sfm_angles.py FRAMES_DIR MASKS_DIR WORK_DIR N_SELECT [--reuse]
  --reuse  load WORK_DIR/sfm_out/0 instead of running COLMAP again; keeps an existing selected.json
writes WORK_DIR/angles.json, WORK_DIR/sfm_stats.json, WORK_DIR/geometry.json (and selected.json)
"""
import json, os, shutil, sys, time
import numpy as np
import pycolmap
from PIL import Image, ImageFilter

frames, masks, work, nsel = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
reuse = '--reuse' in sys.argv
img_dir, msk_dir, db = os.path.join(work, 'sfm_img'), os.path.join(work, 'sfm_mask'), os.path.join(work, 'sfm.db')
names = sorted(f for f in os.listdir(frames) if f.endswith('.jpg'))
full_w = Image.open(os.path.join(frames, names[0])).width
SFM_W = 1280
t = {}

if reuse:
    rec = pycolmap.Reconstruction(os.path.join(work, 'sfm_out', '0'))
else:
    for d in (img_dir, msk_dir, os.path.join(work, 'sfm_out')):
        shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    if os.path.exists(db): os.remove(db)
    t0 = time.time()
    for f in names:
        im = Image.open(os.path.join(frames, f)).convert('RGB')
        h = round(im.height * SFM_W / im.width)
        im.resize((SFM_W, h), Image.LANCZOS).save(os.path.join(img_dir, f), quality=95)
        m = Image.open(os.path.join(masks, f.replace('.jpg', '.png'))).convert('L').resize((SFM_W, h), Image.NEAREST)
        m.filter(ImageFilter.MinFilter(9)).save(os.path.join(msk_dir, f + '.png'))  # no features on the silhouette edge
    t['prepare_s'] = time.time() - t0
    t0 = time.time()
    ext = pycolmap.FeatureExtractionOptions(); ext.max_image_size = SFM_W; ext.sift.max_num_features = 8192
    pycolmap.extract_features(db, img_dir, camera_mode=pycolmap.CameraMode.SINGLE,
                              reader_options=pycolmap.ImageReaderOptions(mask_path=msk_dir, camera_model='SIMPLE_RADIAL'),
                              extraction_options=ext)
    t['features_s'] = time.time() - t0
    t0 = time.time()
    pair = pycolmap.SequentialPairingOptions(); pair.overlap = 15; pair.quadratic_overlap = True
    pycolmap.match_sequential(db, pairing_options=pair)
    t['matching_s'] = time.time() - t0
    t0 = time.time()
    recs = pycolmap.incremental_mapping(db, img_dir, os.path.join(work, 'sfm_out'))
    t['mapping_s'] = time.time() - t0
    rec = max(recs.values(), key=lambda r: r.num_reg_images())

# --- camera centres, rotations, up vectors (ordered by frame) ---------------------------------
items = []
for img in rec.images.values():
    cfw = img.cam_from_world() if callable(getattr(img, 'cam_from_world', None)) else img.cam_from_world
    R = np.asarray(cfw.rotation.matrix()); tr = np.asarray(cfw.translation)
    items.append({'name': img.name, 'R': R, 't': tr, 'C': -R.T @ tr, 'up': R.T @ np.array([0, -1, 0]), 'cam': img.camera_id})
items.sort(key=lambda x: x['name'])
C = np.array([it['C'] for it in items]); up = np.mean([it['up'] for it in items], axis=0)

# plane of the camera path -> its normal is the vertical axis through the car
mu = C.mean(0); _, _, Vt = np.linalg.svd(C - mu)
nrm = Vt[2] * (1 if Vt[2] @ up > 0 else -1)
u_ax = Vt[0]; v_ax = np.cross(nrm, u_ax)
P = np.c_[(C - mu) @ u_ax, (C - mu) @ v_ax]
A = np.c_[2 * P, np.ones(len(P))]; b = (P ** 2).sum(1)
cx, cy, c = np.linalg.lstsq(A, b, rcond=None)[0]; r = np.sqrt(c + cx ** 2 + cy ** 2)
ang = np.degrees(np.unwrap(np.arctan2(P[:, 1] - cy, P[:, 0] - cx)))
direction = 'ccw' if ang[-1] > ang[0] else 'cw'      # camera path seen from above (right-handed u, v, up)
if direction == 'cw':
    ang = -ang
ang -= ang.min()

# car centre: on the rotation axis, at the median height of the reconstructed car points
axis_pt = mu + cx * u_ax + cy * v_ax
X = np.array([p.xyz for p in rec.points3D.values()])
car = axis_pt + nrm * float(np.median((X - axis_pt) @ nrm))
dist = np.linalg.norm(C - car, axis=1)
d_ref = float(np.median(dist))
height = (C - car) @ nrm

# projection of the car centre and roll of the world vertical in every image (full-resolution pixels)
k_full = full_w / SFM_W
def project(it, Xw):
    cam = rec.cameras[it['cam']]
    f, ccx, ccy = cam.params[0], cam.params[1], cam.params[2]
    kr = cam.params[3] if len(cam.params) > 3 else 0.0
    Xc = it['R'] @ Xw + it['t']; x = Xc[:2] / Xc[2]; rr = x @ x
    return (f * x * (1 + kr * rr) + np.array([ccx, ccy])) * k_full
geom = {}
for it, a, d, h in zip(items, ang, dist, height):
    nc = it['R'] @ nrm
    geom[it['name']] = {
        'angle': round(float(a), 3),
        'dist_rel': round(float(d / d_ref), 5),          # scale factor for this frame = dist_rel
        'height_rel': round(float(h / d_ref), 5),
        'car_center_px': [round(float(v), 2) for v in project(it, car)],
        'roll_deg': round(float(np.degrees(np.arctan2(nc[0], -nc[1]))), 3),
    }

stats = {
    'registered': rec.num_reg_images(), 'frames': len(names), 'points3D': rec.num_points3D(),
    'arc_deg': round(float(ang.max()), 1), 'camera_direction_seen_from_above': direction,
    'radius_rel_std_pct': round(float(np.hypot(P[:, 0] - cx, P[:, 1] - cy).std() / r * 100), 2),
    'height_rel_std_pct': round(float(height.std() / d_ref * 100), 2),
    'dist_rel_min_max': [round(float(dist.min() / d_ref), 4), round(float(dist.max() / d_ref), 4)],
    'mean_reproj_error_px': round(float(rec.compute_mean_reprojection_error()), 3),
    **{k: round(v, 1) for k, v in t.items()},
}
json.dump({'stats': stats, 'frames': [{'name': it['name'], 'angle': round(float(a), 2)} for it, a in zip(items, ang)]},
          open(os.path.join(work, 'angles.json'), 'w'), indent=1)
json.dump(geom, open(os.path.join(work, 'geometry.json'), 'w'), indent=1)

# --- 72 frames at equal angle steps around the car centre ----------------------------------------
sel_path = os.path.join(work, 'selected.json')
targets = np.linspace(0, ang.max(), nsel)
if reuse and os.path.exists(sel_path):
    sel = json.load(open(sel_path))
    gaps = [abs(s['angle'] - s['target']) for s in sel]
else:
    sel, gaps = [], []
    for tg in targets:
        i = int(np.argmin(np.abs(ang - tg)))
        gaps.append(abs(float(ang[i] - tg)))
        name = items[i]['name']
        sel.append({'src': os.path.join(frames, name), 'mask': os.path.join(masks, name.replace('.jpg', '.png')),
                    'angle': round(float(ang[i]), 2), 'target': round(float(tg), 2)})
    json.dump(sel, open(sel_path, 'w'), indent=1)
stats['selected'] = nsel
stats['step_deg'] = round(float(ang.max() / (nsel - 1)), 2)
stats['max_target_gap_deg'] = round(max(gaps), 2)
stats['duplicate_frames'] = nsel - len({s['src'] for s in sel})
json.dump(stats, open(os.path.join(work, 'sfm_stats.json'), 'w'), indent=1)
print(json.dumps(stats, indent=1))
