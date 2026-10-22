import { useTranslations } from 'next-intl'
import type { CardVehicle } from '@/lib/filter'
import { CarImage } from '@/components/ui/CarImage'
import { CurtainLink } from '@/components/site/Curtain'
import { useVehicleLabels } from './labels'

export const CARD_SIZES = '(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw'

/**
 * Vehicle card: the original cover photo in its own frame (it grows 1.04 inside the
 * frame on hover), make, model in display type, a red rule drawn across, one spec
 * line and the price. The whole card is one link behind the red curtain; the cursor
 * says "Ansehen" (no image preview).
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
    <CurtainLink href={{ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } }} className="vc" data-cursor>
      <span className="vc-frame clip-reveal" data-reveal>
        <CarImage photo={v.cover} alt={label.photoAlt(v, 1, v.photoCount)} sizes={sizes} priority={priority} className="aspect-[4/3] h-full w-full" />
        <span className="vc-photos tabular">{tc('photos', { count: v.photoCount })}</span>
      </span>
      <span className="vc-body">
        <span className="vc-make">{v.make}</span>
        <Heading className="vc-model">{v.model}</Heading>
        {v.version && <span className="vc-version">{v.version}</span>}
        <span className="vc-rule" aria-hidden="true" />
        <span className="vc-chain tabular">{label.chain(v)}</span>
        <span className="vc-price tabular">{label.price(v.price)}</span>
      </span>
    </CurtainLink>
  )
}
