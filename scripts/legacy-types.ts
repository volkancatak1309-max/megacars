// Shape of data/inventory.json, the backup of the last known real stock (June 2026).
// The site no longer reads this file; scripts/migrate-inventory.ts copies it into the
// database and scripts/import-inventory.ts can still rebuild it from cars-data.json.
import type { BodyType, Drive, EquipmentGroup, Fuel, Spin, Transmission } from '../lib/types'

export interface LegacyPhoto {
  src: string
  src800: string | null
  src240: string
  width: number
  height: number
  blur: string
}

export interface LegacyVehicle {
  id: string
  slug: string
  make: string
  makeSlug: string
  model: string
  version: string | null
  price: number
  mileage: number
  firstRegistration: string
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
  photos: LegacyPhoto[]
  cover: number
  og: string
  sourceUrl: string
  spin: Spin | null
}
