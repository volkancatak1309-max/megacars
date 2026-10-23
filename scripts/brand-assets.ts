/**
 * Writes the logo files that cannot be inline SVG (lib/brand/marks.ts): app/icon.svg
 * (favicon), app/apple-icon.png (180 px) and public/og/default.jpg (1200 × 630 share
 * image). Runs before every build (npm run brand / prebuild), so a change to the marks
 * reaches every file.
 */
import fs from 'node:fs'
import sharp from 'sharp'
import { BRAND, iconSvg, logoSvg } from '../lib/brand/marks'

const inner = (svg: string) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')

fs.writeFileSync('app/icon.svg', iconSvg(64))

await sharp(Buffer.from(iconSvg(180))).png({ compressionLevel: 9 }).toFile('app/apple-icon.png')

const W = 1200
const H = 630
const lockup = logoSvg('stacked', { tone: 'dark', chrome: true, id: 'og' })
const w = 620
const h = (w * lockup.height) / lockup.width
const x = (W - w) / 2
const y = (H - h) / 2 - 24
const og =
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
  `<rect width="${W}" height="${H}" fill="${BRAND.night}"/>` +
  `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 ${lockup.width} ${lockup.height}">${inner(lockup.svg)}</svg>` +
  `<rect x="${W / 2 - 60}" y="${y + h + 44}" width="120" height="4" fill="${BRAND.red}"/>` +
  `</svg>`
await sharp(Buffer.from(og)).jpeg({ quality: 88, mozjpeg: true }).toFile('public/og/default.jpg')

console.log('brand assets written: app/icon.svg, app/apple-icon.png, public/og/default.jpg')
