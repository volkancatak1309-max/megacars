// Filter, sort and option logic shared by the server (initial render) and the client
// (live filtering). Pure functions only: no data imports here.
import type { BodyType, Fuel, Photo, Transmission, Vehicle, VehicleStatus } from './types'
import { BODIES, FUELS, GEARBOXES } from './options'

export { BODIES, FUELS, GEARBOXES }

// "Neu eingetroffen" (date of arrival in the database) is the default since the stock
// is managed in the admin panel (Volkan, 23.10.2026); "Empfohlen" keeps the featured
// cars first.
export const SORTS = ['newest', 'recommended', 'price-asc', 'price-desc', 'km', 'year-desc', 'year-asc'] as const
export type SortKey = (typeof SORTS)[number]
export const DEFAULT_SORT: SortKey = 'newest'

export interface Filters {
  make: string | null
  priceMin: number | null
  priceMax: number | null
  kmMax: number | null
  yearMin: number | null
  fuel: Fuel | null
  gearbox: Transmission | null
  body: BodyType | null
  sort: SortKey
}
export type FilterKey = Exclude<keyof Filters, 'sort'>

export const EMPTY_FILTERS: Filters = {
  make: null,
  priceMin: null,
  priceMax: null,
  kmMax: null,
  yearMin: null,
  fuel: null,
  gearbox: null,
  body: null,
  sort: DEFAULT_SORT,
}

/** The slice of a vehicle that list cards and filters need on the client. */
export type CardVehicle = Pick<
  Vehicle,
  | 'id'
  | 'slug'
  | 'make'
  | 'makeSlug'
  | 'model'
  | 'version'
  | 'price'
  | 'mileage'
  | 'firstRegistration'
  | 'firstRegistrationKey'
  | 'powerKw'
  | 'powerPs'
  | 'fuel'
  | 'transmission'
  | 'body'
  | 'colorBase'
> & { status: VehicleStatus; createdAt: string; cover: Photo; photoCount: number; hasSpin: boolean; rank: number }

type FilterFields = Pick<CardVehicle, 'makeSlug' | 'price' | 'mileage' | 'firstRegistrationKey' | 'fuel' | 'transmission' | 'body'>
type ParamSource = URLSearchParams | Record<string, string | string[] | undefined>

const read = (src: ParamSource, key: string): string | null => {
  if (src instanceof URLSearchParams) return src.get(key)
  const v = src[key]
  return (Array.isArray(v) ? v[0] : v) ?? null
}
const num = (s: string | null) => (s && /^\d{1,7}$/.test(s) ? Number(s) : null)
const oneOf = <T extends string>(s: string | null, list: readonly T[]): T | null =>
  s && (list as readonly string[]).includes(s) ? (s as T) : null

export function parseFilters(src: ParamSource): Filters {
  const make = read(src, 'make')
  return {
    make: make && /^[a-z0-9-]{1,40}$/.test(make) ? make : null,
    priceMin: num(read(src, 'priceMin')),
    priceMax: num(read(src, 'priceMax')),
    kmMax: num(read(src, 'kmMax')),
    yearMin: num(read(src, 'yearMin')),
    fuel: oneOf(read(src, 'fuel'), FUELS),
    gearbox: oneOf(read(src, 'gearbox'), GEARBOXES),
    body: oneOf(read(src, 'body'), BODIES),
    sort: oneOf(read(src, 'sort') === 'year' ? 'year-desc' : read(src, 'sort'), SORTS) ?? DEFAULT_SORT,
  }
}

export function toSearchParams(f: Filters): URLSearchParams {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(f)) {
    if (v === null || (k === 'sort' && v === EMPTY_FILTERS.sort)) continue
    p.set(k, String(v))
  }
  return p
}

export function matches(v: FilterFields, f: Filters, ignore?: FilterKey) {
  if (ignore !== 'make' && f.make && v.makeSlug !== f.make) return false
  if (ignore !== 'priceMin' && f.priceMin !== null && v.price < f.priceMin) return false
  if (ignore !== 'priceMax' && f.priceMax !== null && v.price > f.priceMax) return false
  if (ignore !== 'kmMax' && f.kmMax !== null && v.mileage > f.kmMax) return false
  if (ignore !== 'yearMin' && f.yearMin !== null && Math.floor(v.firstRegistrationKey / 100) < f.yearMin) return false
  if (ignore !== 'fuel' && f.fuel && v.fuel !== f.fuel) return false
  if (ignore !== 'gearbox' && f.gearbox && v.transmission !== f.gearbox) return false
  if (ignore !== 'body' && f.body && v.body !== f.body) return false
  return true
}

export function sortVehicles<T extends Pick<CardVehicle, 'price' | 'mileage' | 'firstRegistrationKey' | 'rank' | 'createdAt'>>(list: T[], sort: SortKey): T[] {
  const by: Record<SortKey, (a: T, b: T) => number> = {
    newest: (a, b) => b.createdAt.localeCompare(a.createdAt) || a.price - b.price,
    recommended: (a, b) => a.rank - b.rank,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    km: (a, b) => a.mileage - b.mileage,
    'year-desc': (a, b) => b.firstRegistrationKey - a.firstRegistrationKey || a.price - b.price,
    'year-asc': (a, b) => a.firstRegistrationKey - b.firstRegistrationKey || a.price - b.price,
  }
  return [...list].sort(by[sort])
}

export const activeCount = (f: Filters) =>
  (Object.keys(f) as (keyof Filters)[]).filter((k) => k !== 'sort' && f[k] !== null).length

// ---------- option lists, all derived from the real stock ----------

const STEP = 5000

export interface FilterOptions {
  makes: { value: string; label: string }[]
  priceFrom: number[]
  priceTo: number[]
  kmTo: number[]
  yearFrom: number[]
  fuels: Fuel[]
  gearboxes: Transmission[]
  bodies: BodyType[]
}

export function buildOptions(list: (FilterFields & { make: string })[]): FilterOptions {
  if (!list.length) return { makes: [], priceFrom: [], priceTo: [], kmTo: [], yearFrom: [], fuels: [], gearboxes: [], bodies: [] }
  const prices = list.map((v) => v.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const steps: number[] = []
  for (let p = Math.floor(min / STEP) * STEP + STEP; p < max + STEP; p += STEP) steps.push(p)
  const kmMax = Math.max(...list.map((v) => v.mileage))
  const kmSteps = [25000, 50000, 75000, 100000, 125000, 150000, 200000, 250000, 300000]
  const makes = new Map<string, string>()
  list.forEach((v) => makes.set(v.makeSlug, v.make))
  return {
    makes: [...makes].map(([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label, 'de')),
    // "Preis von" starts at the lowest real price, never at an excluding round number.
    priceFrom: [min, ...steps.filter((p) => p < max)],
    priceTo: steps,
    kmTo: kmSteps.filter((k, i) => k <= kmMax || (kmSteps[i - 1] ?? 0) < kmMax),
    yearFrom: [...new Set(list.map((v) => Math.floor(v.firstRegistrationKey / 100)))].sort((a, b) => b - a),
    fuels: FUELS.filter((f) => list.some((v) => v.fuel === f)),
    gearboxes: GEARBOXES.filter((g) => list.some((v) => v.transmission === g)),
    bodies: BODIES.filter((b) => list.some((v) => v.body === b)),
  }
}
