import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import type { CardVehicle } from '@/lib/filter'
import { Icon } from '@/components/ui/Icon'
import { RevealText } from '@/components/motion/Reveal'
import { VehicleCard } from '@/components/vehicle/VehicleCard'

/**
 * Featured vehicles as a plain vertical grid. The pinned horizontal strip was removed
 * (Volkan, 22.10.2026: scrolling down must never move the page sideways).
 */
export async function FeaturedGrid({ cards }: { cards: CardVehicle[] }) {
  const t = await getTranslations('featured')
  return (
    <section aria-labelledby="featured-title" className="section-y bg-night">
      <div className="container-max page-x">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-[56ch]">
            <RevealText id="featured-title" className="t-h2">
              {t('title')}
            </RevealText>
            <p className="t-lead mt-4">{t('lead')}</p>
          </div>
          <Link href="/fahrzeuge" className="link-arrow">
            {t('viewAll')}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
        <ul aria-label={t('listLabel')} className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {cards.map((v) => (
            <li key={v.id}>
              <VehicleCard v={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
