import { ViewTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { CardVehicle } from '@/lib/filter'
import { vehicleName } from '@/lib/format'
import { CarImage } from '@/components/ui/CarImage'
import { useVehicleLabels } from './labels'

export const CARD_SIZES = '(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'

/**
 * Vehicle card (DESIGN.md §7.2): original cover photo 4:3, name, one spec line, price.
 * The whole card is one link; the photo carries the shared view-transition name that
 * grows into the detail page (Wow 3).
 */
export function VehicleCard({
  v,
  sizes = CARD_SIZES,
  priority = false,
  headingLevel = 'h3',
}: {
  v: CardVehicle
  sizes?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
}) {
  const tc = useTranslations('common')
  const label = useVehicleLabels()
  const Heading = headingLevel
  return (
    <Link
      href={{ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } }}
      className="group block rounded-[4px] transition-transform duration-300 active:scale-[0.99]"
    >
      <ViewTransition name={`car-${v.id}`} share="car-photo" default="none">
        <CarImage
          photo={v.cover}
          alt={label.photoAlt(v, 1, v.photoCount)}
          sizes={sizes}
          priority={priority}
          className="aspect-[4/3] rounded-[4px]"
          imgClassName="transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.02]"
        />
      </ViewTransition>
      <div className="mt-4 grid gap-1">
        <Heading className="t-h3 line-clamp-2 decoration-1 underline-offset-4 group-hover:underline">{vehicleName(v)}</Heading>
        {v.version && <p className="line-clamp-1 text-ink-2">{v.version}</p>}
        <p className="tabular mt-1 text-[0.9375rem] text-ink-2">{label.chain(v)}</p>
        <div className="mt-2 flex items-baseline justify-between gap-4">
          <p className="t-price-s text-ink">{label.price(v.price)}</p>
          <p className="t-label">{tc('photos', { count: v.photoCount })}</p>
        </div>
      </div>
    </Link>
  )
}
