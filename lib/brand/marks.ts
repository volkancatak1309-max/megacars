// Mega Cars brand marks as framework-free SVG strings: three emblem concepts (a / b / c),
// the Unbounded wordmark as vector outlines (lib/brand/glyphs.ts) and the lockups
// (horizontal, stacked, mark). The site, the loader, the favicon, the apple icon and the
// share image are all drawn from here, so one switch (lib/launch.ts LOGO_CONCEPT)
// changes the logo everywhere. Nothing here depends on React.
import { C_900, CARS_800, FULL_800, M_900, MEGA_800 } from './glyphs'

export type Concept = 'a' | 'b' | 'c'
export type Tone = 'dark' | 'light'
export type Layout = 'horizontal' | 'stacked' | 'mark'

export const BRAND = { night: '#0B0B0D', bone: '#ECE7DE', red: '#D7141A', boneDim: '#C6C0B4', nightDim: '#3D3D44', white: '#FFFFFF' }

export const CONCEPTS: Record<Concept, { name: string; de: string; tr: string }> = {
  a: { name: 'Monogramm', de: 'Ein „MC“-Monogramm aus einem Guss: das gefaltete M trägt das rote C auf seinem rechten Stamm.', tr: 'Tek parça „MC“ monogramı: katlanmış M, kırmızı C’yi sağ bacağında taşır.' },
  b: { name: 'Plakette', de: 'Eine Plakette mit Zierlinie und rotem Streifen, wie am Heck eines Wagens; MC in Unbounded.', tr: 'Araç arkasındaki plaket gibi: ince çerçeve, kırmızı şerit, Unbounded ile MC.' },
  c: { name: 'Wappen', de: 'Ein sechseckiges Wappen ohne Schild: M im schwarzen, C im roten Feld, feine Zierlinie.', tr: 'Kalkansız altıgen arma: siyah alanda M, kırmızı alanda C, ince çerçeve.' },
}

type Role = 'fg' | 'fg2' | 'accent' | 'field'
type Part = { d: string; fill: Role | 'none'; stroke?: Role; sw?: number }
type Shape = { width: number; height: number; parts: Part[] }

const palette = (tone: Tone): Record<Role, string> =>
  tone === 'dark'
    ? { fg: BRAND.bone, fg2: BRAND.boneDim, accent: BRAND.red, field: BRAND.night }
    : { fg: BRAND.night, fg2: BRAND.nightDim, accent: BRAND.red, field: BRAND.bone }

const num = (n: number) => (Math.round(n * 100) / 100).toString()
const PLATE = 'M14.5 1.5H135.5A13 13 0 0 1 148.5 14.5V85.5A13 13 0 0 1 135.5 98.5H14.5A13 13 0 0 1 1.5 85.5V14.5A13 13 0 0 1 14.5 1.5Z'
const HEX = 'M50 2L98 29V87L50 114L2 87V29Z'
const place = (d: string, x: number, y: number, s: number) => ({ g: `<g transform="translate(${num(x)} ${num(y)}) scale(${num(s)})">`, d })

/* ---- emblems ------------------------------------------------------------------------ */
// a — Monogramm: geometric M folded into two facets, squared C with rounded outer corners on its right stem
const A_M_LEFT = 'M0 100V0H24L43 44V74H36.4L20 36V100Z'
const A_M_RIGHT = 'M43 44L62 0H86V100H66V36L49.6 74H43Z'
const A_C_TOP = 'M86 0H104A24 24 0 0 1 128 24V30H108V24A4 4 0 0 0 104 20H86Z'
const A_C_BOTTOM = 'M86 100H104A24 24 0 0 0 128 76V70H108V76A4 4 0 0 1 104 80H86Z'

