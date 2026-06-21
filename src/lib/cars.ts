import carsData from '../../cars-data.json'

export type Car = {
  id: string
  marka: string
  model: string
  aciklama: string
  fiyat: number
  yil: string
  km: number
  guc_ps: number
  guc_kw: number
  yakit: string
  vites: string
  url: string
  fotograflar: string[]
}

export const cars = carsData as unknown as Car[]

// Real, verifiable stats for the hero credential strip (no fabrication).
export const carStats = {
  total: cars.length,
  brands: new Set(cars.map((c) => c.marka)).size,
  minPrice: Math.min(...cars.map((c) => c.fiyat)),
  maxPrice: Math.max(...cars.map((c) => c.fiyat)),
  photos: cars.reduce((n, c) => n + c.fotograflar.length, 0),
}

// Highest-priced car (here also the most powerful) — for the Featured section.
export const featuredCar = cars.reduce((a, b) => (b.fiyat > a.fiyat ? b : a), cars[0])

// ---- helpers ---------------------------------------------------------------
export const carYear = (c: Car) => parseInt(c.yil.split('/')[1] ?? c.yil, 10)

// Body type is DERIVED — cars-data.json has no body field. Mapped by id from
// the known models (disclosed to the user; correct individual entries freely).
const BODY_BY_ID: Record<string, string> = {
  'mercedes-s-560-4matic': 'Limousine',
  'mercedes-c-220-d': 'Cabrio',
  'bmw-340-i-m-paket': 'Limousine',
  'vw-touran-highline': 'Van',
  'mercedes-glc-300-glc': 'SUV',
  'porsche-panamera-e-hybrid-s': 'Limousine',
  'mercedes-c-300-c': 'Kombi',
  'mercedes-a-35-amg': 'Limousine',
  'mercedes-glc-220-d': 'SUV',
  'bmw-320-320-d': 'Limousine',
  'bmw-320-d-advantage': 'Limousine',
  'audi-q3-35-tdi': 'SUV',
  'mercedes-c-180-c': 'Limousine',
  'volvo-xc60-allrad-4x4': 'SUV',
  'chrysler-sonstige-jeep-commander': 'SUV',
  'landrover-range-rover-sport': 'SUV',
  'bmw-x6-xdrive30d': 'SUV',
  'skoda-octavia-ambition-aut': 'Limousine',
}
export const bodyType = (c: Car) => BODY_BY_ID[c.id] ?? 'Limousine'

// ---- filter facets (DESIGN.md §5) -----------------------------------------
export type Lang = 'de' | 'tr'
export type FacetKey = 'marke' | 'preis' | 'jahr' | 'km' | 'kraftstoff' | 'karosserie'
export type Selection = Record<FacetKey, string[]>
export const emptySelection = (): Selection => ({
  marke: [],
  preis: [],
  jahr: [],
  km: [],
  kraftstoff: [],
  karosserie: [],
})

export type Option = {
  value: string
  label: Record<Lang, string>
  test: (c: Car) => boolean
  count: number
}
type Facet = { key: FacetKey; options: Option[] }

const withCount = (opts: Omit<Option, 'count'>[]): Option[] =>
  opts.map((o) => ({ ...o, count: cars.filter(o.test).length })).filter((o) => o.count > 0)

const FUEL_TR: Record<string, string> = {
  Benzin: 'Benzin',
  Diesel: 'Dizel',
  'Elektro/Benzin': 'Elektrik/Benzin',
}
const BODY_TR: Record<string, string> = {
  SUV: 'SUV',
  Limousine: 'Sedan',
  Kombi: 'Kombi',
  Cabrio: 'Cabrio',
  Van: 'Van',
}
const BODY_ORDER = ['SUV', 'Limousine', 'Kombi', 'Cabrio', 'Van']

const brands = [...new Set(cars.map((c) => c.marka))].sort((a, b) => a.localeCompare(b))
const fuels = [...new Set(cars.map((c) => c.yakit))]
const bodies = BODY_ORDER.filter((b) => cars.some((c) => bodyType(c) === b))

export const FACETS: Facet[] = [
  {
    key: 'marke',
    options: withCount(
      brands.map((b) => ({ value: b, label: { de: b, tr: b }, test: (c) => c.marka === b })),
    ),
  },
  {
    key: 'preis',
    options: withCount([
      { value: 'lt30', label: { de: 'bis 30.000 €', tr: '30.000 €’a kadar' }, test: (c) => c.fiyat < 30000 },
      { value: '30-40', label: { de: '30.000–40.000 €', tr: '30.000–40.000 €' }, test: (c) => c.fiyat >= 30000 && c.fiyat < 40000 },
      { value: '40-50', label: { de: '40.000–50.000 €', tr: '40.000–50.000 €' }, test: (c) => c.fiyat >= 40000 && c.fiyat < 50000 },
      { value: 'gt50', label: { de: 'ab 50.000 €', tr: '50.000 € ve üzeri' }, test: (c) => c.fiyat >= 50000 },
    ]),
  },
  {
    key: 'jahr',
    options: withCount([
      { value: 'y2022', label: { de: 'ab 2022', tr: '2022 ve sonrası' }, test: (c) => carYear(c) >= 2022 },
      { value: 'y2019', label: { de: '2019–2021', tr: '2019–2021' }, test: (c) => carYear(c) >= 2019 && carYear(c) <= 2021 },
      { value: 'y2015', label: { de: '2015–2018', tr: '2015–2018' }, test: (c) => carYear(c) >= 2015 && carYear(c) <= 2018 },
      { value: 'yold', label: { de: 'bis 2014', tr: '2014 ve öncesi' }, test: (c) => carYear(c) <= 2014 },
    ]),
  },
  {
    key: 'km',
    options: withCount([
      { value: 'lt50', label: { de: 'bis 50.000 km', tr: '50.000 km’ye kadar' }, test: (c) => c.km < 50000 },
      { value: '50-100', label: { de: '50.000–100.000 km', tr: '50.000–100.000 km' }, test: (c) => c.km >= 50000 && c.km < 100000 },
      { value: '100-150', label: { de: '100.000–150.000 km', tr: '100.000–150.000 km' }, test: (c) => c.km >= 100000 && c.km < 150000 },
      { value: 'gt150', label: { de: 'ab 150.000 km', tr: '150.000 km ve üzeri' }, test: (c) => c.km >= 150000 },
    ]),
  },
  {
    key: 'kraftstoff',
    options: withCount(
      fuels.map((f) => ({ value: f, label: { de: f, tr: FUEL_TR[f] ?? f }, test: (c) => c.yakit === f })),
    ),
  },
  {
    key: 'karosserie',
    options: withCount(
      bodies.map((b) => ({ value: b, label: { de: b, tr: BODY_TR[b] ?? b }, test: (c) => bodyType(c) === b })),
    ),
  },
]

export function matchesSelection(c: Car, sel: Selection): boolean {
  return FACETS.every((f) => {
    const chosen = sel[f.key]
    if (!chosen.length) return true
    return f.options.some((o) => chosen.includes(o.value) && o.test(c))
  })
}
