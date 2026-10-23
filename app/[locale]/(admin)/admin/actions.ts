'use server'
// Server actions of the admin panel. Every write runs through the administrator's own
// session, so Row Level Security is the final guard; afterwards the site's cache is
// expired, and the next visit renders the new state (KARAR-DEFTERI 23.10.2026).
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { currentAdmin, sessionClient } from '@/lib/supabase/server'
import { PHOTO_BUCKET } from '@/lib/supabase/env'
import { VEHICLES_TAG } from '@/lib/inventory'
import { parseVehicleInput, type FieldErrors } from '@/lib/admin/schema'
import { slugify, vehicleSlug } from '@/lib/admin/slug'
import type { VehicleStatus } from '@/lib/types'

const SIZES = ['1600', '800', '240'] as const

function refreshSite() {
  revalidateTag(VEHICLES_TAG, { expire: 0 })
  revalidatePath('/', 'layout')
}

const asLocale = (l: unknown): Locale => (l === 'tr' ? 'tr' : 'de')

export interface LoginState {
  error: 'failed' | 'notAdmin' | 'noConnection' | null
}

export async function signIn(_prev: LoginState, form: FormData): Promise<LoginState> {
  const db = await sessionClient()
  if (!db) return { error: 'noConnection' }
  const email = String(form.get('email') ?? '').trim()
  const password = String(form.get('password') ?? '')
  const { error } = await db.auth.signInWithPassword({ email, password })
  if (error) return { error: 'failed' }
  const admin = await currentAdmin()
  if (!admin) {
    await db.auth.signOut()
    return { error: 'notAdmin' }
  }
  redirect({ href: '/admin', locale: asLocale(form.get('locale')) })
  return { error: null }
}

export async function signOut(locale: string) {
  const db = await sessionClient()
  await db?.auth.signOut()
  redirect({ href: '/admin/login', locale: asLocale(locale) })
}

export type SaveResult = { ok: true; id: string } | { ok: false; errors?: FieldErrors; message?: string }

/** Creates or updates a vehicle with its photo rows; the files are already in the bucket. */
export async function saveVehicle(raw: unknown): Promise<SaveResult> {
  const admin = await currentAdmin()
  if (!admin) return { ok: false, message: 'forbidden' }
  const parsed = parseVehicleInput(raw)
  if (!parsed.ok) return { ok: false, errors: parsed.errors }
  const v = parsed.data
  const db = admin.client

  const { data: existing } = await db.from('vehicles').select('id, slug').eq('id', v.id).maybeSingle()
  const slug = existing?.slug ?? vehicleSlug(v)
  const row = {
    id: v.id,
    slug,
    make: v.make,
    make_slug: slugify(v.make),
    model: v.model,
    version: v.version,
    price: v.price,
    mileage: v.mileage,
    first_registration: `${v.registrationYear}-${String(v.registrationMonth).padStart(2, '0')}-01`,
    power_kw: v.powerKw,
    power_ps: v.powerPs,
    fuel: v.fuel,
    transmission: v.transmission,
    body: v.body,
    drive: v.drive,
    seats: v.seats,
    doors: v.doors,
    displacement_ccm: v.displacementCcm,
    emission_class: v.emissionClass,
    consumption_l: v.consumptionL,
    co2: v.co2,
    color: v.color,
    interior_color: v.interiorColor,
    interior_material: v.interiorMaterial,
    previous_owners: v.previousOwners,
    service_book: v.serviceBook,
    non_smoker: v.nonSmoker,
    accident_free: v.accidentFree,
    first_owner: v.firstOwner,
    warranty: v.warranty,
    inspection_new: v.inspectionNew,
    vat_note: v.vatNote,
    equipment: v.equipment,
    status: v.status,
    visible: v.visible,
    featured: v.featured,
    featured_order: v.featuredOrder,
  }
  const up = await db.from('vehicles').upsert(row, { onConflict: 'id' })
  if (up.error) return { ok: false, message: up.error.message }

  // photos: rows that left the form are removed (with their files), the rest are written in order
  const { data: oldRows } = await db.from('vehicle_photos').select('id, path, ext').eq('vehicle_id', v.id)
  const keep = new Set(v.photos.map((p) => p.id))
  const gone = ((oldRows ?? []) as { id: string; path: string; ext: string }[]).filter((p) => !keep.has(p.id))
  if (gone.length) {
    await db.from('vehicle_photos').delete().in('id', gone.map((p) => p.id))
    await db.storage.from(PHOTO_BUCKET).remove(gone.flatMap((p) => SIZES.map((s) => `${p.path}/${s}.${p.ext}`)))
  }
  await db.from('vehicle_photos').update({ is_cover: false }).eq('vehicle_id', v.id)
  const photoRows = v.photos.map((p, i) => ({
    id: p.id,
    vehicle_id: v.id,
    position: i,
    is_cover: p.id === v.cover,
    path: p.path,
    ext: p.ext,
    width: p.width,
    height: p.height,
    blur: p.blur,
  }))
  const ph = await db.from('vehicle_photos').upsert(photoRows, { onConflict: 'id' })
  if (ph.error) return { ok: false, message: ph.error.message }

  refreshSite()
  return { ok: true, id: v.id }
}

