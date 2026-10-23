// The site's view of the stock: read from Supabase (visible, non-archived vehicles only;
// Row Level Security enforces this for the anonymous key), cached under the tag
// "vehicles" and refreshed the moment an administrator saves (updateTag in
// app/[locale]/(admin)/admin/actions.ts). Without a database connection, or when the
// database does not answer, every function returns an empty result and the pages show
// their empty state (KARAR-DEFTERI 23.10.2026, section 2).
import { unstable_cache } from 'next/cache'
import { publicClient } from './supabase/public'
import { rowToVehicle, VEHICLE_SELECT, type VehicleWithPhotos } from './supabase/rows'
import type { Vehicle } from './types'
import type { CardVehicle } from './filter'

export const VEHICLES_TAG = 'vehicles'
/** Featured slots on the home page; filled up with the newest arrivals. */
export const FEATURED_SLOTS = 6

async function fetchVisible(): Promise<Vehicle[]> {
  const db = publicClient()
  if (!db) return []
  try {
    const { data, error } = await db
      .from('vehicles')
      .select(VEHICLE_SELECT)
      .is('archived_at', null)
      .eq('visible', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    return ((data ?? []) as VehicleWithPhotos[]).map(rowToVehicle)
  } catch (e) {
    console.error('[inventory] database not reachable:', e instanceof Error ? e.message : e)
    return []
  }
}

/** All visible vehicles, newest first. One query per cache life; the pages derive the rest. */
export const getVehicles = unstable_cache(fetchVisible, ['vehicles-visible'], { tags: [VEHICLES_TAG], revalidate: 300 })

export async function getVehicle(slug: string): Promise<Vehicle | null> {
  return (await getVehicles()).find((v) => v.slug === slug) ?? null
}

/** "Empfohlen": featured cars in their order, then the newest arrivals. */
const rankOf = (v: Vehicle, index: number) => (v.featured ? v.featuredOrder : 1000 + index)

export function toCard(v: Vehicle, index = 0): CardVehicle {
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
    status: v.status,
    createdAt: v.createdAt,
    cover: v.photos[v.cover],
    photoCount: v.photos.length,
    hasSpin: v.spin !== null,
    rank: rankOf(v, index),
  }
}

export async function getCards(): Promise<CardVehicle[]> {
  // vehicles without a photo cannot be shown on a card (the admin panel requires one)
  return (await getVehicles()).filter((v) => v.photos.length > 0).map(toCard)
}

/** Featured first (by their order), then the newest arrivals until the slots are full. */
export async function getFeatured(slots = FEATURED_SLOTS): Promise<Vehicle[]> {
  const all = (await getVehicles()).filter((v) => v.photos.length > 0)
  const featured = all.filter((v) => v.featured).sort((a, b) => a.featuredOrder - b.featuredOrder || b.createdAt.localeCompare(a.createdAt))
  const rest = all.filter((v) => !v.featured)
  return [...featured, ...rest].slice(0, slots)
}

export interface StockStats {
  count: number
  min: number
  max: number
}

export function statsOf(list: { price: number }[]): StockStats {
  if (!list.length) return { count: 0, min: 0, max: 0 }
  const prices = list.map((v) => v.price)
  return { count: list.length, min: Math.min(...prices), max: Math.max(...prices) }
}

export const getStockStats = async () => statsOf(await getCards())

/** Same make or body, price within ±20 %, closest price first (DESIGN.md §8.3). */
export function similarVehicles(v: Vehicle, all: Vehicle[], n = 6): Vehicle[] {
  const others = all.filter((o) => o.id !== v.id && o.photos.length > 0)
  const close = others
    .filter((o) => (o.makeSlug === v.makeSlug || (o.body !== null && o.body === v.body)) && Math.abs(o.price - v.price) <= v.price * 0.2)
    .sort((a, b) => Math.abs(a.price - v.price) - Math.abs(b.price - v.price))
  if (close.length >= 3) return close.slice(0, n)
  const rest = others.filter((o) => !close.includes(o)).sort((a, b) => Math.abs(a.price - v.price) - Math.abs(b.price - v.price))
  return [...close, ...rest].slice(0, Math.min(n, 4))
}
