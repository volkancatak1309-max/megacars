"""Showroom composite trial for Mega Cars v2.

Places a background-removed car (RGBA, untouched colour pixels) on a dark showroom
floor with a turntable, a contact shadow and a faint floor reflection.

usage: python showroom.py BG(or 'procedural') OUT_DIR CUTOUT.png [CUTOUT.png ...]
"""
import sys, os, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1600, 1000
CX, CY = 800, 770          # platform centre (ellipse centre on the floor)
RX, RY = 680, 110          # platform ellipse radii (perspective ~0.2)
RIM = 16                   # visible platform side height


def procedural_background(theta_deg=0.0):
    """Dark matte room, soft overhead light, round turntable. No AI involved."""
    rng = np.random.default_rng(7)
    y, x = np.mgrid[0:H, 0:W].astype(np.float32)
    horizon = 560.0
    # wall: charcoal with soft light pool from above
    wall = 0.07 + 0.10 * np.exp(-(((x - CX) / 900) ** 2 + ((y + 250) / 700) ** 2))
    # floor: matte, lit in the middle, darker to the front and sides
    floor = 0.10 + 0.09 * np.exp(-(((x - CX) / 750) ** 2 + ((y - 700) / 420) ** 2))
    t = np.clip((y - (horizon - 70)) / 140, 0, 1)
    t = t * t * (3 - 2 * t)                      # smooth cove wall -> floor
    lum = wall * (1 - t) + floor * t
    lum *= 1 - 0.35 * (np.abs(x - CX) / CX) ** 2  # side vignette
    rgb = np.stack([lum * 0.97, lum * 0.985, lum * 1.03], -1)  # neutral, very slightly cool
    img = Image.fromarray(np.clip(rgb * 255, 0, 255).astype(np.uint8), 'RGB')

    d = ImageDraw.Draw(img, 'RGBA')
    # platform side (cylinder band)
    d.ellipse([CX - RX, CY - RY + RIM, CX + RX, CY + RY + RIM], fill=(18, 18, 21, 255))
    # platform top
    top = Image.new('L', (W, H), 0)
    ImageDraw.Draw(top).ellipse([CX - RX, CY - RY, CX + RX, CY + RY], fill=255)
    tl = 0.13 + 0.07 * np.exp(-(((x - CX) / 520) ** 2 + ((y - CY + 30) / 160) ** 2))
    toprgb = np.stack([tl * 0.98, tl, tl * 1.03], -1)
    topimg = Image.fromarray(np.clip(toprgb * 255, 0, 255).astype(np.uint8), 'RGB')
    img.paste(topimg, (0, 0), top)
    d = ImageDraw.Draw(img, 'RGBA')
    # thin rim highlight + inner groove
    d.ellipse([CX - RX, CY - RY, CX + RX, CY + RY], outline=(70, 72, 78, 255), width=2)
    d.ellipse([CX - RX + 26, CY - RY + 5, CX + RX - 26, CY + RY - 5], outline=(32, 33, 37, 255), width=1)
    # rotation ticks on the rim band (rotate with theta, lights stay fixed)
    for k in range(120):
        a = math.radians(k * 3 + theta_deg)
        sx, sy = CX + RX * math.cos(a), CY + RY * math.sin(a)
        if math.sin(a) < 0.05:          # only the front (visible) half of the side band
            continue
        long_ = (k % 10 == 0)
        L = RIM if long_ else RIM * 0.55
        c = (88, 90, 96, 255) if long_ else (46, 47, 52, 255)
        d.line([sx, sy + 2, sx, sy + 2 + L], fill=c, width=1)
    # film grain against banding
    arr = np.asarray(img).astype(np.int16)
    arr += rng.integers(-2, 3, arr.shape[:2])[..., None]
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGB')


def lower_envelope(alpha):
    """y of the lowest opaque pixel per column (-1 if empty)."""
    a = alpha > 128
    hh = a.shape[0]
    has = a.any(0)
    last = hh - 1 - np.argmax(a[::-1, :], 0)
    return np.where(has, last, -1)