export interface QuickPatch {
  visible?: boolean
  featured?: boolean
  featuredOrder?: number
  status?: VehicleStatus
}

/** One-click changes from the list: show/hide, feature, status. */
export async function patchVehicles(ids: string[], patch: QuickPatch): Promise<{ ok: boolean; message?: string }> {
  const admin = await currentAdmin()
  if (!admin) return { ok: false, message: 'forbidden' }
  const row: Record<string, unknown> = {}
  if (patch.visible !== undefined) row.visible = patch.visible
  if (patch.featured !== undefined) row.featured = patch.featured
  if (patch.featuredOrder !== undefined) row.featured_order = patch.featuredOrder
  if (patch.status !== undefined && ['for_sale', 'reserved', 'sold'].includes(patch.status)) row.status = patch.status
  if (!Object.keys(row).length || !ids.length) return { ok: true }
  const { error } = await admin.client.from('vehicles').update(row).in('id', ids)
  if (error) return { ok: false, message: error.message }
  refreshSite()
  return { ok: true }
}

/** Soft delete: the vehicle leaves the site and waits in the archive. */
export async function archiveVehicles(ids: string[], archived: boolean): Promise<{ ok: boolean; message?: string }> {
  const admin = await currentAdmin()
  if (!admin) return { ok: false, message: 'forbidden' }
  const { error } = await admin.client
    .from('vehicles')
    .update({ archived_at: archived ? new Date().toISOString() : null })
    .in('id', ids)
  if (error) return { ok: false, message: error.message }
  refreshSite()
  return { ok: true }
}

/** Final delete of an archived vehicle: rows and every photo file. */
export async function deleteVehicle(id: string): Promise<{ ok: boolean; message?: string }> {
  const admin = await currentAdmin()
  if (!admin) return { ok: false, message: 'forbidden' }
  const db = admin.client
  const { data: v } = await db.from('vehicles').select('id, archived_at').eq('id', id).maybeSingle()
  if (!v) return { ok: false, message: 'missing' }
  if (!v.archived_at) return { ok: false, message: 'notArchived' }
  const { data: photos } = await db.from('vehicle_photos').select('path, ext').eq('vehicle_id', id)
  const files = ((photos ?? []) as { path: string; ext: string }[]).flatMap((p) => SIZES.map((s) => `${p.path}/${s}.${p.ext}`))
  if (files.length) await db.storage.from(PHOTO_BUCKET).remove(files)
  const { error } = await db.from('vehicles').delete().eq('id', id)
  if (error) return { ok: false, message: error.message }
  refreshSite()
  return { ok: true }
}

/** Removes an uploaded file set that never reached a saved vehicle (photo removed before saving). */
export async function discardUpload(path: string, ext: 'webp' | 'jpg'): Promise<void> {
  const admin = await currentAdmin()
  if (!admin || !/^[0-9a-f-]{36}\/[0-9a-f-]{36}$/i.test(path)) return
  await admin.client.storage.from(PHOTO_BUCKET).remove(SIZES.map((s) => `${path}/${s}.${ext}`))
}
