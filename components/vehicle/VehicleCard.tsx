import { useTranslations } from 'next-intl'
import type { CardVehicle } from '@/lib/filter'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { CurtainLink } from '@/components/site/Curtain'
import { useVehicleLabels } from './labels'

export const CARD_SIZES = '(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 100vw'

/**
 * Vehicle card: the original cover photo in its own frame (on hover the frame narrows to
 * a widescreen cut while the photo grows 1.04 inside it — no layer on the photo), a
 * running number like a film slate, make and year, model in display type, a red rule
 * drawn across, one spec line, the price and "Ansehen". The whole card is one link
 * behind the red curtain; the cursor says "Ansehen" (no image preview).
 */
export function VehicleCard({
  v,
  sizes = CARD_SIZES,
  priority = false,
  headingLevel = 'h3',
  index,
}: {
  v: CardVehicle
  sizes?: string
  priority?: boolean
  headingLevel?: 'h2' | 'h3'
  /** running number in the current list (1-based) */
  index?: number
}) {
  const tc = useTranslations('common')
  const label = useVehicleLabels()
  const Heading = headingLevel
  const year = v.firstRegistration.split('/')[1]
  return (
    <CurtainLink href={{ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } }} className="vc" data-cursor>
      <span className="vc-frame clip-reveal" data-reveal>
        <CarImage photo={v.cover} alt={label.photoAlt(v, 1, v.photoCount)} sizes={sizes} priority={priority} className="aspect-[4/3] h-full w-full" />
        <span className="vc-photos tabular">{tc('photos', { count: v.photoCount })}</span>
      </span>
      <span className="vc-body">
        <span className="vc-top">
          {index !== undefined && (
            <span className="vc-index tabular" aria-hidden="true">
              {String(index).padStart(2, '0')}
            </span>
          )}
          <span className="vc-make">{v.make}</span>
          {year && <span className="vc-year tabular">{year}</span>}
        </span>
        <Heading className="vc-model">{v.model}</Heading>
        {v.version && <span className="vc-version">{v.version}</span>}
        <span className="vc-rule" aria-hidden="true" />
        <span className="vc-chain tabular">{label.chain(v)}</span>
        <span className="vc-foot">
          <span className="vc-price tabular">{label.price(v.price)}</span>
          <span className="vc-go" aria-hidden="true">
            {tc('view')}
            <Icon name="arrowRight" size={16} />
          </span>
        </span>
      </span>
    </CurtainLink>
  )
}
