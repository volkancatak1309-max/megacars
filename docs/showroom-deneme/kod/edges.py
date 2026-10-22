import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import numpy as np
from PIL import Image, ImageDraw
import showroom as sr
S = os.path.dirname(os.path.abspath(__file__))
bg = sr.procedural_background()
# regions in ORIGINAL photo coordinates (1440x1080): name -> [(label, (cx, cy))]
R = {
 'mercedes-s-560-4matic': [('ayna', (1150, 380)), ('jant', (880, 790)), ('cam-A-direk', (640, 300)), ('tavan-anten', (1010, 210))],
 'porsche-panamera-e-hybrid-s': [('ayna', (1120, 440)), ('jant', (850, 800)), ('cam-A-direk', (640, 380)), ('tavan', (1000, 270))],
 'audi-q3-35-tdi': [('ayna', (520, 460)), ('jant', (560, 700)), ('cam-ust', (760, 400)), ('tavan-ray', (520, 330))],
}
HALF = 110  # 220x220 source px -> 440x440 at 200 %
out_dir = os.path.join(S, 'edges'); os.makedirs(out_dir, exist_ok=True)
for name, regs in R.items():
    orig = Image.open(os.path.join(S, 'orig', name + '.webp')).convert('RGB')
    cut = orig.copy(); al = np.asarray(Image.open(os.path.join(S, 'trial', name + '-birefnet-general.png')).getchannel('A')).copy()
    al[al >= 250] = 255; cut.putalpha(Image.fromarray(al))
    comp, (x0, y0, ox, oy, cw, ch) = sr.composite(bg, cut)
    tiles = []
    for label, (cx, cy) in regs:
        X, Y = cx - x0 + ox, cy - y0 + oy
        c = comp.crop((X - HALF, Y - HALF, X + HALF, Y + HALF)).resize((HALF * 4, HALF * 4), Image.NEAREST)
        o = orig.crop((cx - HALF, cy - HALF, cx + HALF, cy + HALF)).resize((HALF * 4, HALF * 4), Image.NEAREST)
        pair = Image.new('RGB', (HALF * 8 + 6, HALF * 4 + 30), (24, 24, 24))
        pair.paste(o, (0, 30)); pair.paste(c, (HALF * 4 + 6, 30))
        ImageDraw.Draw(pair).text((8, 8), f'{name} | {label} | sol: orijinal  sag: showroom (%200)', fill=(220, 220, 220))
        pair.save(os.path.join(out_dir, f'{name}-{label}.jpg'), quality=85); tiles.append(pair)
    sheet = Image.new('RGB', (tiles[0].width, sum(t.height for t in tiles)))
    y = 0
    for t in tiles: sheet.paste(t, (0, y)); y += t.height
    sheet.save(os.path.join(S, f'edges-{name}.jpg'), quality=80)
    print(name, 'ok')
