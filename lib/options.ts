// Fixed choice lists shared by the site, the admin panel and the migration script.
// Keys are stored in the database; the words come from messages/*.json ("vehicle").
import type { BodyType, Drive, Fuel, Transmission, VatNote, VehicleStatus } from './types'

export const FUELS = ['benzin', 'diesel', 'hybrid', 'elektro'] as const satisfies readonly Fuel[]
export const GEARBOXES = ['automatik', 'schaltgetriebe'] as const satisfies readonly Transmission[]
export const BODIES = ['limousine', 'kombi', 'cabrio', 'coupe', 'suv', 'van', 'kleinwagen'] as const satisfies readonly BodyType[]
export const DRIVES = ['allrad', 'heck', 'front'] as const satisfies readonly Drive[]
export const STATUSES = ['for_sale', 'reserved', 'sold'] as const satisfies readonly VehicleStatus[]
export const VAT_NOTES = ['unknown', 'incl', 'margin'] as const satisfies readonly VatNote[]

/** Exterior and interior colours (keys of vehicle.colorValues). */
export const COLORS = ['schwarz', 'weiss', 'silber', 'grau', 'blau', 'rot', 'gruen', 'gelb', 'orange', 'braun', 'beige', 'gold', 'bronze', 'violett'] as const
/** Interior materials (keys of vehicle.materialValues). */
export const MATERIALS = ['vollleder', 'teilleder', 'stoff', 'alcantara', 'velours', 'kunstleder'] as const
export const EMISSION_CLASSES = ['Euro 4', 'Euro 5', 'Euro 6', 'Euro 6b', 'Euro 6c', 'Euro 6d-TEMP', 'Euro 6d', 'Euro 6e'] as const
export const SEATS = [2, 4, 5, 6, 7, 8, 9] as const
export const DOORS = [2, 3, 4, 5] as const

/** Words of the listings (data/inventory.json) → keys, for the migration. */
export const COLOR_KEY_OF: Record<string, (typeof COLORS)[number]> = {
  Schwarz: 'schwarz',
  Weiß: 'weiss',
  Silber: 'silber',
  Grau: 'grau',
  Blau: 'blau',
  Rot: 'rot',
  Grün: 'gruen',
  Gelb: 'gelb',
  Orange: 'orange',
  Braun: 'braun',
  Beige: 'beige',
  Gold: 'gold',
  Bronze: 'bronze',
  Violett: 'violett',
}
export const MATERIAL_KEY_OF: Record<string, (typeof MATERIALS)[number]> = {
  Vollleder: 'vollleder',
  Teilleder: 'teilleder',
  Stoff: 'stoff',
  Alcantara: 'alcantara',
  Velours: 'velours',
  Kunstleder: 'kunstleder',
}

/** 1 PS = 0.7355 kW (DIN metric horsepower). */
export const kwToPs = (kw: number) => Math.round(kw / 0.7355)
export const psToKw = (ps: number) => Math.round(ps * 0.7355)
