// Database rows ↔ the site's Vehicle / Photo shapes.
import type { BodyType, Drive, Fuel, Photo, Spin, Transmission, VatNote, Vehicle, VehicleStatus } from '../types'
import { storageUrl } from './env'

export interface PhotoRow {
  id: string
  vehicle_id: string
  position: number
  is_cover: boolean
  path: string
  ext: 'webp' | 'jpg'
  width: number
  height: number
  blur: string
}

export interface VehicleRow {
  id: string
  legacy_id: string | null
  slug: string
  make: string
  make_slug: string
  model: string
  version: string | null
  price: number
  mileage: number
  first_registration: string
  power_kw: number | null
  power_ps: number | null
  fuel: Fuel | null
  transmission: Transmission | null
  body: BodyType | null
  drive: Drive | null
  seats: number | null
  doors: number | null
  gears: number | null
  cylinders: number | null
  displacement_ccm: number | null
  weight_kg: number | null
  emission_class: string | null
  consumption_l: number | string | null
  co2: number | null
  color: string | null
  color_manufacturer: string | null
  interior_color: string | null
  interior_material: string | null
  service_book: boolean | null
  non_smoker: boolean | null
  previous_owners: number | null
  last_service: string | null
  accident_free: boolean
  first_owner: boolean
  warranty: boolean
  inspection_new: boolean
  vat_note: VatNote
  equipment: string[]
  source_url: string | null
  spin: Spin | null
  status: VehicleStatus
  visible: boolean
  featured: boolean
  featured_order: number
  created_at: string
  updated_at: string
  archived_at: string | null
}

export type VehicleWithPhotos = VehicleRow & { vehicle_photos: PhotoRow[] }

/** Columns the public site needs; photos come along as an embedded list. */
export const VEHICLE_SELECT = '*, vehicle_photos(*)'

export function toPhoto(p: PhotoRow): Photo {
  return {
    id: p.id,
    src: storageUrl(`${p.path}/1600.${p.ext}`),
    src800: p.width > 800 ? storageUrl(`${p.path}/800.${p.ext}`) : null,
    src240: storageUrl(`${p.path}/240.${p.ext}`),
    width: p.width,
    height: p.height,
    blur: p.blur,
  }
}

/** "2019-02-01" → "02/2019" and 201902 */
export function registrationOf(date: string): { label: string; key: number } {
  const [y, m] = date.split('-')
  return { label: `${m}/${y}`, key: Number(y) * 100 + Number(m) }
}

export function rowToVehicle(r: VehicleWithPhotos): Vehicle {
  const rows = [...(r.vehicle_photos ?? [])].sort((a, b) => a.position - b.position)
  const photos = rows.map(toPhoto)
  const coverIndex = Math.max(0, rows.findIndex((p) => p.is_cover))
  const reg = registrationOf(r.first_registration)
  return {
    id: r.id,
    slug: r.slug,
    make: r.make,
    makeSlug: r.make_slug,
    model: r.model,
    version: r.version,
    price: r.price,
    mileage: r.mileage,
    firstRegistration: reg.label,
    firstRegistrationKey: reg.key,
    powerKw: r.power_kw,
    powerPs: r.power_ps,
    fuel: r.fuel,
    transmission: r.transmission,
    body: r.body,
    drive: r.drive,
    seats: r.seats,
    doors: r.doors,
    gears: r.gears,
    cylinders: r.cylinders,
    displacementCcm: r.displacement_ccm,
    weightKg: r.weight_kg,
    emissionClass: r.emission_class,
    consumptionL: r.consumption_l === null ? null : Number(r.consumption_l),
    co2: r.co2,
    colorBase: r.color,
    colorManufacturer: r.color_manufacturer,
    interiorColor: r.interior_color,
    interiorMaterial: r.interior_material,
    serviceBook: r.service_book,
    nonSmoker: r.non_smoker,
    previousOwners: r.previous_owners,
    lastService: r.last_service,
    accidentFree: r.accident_free,
    firstOwner: r.first_owner,
    warranty: r.warranty,
    inspectionNew: r.inspection_new,
    vatNote: r.vat_note,
    equipment: r.equipment ?? [],
    photos,
    cover: photos.length ? coverIndex : 0,
    og: photos[coverIndex]?.src ?? '',
    sourceUrl: r.source_url,
    spin: r.spin,
    status: r.status,
    visible: r.visible,
    featured: r.featured,
    featuredOrder: r.featured_order,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    archivedAt: r.archived_at,
  }
}
