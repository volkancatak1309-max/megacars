// Mega Cars brand marks as framework-free SVG strings: the "Monogramm" emblem (Volkan's
// choice, 23.10.2026), the Unbounded wordmark as vector outlines (lib/brand/glyphs.ts)
// and the lockups (horizontal, stacked, mark). The site, the opening screen, the favicon,
// the apple icon and the share image are all drawn from here. Nothing depends on React.
import { FULL_800 } from './glyphs'

export type Tone = 'dark' | 'light'
export type Layout = 'horizontal' | 'stacked' | 'mark'

export const BRAND = { night: '#0B0B0D', bone: '#ECE7DE', red: '#D7141A', boneDim: '#C6C0B4', nightDim: '#3D3D44', white: '#FFFFFF' }

type Role = 'fg' | 'fg2' | 'accent'
type Part = { d: string; fill: Role }
type Shape = { width: number; height: number; parts: Part[] }

const palette = (tone: Tone): Record<Role, string> =>
  tone === 'dark' ? { fg: BRAND.bone, fg2: BRAND.boneDim, accent: BRAND.red } : { fg: BRAND.night, fg2: BRAND.nightDim, accent: BRAND.red }

const num = (n: number) => (Math.round(n * 100) / 100).toString()

/* ---- emblem: a geometric M folded into two facets, carrying a squared C with rounded
   outer corners on its right stem (128 × 100) ------------------------------------------ */
const M_LEFT = 'M0 100V0H24L43 44V74H36.4L20 36V100Z'
const M_RIGHT = 'M43 44L62 0H86V100H66V36L49.6 74H43Z'
const C_TOP = 'M86 0H104A24 24 0 0 1 128 24V30H108V24A4 4 0 0 0 104 20H86Z'
const C_BOTTOM = 'M86 100H104A24 24 0 0 0 128 76V70H108V76A4 4 0 0 1 104 80H86Z'

