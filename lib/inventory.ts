import raw from '@/data/inventory.json'
import featuredIds from '@/data/featured.json'
import type { Vehicle } from './types'
import type { CardVehicle } from './filter'

export const vehicles = raw as unknown as Vehicle[]

export const getVehicle = (slug: string) => vehicles.find((v) => v.slug === slug) ?? null

const featuredRank = new Map((featuredIds as string[]).map((id, i) => [id, i]))
/** "Empfohlen": featured cars first, then the order of data/inventory.json. */
const rankOf = (v: Vehicle) => featuredRank.get(v.id) ?? 100 + vehicles.indexOf(v)

export function toCard(v: Vehicle): CardVehicle {
  return {
    id: v.id,
    slug: v.slug,
    make: v.make,
    makeSlug: v.makeSlug,
    model: v.model,
    version: v.version,
    price: v.price,
    mileage: v.mileage,
    firstRegistration: v.firstRegistration,
    firstRegistrationKey: v.firstRegistrationKey,
    powerKw: v.powerKw,
    powerPs: v.powerPs,
    fuel: v.fuel,
    transmission: v.transmission,
    body: v.body,
    colorBase: v.colorBase,
    cover: v.photos[v.cover],
    photoCount: v.photos.length,
    hasSpin: v.spin !== null,
    rank: rankOf(v),
  }
}

export const featuredVehicles = () =>
  (featuredIds as string[]).map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v))

/** Same make or body, price within ±20 %, closest price first (DESIGN.md §8.3). */
export function similarVehicles(v: Vehicle, n = 6): Vehicle[] {
  const close = vehicles
    .filter(
      (o) =>
        o.id !== v.id &&
        (o.makeSlug === v.makeSlug || (o.body !== null && o.body === v.body)) &&
        Math.abs(o.price - v.price) <= v.price * 0.2,
    )
    .sort((a, b) => Math.abs(a.price - v.price) - Math.abs(b.price - v.price))
  if (close.length >= 3) return close.slice(0, n)
  const rest = vehicles
    .filter((o) => o.id !== v.id && !close.includes(o))
    .sort((a, b) => Math.abs(a.price - v.price) - Math.abs(b.price - v.price))
  return [...close, ...rest].slice(0, Math.min(n, 4))
}

export const stockStats = {
  count: vehicles.length,
  min: Math.min(...vehicles.map((v) => v.price)),
  max: Math.max(...vehicles.map((v) => v.price)),
}
