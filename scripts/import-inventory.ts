/**
 * Builds data/inventory.json from cars-data.json (last known real stock, June 2026)
 * plus the scraped listing pages in _work/details/<listing-uuid>.json when present.
 *
 * Rules (KARAR-DEFTERI, 22.10.2026):
 * - Nothing is invented. A value missing from the source stays null and the UI hides it.
 * - Photos are only scaled and cropped (no filters, no background changes).
 * - Re-runnable: manual fields (cover, spin) of an existing inventory.json are kept.
 *
 * Usage: npm run inventory
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import type { BodyType, Drive, EquipmentGroup, Fuel, Transmission } from '../lib/types'
import type { LegacyPhoto as Photo, LegacyVehicle as Vehicle } from './legacy-types'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const DETAILS = path.join(ROOT, '_work', 'details')
const OUT = path.join(ROOT, 'data', 'inventory.json')

interface SourceCar {
  id: string
  marka: string
  model: string
  aciklama: string
  fiyat: number
  yil: string
  km: number
  guc_ps: number | null
  guc_kw: number | null
  yakit: string
  vites: string
  url: string
  fotograflar: string[]
}

const source: SourceCar[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'cars-data.json'), 'utf8'))
const previous: Vehicle[] = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : []
const previousById = new Map(previous.map((v) => [v.id, v]))
// Documented corrections: a value may be hidden (null), or replaced only when the override
// names its source in `_source` (never a guess).
const OVERRIDES_FILE = path.join(ROOT, 'data', 'overrides.json')
const overrides: Record<string, Record<string, unknown>> = fs.existsSync(OVERRIDES_FILE)
  ? JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf8'))
  : {}

const slugify = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/ß/g, 'ss')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const listingUuid = (url: string) => url.split('-').slice(-5).join('-')

// ---------- listing markdown parsing ----------

function section(md: string, name: string): string {
  const start = md.indexOf(`## ${name}`)
  if (start < 0) return ''
  const end = md.indexOf('\n## ', start + 3)
  return md.slice(start + name.length + 3, end < 0 ? undefined : end)
}

/** AutoScout renders "LabelValueLabelValue" without separators; split on known labels. */
function labelled(text: string, labels: string[]): Record<string, string> {
  const flat = text.replace(/\* \* \*/g, ' ').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()
  const sorted = [...labels].sort((a, b) => b.length - a.length)
  const re = new RegExp(sorted.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g')
  const hits: { label: string; index: number }[] = []
  for (const m of flat.matchAll(re)) hits.push({ label: m[0], index: m.index! })
  const out: Record<string, string> = {}
  hits.forEach((h, i) => {
    const end = i + 1 < hits.length ? hits[i + 1].index : flat.length
    const value = flat.slice(h.index + h.label.length, end).trim()
    if (value && !(h.label in out)) out[h.label] = value
  })
  return out
}

const LABELS = {
  basis: ['Karosserieform', 'Fahrzeugart', 'Antriebsart', 'Sitzplätze', 'Türen', 'Länderversion', 'Angebotsnummer', 'Garantie'],
  history: ['Kilometerstand', 'Erstzulassung', 'Fahrzeughalter', 'Scheckheftgepflegt', 'Nichtraucherfahrzeug', 'Letzte Inspektion', 'HU', 'Unfallfrei', 'Letzter Zahnriemenwechsel'],
  tech: ['Leistung', 'Getriebe', 'Hubraum', 'Gänge', 'Zylinder', 'Leergewicht', 'Antriebsart'],
  energy: ['Schadstoffklasse', 'Anderer Energieträger', 'Kraftstoffverbrauch', 'Kraftstoff', 'CO₂-Emissionen', 'Energieverbrauch', 'CO₂-Klasse'],
  color: ['Außenfarbe', 'Farbe laut Hersteller', 'Lackierung', 'Farbe der Innenausstattung', 'Innenausstattung'],
}

const GROUPS: Record<string, EquipmentGroup> = {
  Komfort: 'comfort',
  'Unterhaltung/Media': 'media',
  Sicherheit: 'safety',
  Extras: 'extras',
}

function equipment(md: string): Record<EquipmentGroup, string[]> {
  const out: Record<EquipmentGroup, string[]> = { comfort: [], media: [], safety: [], extras: [] }
  let group: EquipmentGroup | null = null
  for (const raw of section(md, 'Ausstattung').split('\n')) {
    const line = raw.trim()
    if (!line || line === 'Mehr anzeigen') continue
    if (line.startsWith('- ')) {
      if (group) out[group].push(line.slice(2).trim())
    } else {
      group = GROUPS[line] ?? null
      if (!group) console.warn(`  unknown equipment group "${line}"`)
    }
  }
  return out
}

const int = (s?: string) => {
  if (!s) return null
  const n = parseInt(s.replace(/[^\d]/g, ''), 10)
  return Number.isFinite(n) ? n : null
}
const decimal = (s?: string) => {
  const m = s?.match(/(\d+(?:,\d+)?)/)
  return m ? parseFloat(m[1].replace(',', '.')) : null
}
const yesNo = (s?: string) => (s === 'Ja' ? true : s === 'Nein' ? false : null)

const BODY: Record<string, BodyType> = {
  Limousine: 'limousine',
  Kombi: 'kombi',
  Cabrio: 'cabrio',
  'Sportwagen/Coupé': 'coupe',
  'SUV/Geländewagen/Pickup': 'suv',
  'Van/Kleinbus': 'van',
  Kleinwagen: 'kleinwagen',
}
const FUEL: Record<string, Fuel> = {
  Benzin: 'benzin',
  Diesel: 'diesel',
  'Elektro/Benzin': 'hybrid',
  Elektro: 'elektro',
}
const GEARBOX: Record<string, Transmission> = { Automatik: 'automatik', Schaltgetriebe: 'schaltgetriebe' }
const DRIVE: Record<string, Drive> = { Allrad: 'allrad', Heck: 'heck', Front: 'front' }

/** "Mercedes-Benz S 560    4Matic L AMG-Line / PANO / TV /" → model + clean version */
function modelAndVersion(headline: string, make: string): { model: string; version: string | null } {
  const [makeModel, rawVersion = ''] = headline.split(/\s{2,}/)
  let model = makeModel.startsWith(make) ? makeModel.slice(make.length).trim() : makeModel.trim()
  let version = rawVersion
    .replace(/\\\|/g, '|')
    .split(/\s[/|]\s?|\s\/$/)[0]
    .replace(/\s*\/\s*$/, '')
    .replace(/\(\s*(.*?)\s*\)/g, '($1)')
    .replace(/\s*\(\d{3}\.\d{3}\)/g, '')
    .trim()
  if (model === 'Sonstige') {
    // "Jeep Commander 4,7 V8 Stretchlimousine": the real model name precedes the first number
    const tokens = version.split(' ')
    const firstNumeric = tokens.findIndex((t) => /\d/.test(t))
    model = tokens.slice(0, firstNumeric).join(' ')
    version = tokens.slice(firstNumeric).join(' ')
  }
  if (version.toLowerCase().startsWith(model.toLowerCase() + ' ')) version = version.slice(model.length + 1)
  if (/^[^a-z]*$/.test(version) && /[A-Z]{4}/.test(version)) {
    version = version.toLowerCase().replace(/(^|\s)([a-zäöü])/g, (_, s, c) => s + c.toUpperCase())
  }
  return { model, version: version || null }
}

// ---------- photos ----------

async function photo(rel: string): Promise<Photo> {
  const file = path.join(PUBLIC, rel)
  const meta = await sharp(file).metadata()
  const width = meta.width!
  const height = meta.height!
  // scaled copies only: same pixels, smaller size (no crop, no filter)
  const derive = async (w: number, quality: number) => {
    const derivedRel = rel.replace(/\.webp$/, `-${w}.webp`)
    const derived = path.join(PUBLIC, derivedRel)
    if (!fs.existsSync(derived) || fs.statSync(derived).mtimeMs < fs.statSync(file).mtimeMs) {
      await sharp(file).resize({ width: w }).webp({ quality, effort: 6 }).toFile(derived)
    }
    return '/' + derivedRel.replace(/\\/g, '/')
  }
  const src800 = width > 800 ? await derive(800, 78) : null
  const src240 = await derive(240, 72)
  const tiny = await sharp(file).resize({ width: 16 }).webp({ quality: 40 }).toBuffer()
  return {
    src: '/' + rel.replace(/\\/g, '/'),
    src800,
    src240,
    width,
    height,
    blur: `data:image/webp;base64,${tiny.toString('base64')}`,
  }
}

async function ogImage(coverRel: string, id: string): Promise<string> {
  const rel = `cars/${id}/og.jpg`
  const out = path.join(PUBLIC, rel)
  const src = path.join(PUBLIC, coverRel)
  if (!fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs) {
    await sharp(src).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 80, mozjpeg: true }).toFile(out)
  }
  return '/' + rel
}

