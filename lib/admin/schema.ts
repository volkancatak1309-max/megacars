// What the vehicle form sends to the server action, and the checks that keep the
// database clean. Hand-written on purpose: the fields are few and the messages must be
// in the panel language (keys of messages/*.json "admin.form").
import { BODIES, COLORS, DRIVES, EMISSION_CLASSES, FUELS, GEARBOXES, MATERIALS, STATUSES, VAT_NOTES } from '../options'
import { equipmentItem } from '../equipment'
import type { BodyType, Drive, Fuel, Transmission, VatNote, VehicleStatus } from '../types'

export interface PhotoInput {
  id: string
  path: string
  ext: 'webp' | 'jpg'
  width: number
  height: number
  blur: string
}

export interface VehicleInput {
  id: string
  make: string
  model: string
  version: string | null
  body: BodyType | null
  registrationMonth: number
  registrationYear: number
  mileage: number
  price: number
  vatNote: VatNote
  fuel: Fuel | null
  transmission: Transmission | null
  powerKw: number | null
  powerPs: number | null
  drive: Drive | null
  seats: number | null
  doors: number | null
  displacementCcm: number | null
  emissionClass: string | null
  consumptionL: number | null
  co2: number | null
  color: string | null
  interiorColor: string | null
  interiorMaterial: string | null
  previousOwners: number | null
  serviceBook: boolean | null
  nonSmoker: boolean | null
  accidentFree: boolean
  firstOwner: boolean
  warranty: boolean
  inspectionNew: boolean
  equipment: string[]
  photos: PhotoInput[]
  cover: string
  featured: boolean
  featuredOrder: number
  status: VehicleStatus
  visible: boolean
}

export type FieldErrors = Partial<Record<keyof VehicleInput, string>>

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null

const str = (x: unknown, max: number): string | null => {
  if (typeof x !== 'string') return null
  const s = x.trim().replace(/\s+/g, ' ')
  return s && s.length <= max ? s : null
}
const int = (x: unknown, min: number, max: number): number | null => {
  const n = typeof x === 'number' ? x : typeof x === 'string' && x.trim() ? Number(x) : NaN
  return Number.isInteger(n) && n >= min && n <= max ? n : null
}
const dec = (x: unknown, min: number, max: number): number | null => {
  const n = typeof x === 'number' ? x : typeof x === 'string' && x.trim() ? Number(x.replace(',', '.')) : NaN
  return Number.isFinite(n) && n >= min && n <= max ? Math.round(n * 10) / 10 : null
}
const oneOf = <T extends string>(x: unknown, list: readonly T[]): T | null => (typeof x === 'string' && (list as readonly string[]).includes(x) ? (x as T) : null)
const bool = (x: unknown) => x === true || x === 'true' || x === 'on'
const tri = (x: unknown): boolean | null => (x === true || x === 'true' ? true : x === false || x === 'false' ? false : null)

/** Validates the raw form payload; `errors` carry message keys for the form. */
export function parseVehicleInput(raw: unknown): { ok: true; data: VehicleInput } | { ok: false; errors: FieldErrors } {
  if (!isObj(raw)) return { ok: false, errors: { id: 'invalid' } }
  const errors: FieldErrors = {}
  const year = new Date().getFullYear()

  const id = typeof raw.id === 'string' && UUID.test(raw.id) ? raw.id.toLowerCase() : null
  if (!id) errors.id = 'invalid'
  const make = str(raw.make, 60)
  if (!make) errors.make = 'required'
  const model = str(raw.model, 60)
  if (!model) errors.model = 'required'
  const version = str(raw.version, 80)
  const body = oneOf(raw.body, BODIES)
  if (!body) errors.body = 'required'
  const registrationMonth = int(raw.registrationMonth, 1, 12)
  const registrationYear = int(raw.registrationYear, 1950, year + 1)
  if (registrationMonth === null || registrationYear === null) errors.registrationYear = 'required'
  const mileage = int(raw.mileage, 0, 2_000_000)
  if (mileage === null) errors.mileage = 'required'
  const price = int(raw.price, 1, 10_000_000)
  if (price === null) errors.price = 'required'
  const fuel = oneOf(raw.fuel, FUELS)
  if (!fuel) errors.fuel = 'required'
  const transmission = oneOf(raw.transmission, GEARBOXES)
  if (!transmission) errors.transmission = 'required'

  const photosRaw = Array.isArray(raw.photos) ? raw.photos : []
  const photos: PhotoInput[] = []
  for (const p of photosRaw) {
    if (!isObj(p)) continue
    const pid = typeof p.id === 'string' && UUID.test(p.id) ? p.id.toLowerCase() : null
    const ext = oneOf(p.ext, ['webp', 'jpg'] as const)
    const width = int(p.width, 1, 4000)
    const height = int(p.height, 1, 4000)
    const blur = typeof p.blur === 'string' && p.blur.startsWith('data:image/') && p.blur.length < 4000 ? p.blur : null
    if (!pid || !ext || !width || !height || !blur || p.path !== `${id}/${pid}`) continue
    photos.push({ id: pid, path: `${id}/${pid}`, ext, width, height, blur })
  }
  if (!photos.length) errors.photos = 'needPhoto'
  const cover = typeof raw.cover === 'string' && photos.some((p) => p.id === raw.cover) ? raw.cover : (photos[0]?.id ?? '')

  const equipment = (Array.isArray(raw.equipment) ? raw.equipment : []).filter((k): k is string => typeof k === 'string' && equipmentItem(k) !== null)

  if (Object.keys(errors).length) return { ok: false, errors }
  return {
    ok: true,
    data: {
      id: id!,
      make: make!,
      model: model!,
      version,
      body,
      registrationMonth: registrationMonth!,
      registrationYear: registrationYear!,
      mileage: mileage!,
      price: price!,
      vatNote: oneOf(raw.vatNote, VAT_NOTES) ?? 'unknown',
      fuel,
      transmission,
      powerKw: int(raw.powerKw, 1, 2000),
      powerPs: int(raw.powerPs, 1, 3000),
      drive: oneOf(raw.drive, DRIVES),
      seats: int(raw.seats, 1, 9),
      doors: int(raw.doors, 2, 6),
      displacementCcm: int(raw.displacementCcm, 50, 10000),
      emissionClass: oneOf(raw.emissionClass, EMISSION_CLASSES),
      consumptionL: dec(raw.consumptionL, 0, 50),
      co2: int(raw.co2, 0, 1000),
      color: oneOf(raw.color, COLORS),
      interiorColor: oneOf(raw.interiorColor, COLORS),
      interiorMaterial: oneOf(raw.interiorMaterial, MATERIALS),
      previousOwners: int(raw.previousOwners, 0, 20),
      serviceBook: tri(raw.serviceBook),
      nonSmoker: tri(raw.nonSmoker),
      accidentFree: bool(raw.accidentFree),
      firstOwner: bool(raw.firstOwner),
      warranty: bool(raw.warranty),
      inspectionNew: bool(raw.inspectionNew),
      equipment: [...new Set(equipment)],
      photos,
      cover,
      featured: bool(raw.featured),
      featuredOrder: int(raw.featuredOrder, 0, 999) ?? 0,
      status: oneOf(raw.status, STATUSES) ?? 'for_sale',
      visible: raw.visible === undefined ? true : bool(raw.visible),
    },
  }
}