export function emblem(concept: Concept, variant: 'emblem' | 'icon' = 'emblem'): Shape {
  if (concept === 'a') {
    return {
      width: 128,
      height: 100,
      parts: [
        { d: A_M_LEFT, fill: 'fg' },
        { d: A_M_RIGHT, fill: 'fg2' },
        { d: A_C_TOP, fill: 'accent' },
        { d: A_C_BOTTOM, fill: 'accent' },
      ],
    }
  }
  if (concept === 'b') {
    if (variant === 'icon') {
      // square plate: band + M
      return {
        width: 100,
        height: 100,
        parts: [
          { d: 'M14.5 1.5H85.5A13 13 0 0 1 98.5 14.5V85.5A13 13 0 0 1 85.5 98.5H14.5A13 13 0 0 1 1.5 85.5V14.5A13 13 0 0 1 14.5 1.5Z', fill: 'field', stroke: 'fg', sw: 3 },
          { d: 'M14.5 3H24V97H14.5A11.5 11.5 0 0 1 3 85.5V14.5A11.5 11.5 0 0 1 14.5 3Z', fill: 'accent' },
          { d: transformPath(M_900.d, 28.5, 29, 0.42), fill: 'fg' },
        ],
      }
    }
    return {
      width: 150,
      height: 100,
      parts: [
        { d: PLATE, fill: 'field', stroke: 'fg', sw: 3 },
        { d: 'M14.5 3H28V97H14.5A11.5 11.5 0 0 1 3 85.5V14.5A11.5 11.5 0 0 1 14.5 3Z', fill: 'accent' },
        { d: transformPath(M_900.d, 30.5, 31, 0.38), fill: 'fg' },
        { d: transformPath(C_900.d, 30.5 + 170 * 0.38, 31, 0.38), fill: 'fg' },
      ],
    }
  }
  // c — Wappen
  const parts: Part[] = [
    { d: HEX, fill: 'field', stroke: 'fg', sw: 3 },
    { d: 'M3.5 58H96.5V86.2L50 112.3L3.5 86.2Z', fill: 'accent' },
  ]
  if (variant === 'icon') parts.push({ d: transformPath(M_900.d, 24.6, 15, 0.3), fill: 'fg' })
  else parts.push({ d: transformPath(M_900.d, 24.6, 15, 0.3), fill: 'fg' }, { d: transformPath(C_900.d, 30.9, 66, 0.3), fill: 'fg' })
  return { width: 100, height: 116, parts }
}

/** Moves and scales absolute path data (M, L, H, V, Q, Z only — what the glyph outlines use). */
export function transformPath(d: string, tx: number, ty: number, s: number): string {
  let out = ''
  const re = /([MLHVQZ])([^MLHVQZ]*)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(d))) {
    const cmd = m[1]
    const nums = m[2].trim().split(/[\s,]+/).filter(Boolean).map(Number)
    if (cmd === 'Z') out += 'Z'
    else if (cmd === 'H') out += `H${num(nums[0] * s + tx)}`
    else if (cmd === 'V') out += `V${num(nums[0] * s + ty)}`
    else {
      const pts: string[] = []
      for (let i = 0; i < nums.length; i += 2) pts.push(`${num(nums[i] * s + tx)} ${num(nums[i + 1] * s + ty)}`)
      out += cmd + pts.join(' ')
    }
  }
  return out
}

/* ---- wordmark (Unbounded 800 outlines, cap height 100, ink starts at x = 0) ----------- */
const INK_LEFT = { full: 8.64, mega: 8.64, cars: 4.61 }
export const WORDMARK = {
  full: { d: transformPath(FULL_800.d, -INK_LEFT.full, 0, 1), width: 1032.93 - INK_LEFT.full, letters: FULL_800.glyphs.filter((g) => g.d).map((g) => ({ ch: g.ch, d: transformPath(g.d, -INK_LEFT.full, 0, 1) })) },
  mega: { d: transformPath(MEGA_800.d, -INK_LEFT.mega, 0, 1), width: 530.61 - INK_LEFT.mega },
  cars: { d: transformPath(CARS_800.d, -INK_LEFT.cars, 0, 1), width: 474.67 - INK_LEFT.cars },
}

/* ---- rendering ---------------------------------------------------------------------- */
export type RenderOpts = { tone: Tone; chrome?: boolean; id?: string }

