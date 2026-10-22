import { getLocale, getTranslations } from 'next-intl/server'
import { stockStats, vehicles } from '@/lib/inventory'
import { formatKm, formatPower, formatPrice, vehicleName } from '@/lib/format'
import type { Photo, Vehicle } from '@/lib/types'

// six cars across the whole price range, the same in all three prototypes
const PICK = [
  'mercedes-s-560-4matic',
  'porsche-panamera-e-hybrid-s',
  'bmw-340-i-m-paket',
  'mercedes-c-220-d',
  'landrover-range-rover-sport',
  'skoda-octavia-ambition-aut',
]

export interface ProtoCar {
  id: string
  slug: string
  make: string
  model: string
  version: string | null
  name: string
  price: string
  chain: string
  photos: Photo[]
  cover: Photo
  alt: string
  facts: { label: string; value: string }[]
}

export async function protoCars(ids: string[] = PICK): Promise<ProtoCar[]> {
  const list = ids.map((id) => vehicles.find((v) => v.id === id)).filter((v): v is Vehicle => Boolean(v))
  return Promise.all(list.map(toProtoCar))
}

export async function protoCar(slug: string) {
  const v = vehicles.find((x) => x.slug === slug)
  return v ? toProtoCar(v) : null
}

async function toProtoCar(v: Vehicle): Promise<ProtoCar> {
  const locale = await getLocale()
  const t = await getTranslations('vehicle')
  const color = v.colorBase && t.has(`colorValues.${v.colorBase}`) ? t(`colorValues.${v.colorBase}`) : v.colorBase
  const name = [vehicleName(v), v.version].filter(Boolean).join(' ')
  const facts = [
    { label: t('registration'), value: v.firstRegistration },
    { label: t('mileage'), value: formatKm(v.mileage, locale) },
    { label: t('power'), value: formatPower(v.powerKw, v.powerPs, locale) },
    { label: t('fuel'), value: v.fuel ? t(`fuelValues.${v.fuel}`) : null },
    { label: t('gearbox'), value: v.transmission ? t(`gearboxValues.${v.transmission}`) : null },
    { label: t('body'), value: v.body ? t(`bodyValues.${v.body}`) : null },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))
  return {
    id: v.id,
    slug: v.slug,
    make: v.make,
    model: v.model,
    version: v.version,
    name,
    price: formatPrice(v.price, locale),
    chain: [v.firstRegistration, formatKm(v.mileage, locale), v.powerPs ? `${v.powerPs} PS` : null].filter(Boolean).join(' · '),
    photos: v.photos,
    cover: v.photos[v.cover],
    alt: color
      ? t('photoAlt', { name, color: locale === 'tr' ? color.toLocaleLowerCase('tr') : color, index: 1, total: v.photos.length })
      : t('photoAltNoColor', { name, index: 1, total: v.photos.length }),
    facts,
  }
}

export async function protoStock() {
  const locale = await getLocale()
  return { count: stockStats.count, min: formatPrice(stockStats.min, locale), max: formatPrice(stockStats.max, locale) }
}

export const protoSlugs = () => vehicles.map((v) => v.slug)
