"""Edge refinement: BiRefNet (MIT) alpha, limited to the SAM 2.1 region (drops props and other salient objects).

usage: python refine_birefnet.py WORK_DIR
reads/updates WORK_DIR/selected.json (mask -> refined alpha), writes WORK_DIR/alpha/NNN.png
"""
import json, os, sys, time
import numpy as np
import torch
from PIL import Image, ImageFilter
from torchvision import transforms
from transformers import AutoModelForImageSegmentation

work = sys.argv[1]
sel = json.load(open(os.path.join(work, 'selected.json')))
out = os.path.join(work, 'alpha'); os.makedirs(out, exist_ok=True)
t0 = time.time()
model = AutoModelForImageSegmentation.from_pretrained('ZhengPeng7/BiRefNet', trust_remote_code=True)
model.to('cuda').eval().half()
t_load = time.time() - t0
tf = transforms.Compose([transforms.Resize((1024, 1024)), transforms.ToTensor(),
                         transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])])
t1 = time.time()
for i, s in enumerate(sel):
    im = Image.open(s['src']).convert('RGB')
    with torch.no_grad():
        pred = model(tf(im).unsqueeze(0).to('cuda').half())[-1].sigmoid()[0, 0].float().cpu().numpy()
    bir = np.asarray(Image.fromarray((pred * 255).astype(np.uint8)).resize(im.size, Image.BILINEAR)).astype(np.float32) / 255
    sam = Image.open(s['mask']).convert('L')
    core = np.asarray(sam.filter(ImageFilter.MinFilter(11))).astype(np.float32) / 255
    region = np.asarray(sam.filter(ImageFilter.MaxFilter(31))).astype(np.float32) / 255
    a = np.maximum(core, bir * region)
    a[a >= 0.98] = 1.0  # mask-only: solid body, soft edges stay soft
    p = os.path.join(out, f'{i:03d}.png')
    Image.fromarray((a * 255 + 0.5).astype(np.uint8)).save(p)
    s['mask'] = p
json.dump(sel, open(os.path.join(work, 'selected.json'), 'w'), indent=1)
t = {'model_load_s': round(t_load, 1), 'refine_s': round(time.time() - t1, 1), 'per_frame_s': round((time.time() - t1) / len(sel), 2),
     'gpu_peak_mb': round(torch.cuda.max_memory_allocated() / 2**20)}
json.dump(t, open(os.path.join(work, 'birefnet_timing.json'), 'w'), indent=1)
print(t)