function chromeDefs(id: string) {
  // brushed metal: bright above the horizon, dark just under it, a second lighter band below
  const stops = (k: number) =>
    [
      [0, '#FFFFFF'],
      [0.42, '#DAD5CB'],
      [0.5, '#7F7970'],
      [0.58, '#F2EEE6'],
      [1, '#A9A398'],
    ]
      .map(([o, c]) => `<stop offset="${o}" stop-color="${k === 1 ? c : dim(String(c), k)}"/>`)
      .join('')
  return `<linearGradient id="${id}-ch" x1="0" y1="0" x2="0" y2="1">${stops(1)}</linearGradient><linearGradient id="${id}-ch2" x1="0" y1="0" x2="0" y2="1">${stops(0.8)}</linearGradient>`
}

function dim(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.round(v * k).toString(16).padStart(2, '0')
  return `#${c((n >> 16) & 255)}${c((n >> 8) & 255)}${c(n & 255)}`
}

function fillFor(role: Role | 'none', tone: Tone, chrome: boolean | undefined, id: string) {
  if (role === 'none') return 'none'
  const p = palette(tone)
  if (chrome && role === 'fg') return `url(#${id}-ch)`
  if (chrome && role === 'fg2') return `url(#${id}-ch2)`
  return p[role]
}

