import sys, time, os
from rembg import new_session, remove
from PIL import Image
model, out = sys.argv[1], sys.argv[2]
sess = new_session(model)
for src in sys.argv[3:]:
    t=time.time(); im = Image.open(src).convert('RGB')
    name = os.path.basename(os.path.dirname(os.path.abspath(src)))
    cut = remove(im, session=sess)  # RGBA, colour pixels untouched, only alpha added
    cut.save(f"{out}/{name}-{model}.png")
    print(name, model, cut.size, round(time.time()-t,1), 's')