def composite(bg_small, cut, target_w=1060):
    """Car stays at native resolution; the room is scaled to the car instead."""
    a = np.asarray(cut.getchannel('A'))
    ys, xs = np.nonzero(a > 10)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    car = cut.crop((x0, y0, x1 + 1, y1 + 1))
    k = car.width / target_w                     # room scale factor
    Wk, Hk = round(W * k), round(H * k)
    cx, cy, ry = CX * k, CY * k, RY * k
    out = bg_small.resize((Wk, Hk), Image.LANCZOS).convert('RGBA')
    cw, ch = car.size
    ox = round(cx - cw / 2)
    oy = round(cy + ry * 0.30 - ch)

    # 1) faint floor reflection: mirrored car, fading out fast, blurred (matte floor)
    refl = car.transpose(Image.FLIP_TOP_BOTTOM)
    fade = np.clip(1 - np.arange(ch) / (ch * 0.32), 0, 1) ** 1.6
    ra = (np.asarray(refl.getchannel('A')).astype(np.float32) / 255) * fade[:, None] * 0.10
    refl.putalpha(Image.fromarray((ra * 255).astype(np.uint8)))
    refl = refl.filter(ImageFilter.GaussianBlur(3 * k))
    layer = Image.new('RGBA', out.size, (0, 0, 0, 0))
    layer.paste(refl, (ox, oy + ch - round(6 * k)), refl)
    out = Image.alpha_composite(out, layer)

    # 2) shadows (multiply): soft ambient pool + tight contact under the lowest points
    env = lower_envelope(np.asarray(car.getchannel('A')))
    cols = np.nonzero(env >= 0)[0]
    base = oy + env.max()
    amb = Image.new('L', (Wk, Hk), 0)
    ImageDraw.Draw(amb).ellipse([ox + cw * 0.04, base - ch * 0.07, ox + cw * 0.96, base + ch * 0.05], fill=255)
    amb = np.asarray(amb.filter(ImageFilter.GaussianBlur(38 * k))).astype(np.float32) / 255 * 0.78
    con = np.zeros((Hk, Wk), np.float32)
    ground_tol = ch * 0.06
    for c in cols:
        yb = oy + env[c]
        if base - yb < ground_tol:
            con[yb - 2:yb + 4, ox + c] = 0.9 * (1 - (base - yb) / ground_tol)
    con = np.asarray(Image.fromarray((con * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3 * k))).astype(np.float32) / 255
    sh = np.clip(np.maximum(amb, con * 1.9), 0, 0.92)
    o = np.asarray(out).astype(np.float32)
    o[..., :3] *= (1 - sh)[..., None]
    out = Image.fromarray(o.astype(np.uint8), 'RGBA')

    # 3) the car itself: alpha only, colour pixels untouched, no resampling
    out.alpha_composite(car, (ox, oy))
    return out.convert('RGB'), (x0, y0, ox, oy, cw, ch)


def proof_untouched(out, original, geo, alpha):
    """Max colour difference between the composite and the ORIGINAL photo on fully opaque car pixels (must be 0)."""
    x0, y0, ox, oy, cw, ch = geo
    src = np.asarray(original.convert('RGB').crop((x0, y0, x0 + cw, y0 + ch))).astype(np.int16)
    dst = np.asarray(out.crop((ox, oy, ox + cw, oy + ch))).astype(np.int16)
    m = np.asarray(alpha.crop((x0, y0, x0 + cw, y0 + ch))) == 255
    return int(np.abs(src[m] - dst[m]).max()), int(m.sum())


if __name__ == '__main__':
    bgarg, outdir, cuts = sys.argv[1], sys.argv[2], sys.argv[3:]
    os.makedirs(outdir, exist_ok=True)
    bg = procedural_background() if bgarg == 'procedural' else Image.open(bgarg).convert('RGB').resize((W, H), Image.LANCZOS)
    bg.save(os.path.join(outdir, 'zemin.jpg'), quality=90)
    for c in cuts:
        name = os.path.basename(c).split('-birefnet')[0]
        # take ONLY the mask from the segmentation output; colour comes straight from the original photo
        # (rembg's RGBA output is pre-multiplied by the mask, i.e. slightly darkened at alpha<255)
        orig = Image.open(os.path.join(os.path.dirname(os.path.abspath(sys.argv[0])), 'orig', name + '.webp')).convert('RGB')
        cut = orig.copy(); cut.putalpha(Image.open(c).getchannel('A'))
        # mask-only fix: BiRefNet leaves the body at alpha 250-254, which would blend 1-2 % of the
        # new floor INTO the paint. Snap the core to fully opaque; soft edges (<250) stay as they are.
        al = np.asarray(cut.getchannel('A')).copy(); al[al >= 250] = 255; cut.putalpha(Image.fromarray(al))
        out, geo = composite(bg, cut)
        out.save(os.path.join(outdir, f'{name}-showroom-full.png'))
        out.resize((W, H), Image.LANCZOS).save(os.path.join(outdir, f'{name}-showroom.jpg'), quality=88)
        diff, n = proof_untouched(out, orig, geo, cut.getchannel('A'))
        print(name, 'canvas', out.size, 'car', geo[4:], 'opaque px', n, 'max colour diff vs original', diff)