function renderParts(shape: Shape, o: RenderOpts, x = 0, y = 0, s = 1) {
  const id = o.id ?? 'mc'
  const p = palette(o.tone)
  const inner = shape.parts
    .map((pt) => {
      const stroke = pt.stroke ? ` stroke="${o.chrome && pt.stroke === 'fg' ? `url(#${id}-ch)` : p[pt.stroke]}" stroke-width="${pt.sw ?? 1}"` : ''
      return `<path d="${pt.d}" fill="${fillFor(pt.fill, o.tone, o.chrome, id)}"${stroke}/>`
    })
    .join('')
  return x || y || s !== 1 ? `<g transform="translate(${num(x)} ${num(y)}) scale(${num(s)})">${inner}</g>` : inner
}

function wordmarkPath(which: 'full' | 'mega' | 'cars', o: RenderOpts, x: number, y: number, s: number) {
  const fill = o.tone === 'dark' ? BRAND.bone : BRAND.night
  return `<path d="${transformPath(WORDMARK[which].d, x, y, s)}" fill="${fill}"/>`
}

const svgOpen = (w: number, h: number, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(w)} ${num(h)}" aria-hidden="true" focusable="false"${extra}>`

/** A complete lockup as one SVG string. Dimensions are returned so CSS can size it by height. */
export function logoSvg(concept: Concept, layout: Layout, o: RenderOpts): { svg: string; width: number; height: number } {
  const id = o.id ?? `mc-${concept}-${o.tone}`
  // chrome reads as metal only on a dark ground
  const opts = { ...o, id, chrome: o.chrome && o.tone === 'dark' }
  const defs = o.chrome ? `<defs>${chromeDefs(id)}</defs>` : ''
  const e = emblem(concept, layout === 'mark' ? 'icon' : 'emblem')
  if (layout === 'mark') {
    return { svg: `${svgOpen(e.width, e.height)}${defs}${renderParts(e, opts)}</svg>`, width: e.width, height: e.height }
  }
  let body = ''
  let W = 0
  let H = 0
  if (layout === 'horizontal') {
    if (concept === 'b') {
      const s = 0.36
      const gap = 26
      W = e.width + gap + WORDMARK.mega.width * s
      H = e.height
      body = renderParts(e, opts) + wordmarkPath('mega', opts, e.width + gap, 10, s) + wordmarkPath('cars', opts, e.width + gap, 54, s)
    } else {
      const s = concept === 'c' ? 0.46 : 0.44
      const gap = concept === 'c' ? 28 : 30
      W = e.width + gap + WORDMARK.full.width * s
      H = e.height
      body = renderParts(e, opts) + wordmarkPath('full', opts, e.width + gap, (e.height - 100 * s) / 2, s)
    }
  } else {
    // stacked: emblem above the name, both centred
    if (concept === 'c') {
      const s = 0.28
      const gap = 22
      W = Math.max(e.width, WORDMARK.mega.width * s)
      H = e.height + gap + 100 * s + 10 + 100 * s
      body =
        renderParts(e, opts, (W - e.width) / 2, 0) +
        wordmarkPath('mega', opts, (W - WORDMARK.mega.width * s) / 2, e.height + gap, s) +
        wordmarkPath('cars', opts, (W - WORDMARK.cars.width * s) / 2, e.height + gap + 100 * s + 10, s)
    } else {
      const s = concept === 'b' ? 0.28 : 0.3
      const gap = concept === 'b' ? 22 : 26
      W = Math.max(e.width, WORDMARK.full.width * s)
      H = e.height + gap + 100 * s
      body = renderParts(e, opts, (W - e.width) / 2, 0) + wordmarkPath('full', opts, (W - WORDMARK.full.width * s) / 2, e.height + gap, s)
    }
  }
  return { svg: `${svgOpen(W, H)}${defs}${body}</svg>`, width: W, height: H }
}

/**
 * Favicon / app icon: the icon variant on the night square (a always; b and c only when
 * `ground` is set, e.g. for the apple icon, which cannot be transparent).
 */
export function iconSvg(concept: Concept, size = 64, ground = false): string {
  const e = emblem(concept, 'icon')
  const o: RenderOpts = { tone: 'dark', id: 'ico' }
  const withGround = concept === 'a' || ground
  const pad = withGround ? (concept === 'a' ? 0.1 : 0.12) : 0.03
  const s = ((1 - 2 * pad) * size) / Math.max(e.width, e.height)
  const x = (size - e.width * s) / 2
  const y = (size - e.height * s) / 2
  const bg = withGround ? `<rect width="${size}" height="${size}" fill="${BRAND.night}"/>` : ''
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${bg}${renderParts(e, o, x, y, s)}</svg>`
}

/**
 * Opening screen artwork: the emblem outline (for the line drawing), the emblem in chrome,
 * a sheen clipped to the emblem and the wordmark letter by letter. Classes are animated
 * in styles/motion.css; nothing here runs JavaScript.
 */
export function loaderSvg(concept: Concept): { svg: string; width: number; height: number } {
  const id = 'ld'
  const e = emblem(concept)
  const s = 0.32 // wordmark cap height in emblem units
  const gap = 34
  const W = Math.max(e.width, WORDMARK.full.width * s)
  const H = e.height + gap + 100 * s
  const ex = (W - e.width) / 2
  const wx = (W - WORDMARK.full.width * s) / 2
  const wy = e.height + gap
  const p = palette('dark')
  const lines = e.parts
    .map((pt) => `<path d="${pt.d}" pathLength="1" fill="none" stroke="${pt.fill === 'accent' ? p.accent : p.fg}" stroke-width="${pt.sw ? 1.4 : 1.2}" vector-effect="non-scaling-stroke"/>`)
    .join('')
  const clip = e.parts.filter((pt) => pt.fill !== 'none').map((pt) => `<path d="${pt.d}"/>`).join('')
  const letters = WORDMARK.full.letters.map((g, i) => `<path d="${transformPath(g.d, wx, wy, s)}" fill="${p.fg}" style="--i:${i}"/>`).join('')
  const svg =
    `${svgOpen(W, H, ' class="ld"')}<defs>${chromeDefs(id)}` +
    `<linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<clipPath id="${id}-clip">${clip}</clipPath>` +
    `<clipPath id="${id}-wm"><rect x="${num(wx - 10)}" y="${num(wy - 12)}" width="${num(WORDMARK.full.width * s + 20)}" height="${num(100 * s + 16)}"/></clipPath></defs>` +
    `<g transform="translate(${num(ex)} 0)">` +
    `<g class="ld-lines">${lines}</g>` +
    `<g class="ld-fill">${renderParts(e, { tone: 'dark', chrome: true, id })}</g>` +
    `<g clip-path="url(#${id}-clip)"><rect class="ld-sheen" x="${num(-e.width * 0.6)}" y="-10" width="${num(e.width * 0.5)}" height="${num(e.height + 20)}" fill="url(#${id}-sheen)" transform="skewX(-18)"/></g>` +
    `</g>` +
    `<g class="ld-wm" clip-path="url(#${id}-wm)">${letters}</g></svg>`
  return { svg, width: W, height: H }
}