// ---------- main ----------

async function main() {
  const vehicles: Vehicle[] = []
  for (const car of source) {
    const uuid = listingUuid(car.url)
    const detailFile = path.join(DETAILS, `${uuid}.json`)
    const md: string = fs.existsSync(detailFile)
      ? JSON.parse(fs.readFileSync(detailFile, 'utf8')).data?.markdown ?? ''
      : ''
    if (!md) console.warn(`  ${car.id}: no listing details found, only cars-data.json fields are used`)

    const headline = md.match(/^# (.*)$/m)?.[1]
    const { model, version } = headline
      ? modelAndVersion(headline, car.marka)
      : { model: car.model, version: null }

    const basis = labelled(section(md, 'Basisdaten'), LABELS.basis)
    const history = labelled(section(md, 'Fahrzeughistorie'), LABELS.history)
    const tech = labelled(section(md, 'Technische Daten'), LABELS.tech)
    const energy = labelled(section(md, 'Energieverbrauch'), LABELS.energy)
    const color = labelled(section(md, 'Farbe und Innenausstattung'), LABELS.color)

    const body = basis['Karosserieform'] ? BODY[basis['Karosserieform']] ?? null : null
    if (basis['Karosserieform'] && !body) console.warn(`  ${car.id}: unknown body "${basis['Karosserieform']}"`)
    const fuel = FUEL[car.yakit] ?? null
    if (!fuel) console.warn(`  ${car.id}: unknown fuel "${car.yakit}"`)

    const [mm, yyyy] = car.yil.split('/')
    const photos = await Promise.all(car.fotograflar.map(photo))
    const prev = previousById.get(car.id)
    const cover = prev?.cover ?? 0
    const slug = [slugify(car.marka), slugify(model), version ? slugify(version) : '', uuid.slice(0, 6)]
      .filter(Boolean)
      .join('-')

    vehicles.push({
      id: car.id,
      slug,
      make: car.marka,
      makeSlug: slugify(car.marka),
      model,
      version,
      price: car.fiyat,
      mileage: car.km,
      firstRegistration: car.yil,
      firstRegistrationKey: Number(yyyy) * 100 + Number(mm),
      powerKw: car.guc_kw ?? null,
      powerPs: car.guc_ps ?? null,
      fuel,
      transmission: GEARBOX[car.vites] ?? null,
      body,
      drive: DRIVE[basis['Antriebsart'] ?? tech['Antriebsart']] ?? null,
      seats: int(basis['Sitzplätze']),
      doors: int(basis['Türen']),
      gears: int(tech['Gänge']),
      cylinders: int(tech['Zylinder']),
      displacementCcm: int(tech['Hubraum']),
      weightKg: int(tech['Leergewicht']),
      emissionClass: energy['Schadstoffklasse'] ?? null,
      consumptionL: decimal(energy['Kraftstoffverbrauch'] ?? energy['Energieverbrauch']),
      co2: int(energy['CO₂-Emissionen']?.split('g/km')[0]),
      colorBase: color['Außenfarbe'] ?? null,
      colorManufacturer: color['Farbe laut Hersteller'] ?? null,
      interiorColor: color['Farbe der Innenausstattung'] ?? null,
      interiorMaterial: color['Innenausstattung'] ?? null,
      serviceBook: yesNo(history['Scheckheftgepflegt']),
      nonSmoker: yesNo(history['Nichtraucherfahrzeug']),
      previousOwners: int(history['Fahrzeughalter']),
      lastService: history['Letzte Inspektion'] ?? null,
      equipment: md ? equipment(md) : { comfort: [], media: [], safety: [], extras: [] },
      photos,
      cover,
      og: await ogImage(car.fotograflar[cover], car.id),
      sourceUrl: car.url,
      spin: prev?.spin ?? null,
    })
    const fix = overrides[car.id] ?? {}
    for (const [key, value] of Object.entries(fix)) {
      if (key.startsWith('_')) continue
      if (value !== null && !fix._source) throw new Error(`${car.id}: override "${key}" sets a value without a _source`)
      ;(vehicles[vehicles.length - 1] as unknown as Record<string, unknown>)[key] = value
    }
    console.log(`  ${car.id} → ${slug}`)
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(vehicles, null, 2) + '\n')
  console.log(`${vehicles.length} vehicles written to data/inventory.json`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
