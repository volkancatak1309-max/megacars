import { getTranslations } from 'next-intl/server'
import type { Photo } from '@/lib/types'
import { SITE, mailHref, routeHref, whatsappHref } from '@/lib/site'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { DrawLine, RevealText, WindowReveal } from '@/components/motion/Reveal'
import { MapPreview, type MapData } from './MapPreview'

export async function Location({ map, building }: { map: MapData; building: Photo }) {
  const t = await getTranslations('location')
  const tc = await getTranslations('common')

  return (
    <section id="standort" aria-labelledby="location-title" className="section-y scroll-mt-[var(--header-h)]">
      <div className="container-max page-x">
        <RevealText id="location-title" className="t-h2 max-w-[30ch]">
          {t('title')}
        </RevealText>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <MapPreview map={map} />
          </div>

          <div className="grid content-start gap-10 lg:col-span-4 lg:col-start-9">
            <div>
              <h3 className="t-label mb-3">{t('addressLabel')}</h3>
              <p className="text-ink">
                {SITE.street}
                <br />
                {SITE.zip} {SITE.city}, {SITE.region}
              </p>
              <a href={routeHref} target="_blank" rel="noopener" className="link-arrow mt-3">
                {t('route')}
                <Icon name="arrowRight" size={18} />
              </a>
            </div>

            <div>
              <h3 className="t-label mb-3">{t('hoursLabel')}</h3>
              <dl className="tabular grid grid-cols-[1fr_auto] gap-y-2 text-ink-2">
                <dt>{t('weekdays')}</dt>
                <dd className="text-ink">08:00–18:00</dd>
                <dt>{t('saturday')}</dt>
                <dd className="text-ink">09:00–15:00</dd>
                <dt>{t('sunday')}</dt>
                <dd>{t('closed')}</dd>
              </dl>
            </div>

            <div>
              <h3 className="t-label mb-3">{t('contactLabel')}</h3>
              <a href={SITE.phoneHref} className="t-h2 tabular block text-ink transition-colors duration-300 hover:text-ink-2">
                <RevealText as="div">{SITE.phone}</RevealText>
              </a>
              <DrawLine className="mt-4" />
              <ul className="mt-2 grid text-ink-2">
                <li>
                  <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-ink">
                    <Icon name="whatsapp" size={18} />
                    {tc('whatsappWrite')}
                  </a>
                </li>
                <li>
                  <a href={mailHref} className="inline-flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-ink">
                    <Icon name="mail" size={18} />
                    {SITE.email}
                  </a>
                </li>
              </ul>
            </div>

            <WindowReveal>
              <CarImage photo={building} alt={t('buildingAlt')} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3] rounded-[4px]" />
            </WindowReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
