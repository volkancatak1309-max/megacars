import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { CurtainLink } from '@/components/proto/Curtain'
import { RossoHero } from '@/components/proto/RossoHero'
import { BlockReveal, ClipReveal, LinesUp } from '@/components/proto/Reveals'
import { ProtoFacts, ProtoFooter, ProtoServices } from '@/components/proto/Sections'
import { ShutterLink } from '@/components/proto/Shutter'
import { protoCars, protoStock } from '@/components/proto/data'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('proto')
  return { title: `${t('word')} A · ${t('aName')} – Mega Cars`, description: t('aDesc') }
}

export default async function RossoPage({ params }: PageProps<'/[locale]/prototyp/a'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('proto')
  const tt = await getTranslations('trust')
  const cars = await protoCars()
  const stock = await protoStock()

  return (
    <>
      <RossoHero
        cars={cars}
        labels={{
          kicker: t('aKicker'),
          cta: t('detailCta'),
          next: t('next'),
          prev: t('prev'),
          pause: t('pause'),
          play: t('play'),
          slideOf: cars.map((_, i) => t('slideOf', { index: i + 1, total: cars.length })),
        }}
      />

      <section className="ra-intro" aria-labelledby="ra-intro-title">
        <div className="pg">
          <BlockReveal as="h2" id="ra-intro-title" className="ra-intro-title" color="var(--ink)">
            {t.rich('aIntro', { min: stock.min, max: stock.max, r: (chunks) => <span className="ra-red">{chunks}</span> })}
          </BlockReveal>
          <p className="ra-intro-lead">{t('aIntroLead')}</p>
        </div>
      </section>

      <section className="ra-feat" aria-labelledby="ra-feat-title">
        <div className="pg">
          <LinesUp id="ra-feat-title" className="ra-h2">
            {t('aFeaturedTitle')}
          </LinesUp>
        </div>
        <ol className="ra-list">
          {cars.map((car) => (
            <li key={car.id}>
              <CurtainLink href={{ pathname: '/prototyp/a/[slug]', params: { slug: car.slug } }} className="ra-row pg" data-cursor>
                <span className="ra-row-panel" aria-hidden="true" />
                <span className="ra-row-text">
                  <span className="ra-row-make">{car.make}</span>
                  <span className="ra-row-model">{car.model}</span>
                  <span className="ra-row-chain tabular">{car.chain}</span>
                  <span className="ra-row-price tabular">{car.price}</span>
                </span>
                <ClipReveal className="ra-row-frame">
                  <CarImage photo={car.cover} alt={car.alt} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] h-full w-full" />
                </ClipReveal>
              </CurtainLink>
            </li>
          ))}
        </ol>
        <div className="pg ra-feat-more">
          <ShutterLink href="/fahrzeuge" kind="line">
            {t('allVehicles')}
            <Icon name="arrowRight" size={18} />
          </ShutterLink>
        </div>
      </section>

      <section className="ra-trust" aria-labelledby="ra-trust-title">
        <div className="pg">
          <blockquote className="ra-quote" id="ra-trust-title" lang="de">
            <span className="mline">
              <span>Gewissenhaft.</span>
            </span>
            <span className="mline">
              <span>Verlässlich.</span>
            </span>
            <span className="mline">
              <span>Professionell.</span>
            </span>
          </blockquote>
          <p className="ra-trust-lead">{t('aTrustLead')}</p>
          <p className="ra-trust-lead">{tt('lead')}</p>
          <ProtoFacts className="ra-facts" />
          <ProtoServices className="ra-services" kind="solid" />
        </div>
      </section>

      <ProtoFooter title={t('aFootTitle')} className="ra-foot" />
    </>
  )
}
