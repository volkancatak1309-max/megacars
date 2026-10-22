import { getLocale, getTranslations } from 'next-intl/server'
import type { Photo } from '@/lib/types'
import { SITE } from '@/lib/site'
import { formatPrice } from '@/lib/format'
import { CarImage } from '@/components/ui/CarImage'
import { DrawGroup, RevealText, Ticker, WindowReveal } from '@/components/motion/Reveal'

/**
 * "This dealer is real": only facts with a source (KARAR-DEFTERI, FAZ 4A) — Firmenbuch
 * entry, address, opening hours, the stock count from data — and the dealer's own
 * showroom photo. No reviews, no founding year, no guarantees.
 */
export async function Trust({ photo, stock }: { photo: Photo; stock: { count: number; min: number; max: number } }) {
  const t = await getTranslations('trust')
  const tl = await getTranslations('location')
  const locale = await getLocale()

  const facts = [
    {
      label: t('registerLabel'),
      value: (
        <>
          {SITE.legalName}
          <span className="block text-ink-3">
            {SITE.register} · {SITE.court}
          </span>
        </>
      ),
    },
    { label: t('showroomLabel'), value: `${SITE.street}, ${SITE.zip} ${SITE.city}` },
    {
      label: t('hoursLabel'),
      value: (
        <span className="tabular">
          {tl('weekdays')} 08:00–18:00
          <span className="block">{tl('saturday')} 09:00–15:00</span>
        </span>
      ),
    },
  ]

  return (
    <section aria-labelledby="trust-title" className="section-y">
      <div className="container-max page-x grid gap-12 lg:grid-cols-12 lg:gap-6">
        <WindowReveal className="lg:col-span-7">
          <CarImage photo={photo} alt={t('photoAlt')} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] rounded-[4px]" />
        </WindowReveal>

        <div className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <RevealText id="trust-title" className="t-h2">
            {t('title')}
          </RevealText>
          <p className="t-lead mt-6 measure">{t('lead')}</p>

          <dl className="mt-10 border-b border-line">
            {facts.map((f) => (
              <DrawGroup key={f.label} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="t-label pt-0.5">{f.label}</dt>
                <dd className="text-ink">{f.value}</dd>
              </DrawGroup>
            ))}
            <DrawGroup className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="t-label pt-3">{t('stockLabel')}</dt>
              <dd>
                <Ticker value={stock.count} locale={locale} className="t-price block" />
                <span className="tabular text-ink-2">
                  {t('stockRange', { min: formatPrice(stock.min, locale), max: formatPrice(stock.max, locale) })}
                </span>
              </dd>
            </DrawGroup>
          </dl>
        </div>
      </div>
    </section>
  )
}
