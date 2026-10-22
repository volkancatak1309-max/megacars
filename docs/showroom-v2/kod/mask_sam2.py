"""Temporally consistent car mask with SAM 2.1 (video mode). Apache-2.0 model, runs locally.

usage: python mask_sam2.py FRAMES_DIR OUT_DIR PROMPTS.json
PROMPTS.json: {"frame": 0, "box": [x0,y0,x1,y1], "neg": [[x,y],...], "extra": [{"frame": k, "pos": [[x,y]], "neg": [[x,y]]}]}
Writes OUT_DIR/NNNNN.png (0/255) for every frame and OUT_DIR/timing.json.
"""
import json, os, sys, time
import numpy as np
import torch
from PIL import Image
from sam2.build_sam import build_sam2_video_predictor_hf

frames, out, prompts = sys.argv[1], sys.argv[2], json.load(open(sys.argv[3]))
os.makedirs(out, exist_ok=True)
t0 = time.time()
pred = build_sam2_video_predictor_hf("facebook/sam2.1-hiera-small", device="cuda")
t_load = time.time() - t0

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    state = pred.init_state(video_path=frames, offload_video_to_cpu=True, offload_state_to_cpu=True)
    neg = np.array(prompts.get("neg", []), dtype=np.float32).reshape(-1, 2)
    pred.add_new_points_or_box(state, frame_idx=prompts["frame"], obj_id=1,
                               box=np.array(prompts["box"], dtype=np.float32),
                               points=neg if len(neg) else None,
                               labels=np.zeros(len(neg), np.int32) if len(neg) else None)
    for ex in prompts.get("extra", []):
        pts = ex.get("pos", []) + ex.get("neg", [])
        lab = [1] * len(ex.get("pos", [])) + [0] * len(ex.get("neg", []))
        pred.add_new_points_or_box(state, frame_idx=ex["frame"], obj_id=1,
                                   points=np.array(pts, np.float32), labels=np.array(lab, np.int32))
    t1 = time.time()
    n = 0
    for fidx, obj_ids, logits in pred.propagate_in_video(state):
        m = (logits[0, 0] > 0).cpu().numpy().astype(np.uint8) * 255
        Image.fromarray(m).save(os.path.join(out, f"{fidx:05d}.png"))
        n += 1
    t_prop = time.time() - t1

json.dump({"frames": n, "model_load_s": round(t_load, 1), "propagate_s": round(t_prop, 1),
           "gpu_peak_mb": round(torch.cuda.max_memory_allocated() / 2**20)},
          open(os.path.join(out, "timing.json"), "w"), indent=1)
print(open(os.path.join(out, "timing.json")).read())
