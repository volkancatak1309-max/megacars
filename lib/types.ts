// Shape of data/inventory.json. Every optional field is null when the source
// listing does not state it; the UI hides rows whose value is null.

export type BodyType = 'limousine' | 'kombi' | 'cabrio' | 'coupe' | 'suv' | 'van' | 'kleinwagen'
export type Fuel = 'benzin' | 'diesel' | 'hybrid' | 'elektro'
export type Transmission = 'automatik' | 'schaltgetriebe'
export type Drive = 'allrad' | 'heck' | 'front'
export type EquipmentGroup = 'comfort' | 'media' | 'safety' | 'extras'

export interface Photo {
  /** Original listing photo, e.g. /cars/<id>/1.webp */
  src: string
  /** 800 px wide derivative, or null when the original is not wider than 800 px */
  src800: string | null
  /** 240 px wide derivative for thumbnails */
  src240: string
  width: number
  height: number
  /** 16 px WebP as data URL for the blur-up placeholder */
  blur: string
}

/** 360° showroom data; null until a real shoot has been processed. */
export interface Spin {
  version: string
  frames: number
  angleStep: number
  sizes: number[]
  zoom?: number
  backdrop: 'A' | 'B' | 'C'
  cameraDirection: 'cw' | 'ccw'
}

export interface Vehicle {
  id: string
  slug: string
  make: string
  makeSlug: string
  model: string
  version: string | null
  price: number
  mileage: number
  /** "MM/YYYY" as in the listing */
  firstRegistration: string
  /** YYYYMM, for sorting and filtering */
  firstRegistrationKey: number
  powerKw: number | null
  powerPs: number | null
  fuel: Fuel | null
  transmission: Transmission | null
  body: BodyType | null
  drive: Drive | null
  seats: number | null
  doors: number | null
  gears: number | null
  cylinders: number | null
  displacementCcm: number | null
  weightKg: number | null
  emissionClass: string | null
  /** combined consumption in l/100 km */
  consumptionL: number | null
  co2: number | null
  colorBase: string | null
  colorManufacturer: string | null
  interiorColor: string | null
  interiorMaterial: string | null
  serviceBook: boolean | null
  nonSmoker: boolean | null
  previousOwners: number | null
  lastService: string | null
  equipment: Record<EquipmentGroup, string[]>
  photos: Photo[]
  /** index into photos used as cover (listing's own first photo unless set) */
  cover: number
  /** 1200×630 JPEG crop of the cover for Open Graph */
  og: string
  sourceUrl: string
  spin: Spin | null
}
