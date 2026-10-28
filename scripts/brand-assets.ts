/**
 * Every logo file on the site comes from ONE source: assets/brand/logo.png (the dealer's
 * own logo; Volkan, 28.10.2026). When the gallery sends its original file, replace that
 * file and run `npm run brand` (it also runs before every build). Nothing is redrawn,
 * recoloured or sharpened: the logo is only scaled down and converted to web formats.
 *
 * Written here:
 * - public/brand/logo-<hash>-<w>.webp  the logo with a transparent ground (several widths)
 * - lib/brand/logo.json                sizes and file names for <Logo> and the opening screen
 * - app/icon.png, app/apple-icon.png   the whole logo, scaled down, on its own ground
 * - public/og/default.jpg              1200 × 630 share image, the whole logo on its own ground
 *
 * Transparent ground: a logo drawn on a black ground is "unscreened". The ground is not flat
 * zero but a little noise (0–2 of 255 in this file); T is its ceiling, measured in the empty
 * margin outside the drawing. alpha = the largest (v − T) / (255 − T) over the channels,
 * colour = T + (v − T) / alpha. Over a ground of T this gives back every pixel brighter than
 * the ground exactly; only the ground noise becomes fully transparent (at most T/255 apart).
 * On the site's night colour no box remains and the edges stay as they are. A source that
 * already has transparency is used as it is. Only the empty margin around the drawing is left
 * out (every pixel brighter than the ground stays inside, with a 3 % margin).
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'assets/brand/logo.png'
const OUT_DIR = 'public/brand'
const WIDTHS = [96, 160, 240, 320, 480, 640, 960, 1280]
const NIGHT = { r: 11, g: 11, b: 13 }
const INK = 6 // brighter than this (0–255) counts as drawing, not ground
const MARGIN = 0.03

const source = fs.readFileSync(SRC)
// the file names change with the source and with this script (/brand/* is cached for a year)
// (line endings normalised: the checkout on Windows has CRLF, the build server LF)
const script = fs.readFileSync(import.meta.filename, 'utf8').replace(/\r\n/g, '\n')
const hash = crypto.createHash('sha1').update(source).update(script).digest('hex').slice(0, 8)
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H } = info

let transparent = false
for (let i = 3; i < data.length; i += 4) {
  if (data[i] < 250) {
    transparent = true
    break
  }
}

// bounding box of the drawing
let x0 = W
let y0 = H
let x1 = -1
let y1 = -1
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4
    const ink = transparent ? data[i + 3] > INK : Math.max(data[i], data[i + 1], data[i + 2]) > INK
    if (ink) {
      if (x < x0) x0 = x
      if (x > x1) x1 = x
      if (y < y0) y0 = y
      if (y > y1) y1 = y
    }
  }
}
if (x1 < 0) throw new Error(`${SRC}: no drawing found`)
const pad = Math.round(MARGIN * Math.max(x1 - x0, y1 - y0))
const box = {
  left: Math.max(0, x0 - pad),
  top: Math.max(0, y0 - pad),
  width: Math.min(W, x1 + pad + 1) - Math.max(0, x0 - pad),
  height: Math.min(H, y1 + pad + 1) - Math.max(0, y0 - pad),
}

// the ground noise ceiling: 99.9th percentile of the brightest channel outside the drawing
const hist = new Array(256).fill(0)
let outside = 0
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) continue
    const i = (y * W + x) * 4
    hist[Math.max(data[i], data[i + 1], data[i + 2])]++
    outside++
  }
}
let T = 0
for (let acc = 0; T < INK && (acc += hist[T]) < outside * 0.999; T++);

// the ground colour of an opaque logo (median of the four corners), used for the icons
const corner = (x: number, y: number) => {
  const i = (y * W + x) * 4
  return [data[i], data[i + 1], data[i + 2]]
}
const corners = [corner(0, 0), corner(W - 1, 0), corner(0, H - 1), corner(W - 1, H - 1)]
const med = (k: number) => corners.map((c) => c[k]).sort((a, b) => a - b)[1]
const ground = transparent ? NIGHT : { r: med(0), g: med(1), b: med(2) }

const drawing = () => sharp(source).extract(box)

/** Logo on its dark ground → straight alpha (see the header comment). */
function unscreen(px: Buffer) {
  for (let i = 0; i < px.length; i += 4) {
    const a = (Math.max(px[i], px[i + 1], px[i + 2]) - T) / (255 - T)
    if (a <= 0) {
      px[i] = px[i + 1] = px[i + 2] = px[i + 3] = 0
      continue
    }
    for (let k = 0; k < 3; k++) px[i + k] = Math.min(255, Math.max(0, Math.round(T + (px[i + k] - T) / a)))
    px[i + 3] = Math.round(a * 255)
  }
}

fs.mkdirSync(OUT_DIR, { recursive: true })
for (const f of fs.readdirSync(OUT_DIR)) if (/^logo-.*\.webp$/.test(f)) fs.unlinkSync(path.join(OUT_DIR, f))

const files: { w: number; h: number; src: string }[] = []
for (const w of WIDTHS.filter((v) => v <= box.width)) {
  const { data: px, info: o } = await drawing().resize({ width: w, kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  if (!transparent) unscreen(px)
  const name = `logo-${hash}-${w}.webp`
  await sharp(px, { raw: { width: o.width, height: o.height, channels: 4 } })
    .webp({ quality: 85, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT_DIR, name))
  files.push({ w, h: o.height, src: `/brand/${name}` })
}

const manifest = { source: SRC, hash, width: box.width, height: box.height, files }
fs.writeFileSync('lib/brand/logo.json', `${JSON.stringify(manifest, null, 2)}\n`)

// icons: the whole logo, scaled down, centred on its own ground
async function icon(size: number, file: string) {
  const inner = Math.round(size * 0.9)
  const logo = await drawing().resize({ width: inner, height: inner, fit: 'contain', background: { ...ground, alpha: transparent ? 0 : 1 }, kernel: 'lanczos3' }).png().toBuffer()
  await sharp({ create: { width: size, height: size, channels: 3, background: ground } })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(file)
}
await icon(64, 'app/icon.png')
await icon(180, 'app/apple-icon.png')
if (fs.existsSync('app/icon.svg')) fs.unlinkSync('app/icon.svg')

const OG = { w: 1200, h: 630 }
const ogLogo = await drawing().resize({ width: 1000, height: 470, fit: 'inside', kernel: 'lanczos3' }).png().toBuffer()
await sharp({ create: { width: OG.w, height: OG.h, channels: 3, background: ground } })
  .composite([{ input: ogLogo, gravity: 'center' }])
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile('public/og/default.jpg')

console.log(
  `brand assets from ${SRC} (${W}×${H}, ${transparent ? 'transparent' : `opaque ground ≤ ${T}`}, drawing ${box.width}×${box.height}): ` +
    `${files.length} WebP files in ${OUT_DIR}, lib/brand/logo.json, app/icon.png, app/apple-icon.png, public/og/default.jpg`,
)
