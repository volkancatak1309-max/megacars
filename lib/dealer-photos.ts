// The dealer's own photos used outside the stock: the showroom interior and the building
// with its sign. They are listing photos kept in the repo (public/cars) and read from the
// backup file data/inventory.json, so they do not depend on the database.
import backup from '@/data/inventory.json'
import type { Photo } from './types'

type BackupPhoto = Omit<Photo, 'id'>
type BackupVehicle = { id: string; photos: BackupPhoto[] }

const photoOf = (vehicleId: string, index: number): Photo => {
  const v = (backup as BackupVehicle[]).find((x) => x.id === vehicleId)
  if (!v) throw new Error(`dealer photo: ${vehicleId} is missing from data/inventory.json`)
  return { id: `${vehicleId}-${index}`, ...v.photos[index] }
}

/** Showroom interior with a car under the ceiling lights (public/cars/mercedes-glc-220-d/4.webp). */
export const SHOWROOM_PHOTO = photoOf('mercedes-glc-220-d', 3)
/** The building with the "MEGA CARS" sign (public/cars/audi-q3-35-tdi/1.webp). */
export const BUILDING_PHOTO = photoOf('audi-q3-35-tdi', 0)
