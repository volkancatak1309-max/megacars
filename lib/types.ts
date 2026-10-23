// Shape of a vehicle as the site reads it from the database (lib/inventory.ts) and as
// the migration script writes it. Every optional field is null when the dealer or the
// source listing did not state it; the UI hides rows whose value is null.

export type BodyType = 'limousine' | 'kombi' | 'cabrio' | 'coupe' | 'suv' | 'van' | 'kleinwagen'
export type Fuel = 'benzin' | 'diesel' | 'hybrid' | 'elektro'
export type Transmission = 'automatik' | 'schaltgetriebe'
export type Drive = 'allrad' | 'heck' | 'front'
export type EquipmentGroup = 'comfort' | 'media' | 'safety' | 'extras'
export type VehicleStatus = 'for_sale' | 'reserved' | 'sold'
/** VAT statement next to the price (§ 5 Abs. 2 ECG): unknown until the dealer confirms. */
export type VatNote = 'unknown' | 'incl' | 'margin'

export interface Photo {
  id: string
  /** Large photo (up to 1600 px wide) */
  src: string
  /** 800 px wide copy, or null when the large file is not wider than 800 px */
  src800: string | null
  /** 240 px wide copy for thumbnails */
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
  /** "MM/YYYY" */
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
  /** key of lib/options.ts COLORS, or the listing's own word for migrated cars */
  colorBase: string | null
  colorManufacturer: string | null
  interiorColor: string | null
  interiorMaterial: string | null
  serviceBook: boolean | null
  nonSmoker: boolean | null
  previousOwners: number | null
  lastService: string | null
  accidentFree: boolean
  firstOwner: boolean
  warranty: boolean
  inspectionNew: boolean
  vatNote: VatNote
  /** keys of data/equipment.json */
  equipment: string[]
  photos: Photo[]
  /** index into photos used as cover */
  cover: number
  /** share image: the cover photo's large file */
  og: string
  sourceUrl: string | null
  spin: Spin | null
  status: VehicleStatus
  visible: boolean
  featured: boolean
  featuredOrder: number
  /** ISO timestamps */
  createdAt: string
  updatedAt: string
  archivedAt: string | null
}