export const EMBLEM: Shape = {
  width: 128,
  height: 100,
  parts: [
    { d: M_LEFT, fill: 'fg' },
    { d: M_RIGHT, fill: 'fg2' },
    { d: C_TOP, fill: 'accent' },
    { d: C_BOTTOM, fill: 'accent' },
  ],
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
const INK_LEFT = 8.64
export const WORDMARK = {
  d: transformPath(FULL_800.d, -INK_LEFT, 0, 1),
  width: 1032.93 - INK_LEFT,
  letters: FULL_800.glyphs.filter((g) => g.d).map((g) => ({ ch: g.ch, d: transformPath(g.d, -INK_LEFT, 0, 1) })),
}

/* ---- rendering ---------------------------------------------------------------------- */
export type RenderOpts = { tone: Tone; chrome?: boolean; id?: string }

function dim(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => Math.round(v * k).toString(16).padStart(2, '0')
  return `#${c((n >> 16) & 255)}${c((n >> 8) & 255)}${c(n & 255)}`
}

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

function fillFor(role: Role, tone: Tone, chrome: boolean | undefined, id: string) {
  if (chrome && role === 'fg') return `url(#${id}-ch)`
  if (chrome && role === 'fg2') return `url(#${id}-ch2)`
  return palette(tone)[role]
}

function renderEmblem(o: RenderOpts, x = 0, y = 0, s = 1) {
  const id = o.id ?? 'mc'
  const inner = EMBLEM.parts.map((pt) => `<path d="${pt.d}" fill="${fillFor(pt.fill, o.tone, o.chrome, id)}"/>`).join('')
  return x || y || s !== 1 ? `<g transform="translate(${num(x)} ${num(y)}) scale(${num(s)})">${inner}</g>` : inner
}

function wordmarkPath(o: RenderOpts, x: number, y: number, s: number) {
  return `<path d="${transformPath(WORDMARK.d, x, y, s)}" fill="${o.tone === 'dark' ? BRAND.bone : BRAND.night}"/>`
}

const svgOpen = (w: number, h: number, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${num(w)} ${num(h)}" aria-hidden="true" focusable="false"${extra}>`

/** A complete lockup as one SVG string. Dimensions are returned so CSS can size it by height. */
export function logoSvg(layout: Layout, o: RenderOpts): { svg: string; width: number; height: number } {
  const id = o.id ?? `mc-${o.tone}`
  // chrome reads as metal only on a dark ground
  const opts = { ...o, id, chrome: o.chrome && o.tone === 'dark' }
  const defs = opts.chrome ? `<defs>${chromeDefs(id)}</defs>` : ''
  const e = EMBLEM
  if (layout === 'mark') return { svg: `${svgOpen(e.width, e.height)}${defs}${renderEmblem(opts)}</svg>`, width: e.width, height: e.height }
  if (layout === 'horizontal') {
    const s = 0.44
    const gap = 30
    const W = e.width + gap + WORDMARK.width * s
    return { svg: `${svgOpen(W, e.height)}${defs}${renderEmblem(opts)}${wordmarkPath(opts, e.width + gap, (e.height - 100 * s) / 2, s)}</svg>`, width: W, height: e.height }
  }
  // stacked: emblem above the name, both centred
  const s = 0.3
  const gap = 26
  const W = Math.max(e.width, WORDMARK.width * s)
  const H = e.height + gap + 100 * s
  return { svg: `${svgOpen(W, H)}${defs}${renderEmblem(opts, (W - e.width) / 2, 0)}${wordmarkPath(opts, (W - WORDMARK.width * s) / 2, e.height + gap, s)}</svg>`, width: W, height: H }
}

/** Favicon / app icon: the emblem on the night square. */
export function iconSvg(size = 64): string {
  const e = EMBLEM
  const pad = 0.1
  const s = ((1 - 2 * pad) * size) / Math.max(e.width, e.height)
  const x = (size - e.width * s) / 2
  const y = (size - e.height * s) / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="${BRAND.night}"/>${renderEmblem({ tone: 'dark', id: 'ico' }, x, y, s)}</svg>`
}

/**
 * Opening screen artwork: the emblem outline (for the line drawing), the emblem in chrome,
 * a sheen clipped to the emblem and the wordmark letter by letter. Classes are animated
 * in styles/motion.css; nothing here runs JavaScript.
 */
export function loaderSvg(): { svg: string; width: number; height: number } {
  const id = 'ld'
  const e = EMBLEM
  const s = 0.32 // wordmark cap height in emblem units
  const gap = 34
  const W = Math.max(e.width, WORDMARK.width * s)
  const H = e.height + gap + 100 * s
  const ex = (W - e.width) / 2
  const wx = (W - WORDMARK.width * s) / 2
  const wy = e.height + gap
  const p = palette('dark')
  const lines = e.parts.map((pt) => `<path d="${pt.d}" pathLength="1" fill="none" stroke="${pt.fill === 'accent' ? p.accent : p.fg}" stroke-width="1.2" vector-effect="non-scaling-stroke"/>`).join('')
  const clip = e.parts.map((pt) => `<path d="${pt.d}"/>`).join('')
  const letters = WORDMARK.letters.map((g, i) => `<path d="${transformPath(g.d, wx, wy, s)}" fill="${p.fg}" style="--i:${i}"/>`).join('')
  const svg =
    `${svgOpen(W, H, ' class="ld"')}<defs>${chromeDefs(id)}` +
    `<linearGradient id="${id}-sheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
    `<clipPath id="${id}-clip">${clip}</clipPath>` +
    `<clipPath id="${id}-wm"><rect x="${num(wx - 10)}" y="${num(wy - 12)}" width="${num(WORDMARK.width * s + 20)}" height="${num(100 * s + 16)}"/></clipPath></defs>` +
    `<g transform="translate(${num(ex)} 0)">` +
    `<g class="ld-lines">${lines}</g>` +
    `<g class="ld-fill">${renderEmblem({ tone: 'dark', chrome: true, id })}</g>` +
    `<g clip-path="url(#${id}-clip)"><rect class="ld-sheen" x="${num(-e.width * 0.6)}" y="-10" width="${num(e.width * 0.5)}" height="${num(e.height + 20)}" fill="url(#${id}-sheen)" transform="skewX(-18)"/></g>` +
    `</g>` +
    `<g class="ld-wm" clip-path="url(#${id}-wm)">${letters}</g></svg>`
  return { svg, width: W, height: H }
}
