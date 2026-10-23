/**
 * Copies the 18 demo vehicles of data/inventory.json (last known real stock, June 2026)
 * with their photos into the Supabase project. Re-runnable: vehicles are matched by
 * legacy_id, photos by their position, files are overwritten in the bucket.
 *
 * Needs in .env.local (never in the repo):
 *   NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY (service role; bypasses RLS for the import)
 *
 * Usage: npm run migrate            (dry run: prints what would change)
 *        npm run migrate -- --write (writes)
 */
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { COLOR_KEY_OF, MATERIAL_KEY_OF } from '../lib/options'
import { equipmentKeyOf } from '../lib/equipment'
import type { LegacyVehicle } from './legacy-types'

const ROOT = process.cwd()
const PUBLIC = path.join(ROOT, 'public')
const BUCKET = 'vehicles'
const WRITE = process.argv.includes('--write')

function loadEnv() {
  const file = path.join(ROOT, '.env.local')
  if (!fs.existsSync(file)) return
  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
  }
}
loadEnv()
const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !secret) {
  console.error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY are missing (see .env.local)')
  process.exit(1)
}
const db = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } })

const vehicles: LegacyVehicle[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'inventory.json'), 'utf8'))
const featured: string[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'featured.json'), 'utf8'))

/** Deterministic UUID v5-like id from the legacy id, so re-runs keep the same rows and paths. */
import { createHash } from 'node:crypto'
const uuidOf = (seed: string) => {
  const h = createHash('sha1').update(`megacars:${seed}`).digest('hex')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`
}

async function uploadFile(rel: string, dest: string) {
  const file = path.join(PUBLIC, rel)
  const body = fs.readFileSync(file)
  const { error } = await db.storage.from(BUCKET).upload(dest, body, { contentType: 'image/webp', cacheControl: '31536000', upsert: true })
  if (error) throw new Error(`${dest}: ${error.message}`)
}

async function main() {
  console.log(`${WRITE ? 'WRITING' : 'dry run'}: ${vehicles.length} vehicles → ${url}`)
  const missing = new Set<string>()
  // "Empfohlen" order of the demo: featured first, then the file order → arrival dates one
  // minute apart, so "Neu eingetroffen" shows the same order until real cars arrive
  const order = [...featured, ...vehicles.map((v) => v.id).filter((id) => !featured.includes(id))]
  const base = Date.now() - order.length * 60_000

  for (const v of vehicles) {
    const id = uuidOf(v.id)
    const [mm, yyyy] = v.firstRegistration.split('/')
    const equipment = Object.values(v.equipment)
      .flat()
      .map((label) => {
        const key = equipmentKeyOf(label)
        if (!key) missing.add(label)
        return key
      })
      .filter((k): k is string => Boolean(k))
    const rank = order.indexOf(v.id)
    const row = {
      id,
      legacy_id: v.id,
      slug: v.slug,
      make: v.make,
      make_slug: v.makeSlug,
      model: v.model,
      version: v.version,
      price: v.price,
      mileage: v.mileage,
      first_registration: `${yyyy}-${mm}-01`,
      power_kw: v.powerKw,
      power_ps: v.powerPs,
      fuel: v.fuel,
      transmission: v.transmission,
      body: v.body,
      drive: v.drive,
      seats: v.seats,
      doors: v.doors,
      gears: v.gears,
      cylinders: v.cylinders,
      displacement_ccm: v.displacementCcm,
      weight_kg: v.weightKg,
      emission_class: v.emissionClass,
      consumption_l: v.consumptionL,
      co2: v.co2,
      color: v.colorBase ? (COLOR_KEY_OF[v.colorBase] ?? v.colorBase) : null,
      color_manufacturer: v.colorManufacturer,
      interior_color: v.interiorColor ? (COLOR_KEY_OF[v.interiorColor] ?? v.interiorColor) : null,
      interior_material: v.interiorMaterial ? (MATERIAL_KEY_OF[v.interiorMaterial] ?? v.interiorMaterial) : null,
      service_book: v.serviceBook,
      non_smoker: v.nonSmoker,
      previous_owners: v.previousOwners,
      last_service: v.lastService,
      vat_note: 'unknown',
      equipment,
      source_url: v.sourceUrl,
      spin: v.spin,
      status: 'for_sale',
      visible: true,
      featured: featured.includes(v.id),
      featured_order: featured.includes(v.id) ? featured.indexOf(v.id) : 0,
      created_at: new Date(base + rank * 60_000).toISOString(),
    }
    const photos = v.photos.map((p, i) => {
      const photoId = uuidOf(`${v.id}/${i}`)
      return {
        id: photoId,
        vehicle_id: id,
        position: i,
        is_cover: i === v.cover,
        path: `${id}/${photoId}`,
        ext: 'webp',
        width: p.width,
        height: p.height,
        blur: p.blur,
        files: [
          [p.src.slice(1), '1600'],
          [(p.src800 ?? p.src).slice(1), '800'],
          [p.src240.slice(1), '240'],
        ] as [string, string][],
      }
    })
    console.log(`  ${v.id} → ${id} (${photos.length} photos, ${equipment.length} equipment keys)`)
    if (!WRITE) continue

    // the vehicle row keeps created_at only on first insert (re-runs must not reorder the list)
    const { data: existing } = await db.from('vehicles').select('id, created_at').eq('id', id).maybeSingle()
    const { error: ve } = await db.from('vehicles').upsert(existing ? { ...row, created_at: existing.created_at } : row, { onConflict: 'id' })
    if (ve) throw new Error(`${v.id}: ${ve.message}`)
    for (const p of photos) {
      for (const [rel, size] of p.files) await uploadFile(rel, `${p.path}/${size}.webp`)
    }
    await db.from('vehicle_photos').update({ is_cover: false }).eq('vehicle_id', id)
    const { error: pe } = await db.from('vehicle_photos').upsert(
      photos.map(({ files: _files, ...rest }) => rest),
      { onConflict: 'id' },
    )
    if (pe) throw new Error(`${v.id} photos: ${pe.message}`)
  }
  if (missing.size) console.warn('equipment without a key (left out):', [...missing].join(' | '))
  console.log(WRITE ? 'done' : 'dry run finished (add --write to import)')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
