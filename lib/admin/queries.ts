// Reads for the admin panel through the administrator's own session: Row Level
// Security lets administrators see hidden and archived vehicles too.
import type { SupabaseClient } from '@supabase/supabase-js'
import { rowToVehicle, VEHICLE_SELECT, type VehicleWithPhotos } from '../supabase/rows'
import type { Vehicle } from '../types'

export async function listVehicles(db: SupabaseClient, archived: boolean): Promise<Vehicle[]> {
  let q = db.from('vehicles').select(VEHICLE_SELECT)
  q = archived ? q.not('archived_at', 'is', null).order('archived_at', { ascending: false }) : q.is('archived_at', null).order('created_at', { ascending: false })
  const { data, error } = await q
  if (error) throw new Error(error.message)
  return ((data ?? []) as VehicleWithPhotos[]).map(rowToVehicle)
}

export async function getVehicleById(db: SupabaseClient, id: string): Promise<Vehicle | null> {
  const { data, error } = await db.from('vehicles').select(VEHICLE_SELECT).eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  return data ? rowToVehicle(data as VehicleWithPhotos) : null
}

/** Makes and models already in the database (archived ones included), for the pick lists. */
export async function knownMakesAndModels(db: SupabaseClient): Promise<{ makes: string[]; models: Record<string, string[]> }> {
  const { data, error } = await db.from('vehicles').select('make, model')
  if (error) throw new Error(error.message)
  const models: Record<string, Set<string>> = {}
  for (const r of (data ?? []) as { make: string; model: string }[]) (models[r.make] ??= new Set()).add(r.model)
  return {
    makes: Object.keys(models).sort((a, b) => a.localeCompare(b, 'de')),
    models: Object.fromEntries(Object.entries(models).map(([m, s]) => [m, [...s].sort((a, b) => a.localeCompare(b, 'de'))])),
  }
}
