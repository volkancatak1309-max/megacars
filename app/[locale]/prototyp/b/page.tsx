import type { Metadata } from 'next'
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { stockStats } from '@/lib/inventory'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { Ticker } from '@/components/motion/Reveal'
import { CurtainLink } from '@/components/proto/Curtain'
import { Chars } from '@/components/proto/Loader'
import { ClipReveal, LinesUp } from '@/components/proto/Reveals'
import { ProtoFacts, ProtoFooter, ProtoServices } from '@/components/proto/Sections'
import { ShutterLink } from '@/components/proto/Shutter'
import { protoCars } from '@/components/proto/data'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('proto')
  return { title: `${t('word')} B · ${t('bName')} – Mega Cars`, description: t('bDesc') }
}

const page = (n: number) => String(n).padStart(2, '0')

export default async function AtelierPage({ params }: PageProps<'/[locale]/prototyp/b'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('proto')
  const tt = await getTranslations('trust')
  const lang = await getLocale()
  const cars = await protoCars()
  const cover = cars[0]

  return (
    <>
      <section className="rb-cover" aria-labelledby="rb-title">
        <div className="pg rb-cover-in">
          <p className="rb-issue">
            <span>{t('bIssue')}</span>
            <span className="tabular">{t('stock', { count: stockStats.count })}</span>
          </p>
          <h1 id="rb-title" className="rb-title">
            <Chars text={t('bHeroTitle')} />
          </h1>
          <div className="rb-cover-grid">
            <figure className="rb-cover-figure">
              <CurtainLink href={{ pathname: '/prototyp/b/[slug]', params: { slug: cover.slug } }} className="rb-cover-frame pd-slide" data-cursor>
                <span className="pd-slide-in block h-full">
                  <CarImage photo={cover.cover} alt={cover.alt} sizes="(min-width: 1024px) 46vw, 100vw" priority className="aspect-[4/3] h-full w-full" />
                </span>
              </CurtainLink>
              <figcaption>
                <span>{cover.name}</span>
                <span className="tabular">
                  {cover.price} · {t('bPage', { n: page(1) })}
                </span>
              </figcaption>
            </figure>
            <div className="rb-cover-side">
              <p className="rb-lead">{t('bHeroLead', { count: stockStats.count })}</p>
              <div className="rb-stamp" aria-label={t('stock', { count: stockStats.count })}>
                <Ticker value={stockStats.count} locale={lang} className="rb-stamp-n" />
                <span>{tt('stockLabel')}</span>
              </div>
              <ShutterLink href="/fahrzeuge" kind="solid">
                {t('allVehicles')}
                <Icon name="arrowRight" size={18} />
              </ShutterLink>
            </div>
          </div>
        </div>
      </section>

      <section className="rb-toc" aria-labelledby="rb-toc-title">
        <div className="pg">
          <LinesUp id="rb-toc-title" className="rb-h2">
            {t('bTocTitle')}
          </LinesUp>
          <ol className="rb-toc-list">
            {cars.map((car, k) => (
              <li key={car.id}>
                <CurtainLink href={{ pathname: '/prototyp/b/[slug]', params: { slug: car.slug } }} className="rb-toc-row" data-cursor>
                  <span className="rb-toc-panel" aria-hidden="true" />
                  <span className="rb-toc-page tabular">{t('bPage', { n: page(k + 2) })}</span>
                  <span className="rb-toc-name">
                    {car.make} <em>{car.model}</em>
                  </span>
                  <span className="rb-toc-lead" aria-hidden="true" />
                  <span className="rb-toc-price tabular">{car.price}</span>
                </CurtainLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rb-spreads" aria-label={t('bTocTitle')}>
        {cars.map((car, k) => (
          <article key={car.id} className={`rb-spread pg${k % 2 ? ' is-flip' : ''}`}>
            <CurtainLink href={{ pathname: '/prototyp/b/[slug]', params: { slug: car.slug } }} className="rb-spread-photo" data-cursor tabIndex={-1} aria-hidden="true">
              <ClipReveal>
                <CarImage photo={car.cover} alt="" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] h-full w-full" />
              </ClipReveal>
            </CurtainLink>
            <div className="rb-spread-text">
              <p className="rb-spread-page tabular">{t('bPage', { n: page(k + 2) })}</p>
              <p className="rb-spread-make">{car.make}</p>
              <h2 className="rb-spread-model">{car.model}</h2>
              {car.version && <p className="rb-spread-version">{car.version}</p>}
              <dl className="rb-spread-facts">
                {car.facts.slice(0, 4).map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd className="tabular">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="rb-spread-price tabular">{car.price}</p>
              <ShutterLink href={{ pathname: '/prototyp/b/[slug]', params: { slug: car.slug } }} kind="line">
                {t('bOpen')}
                <Icon name="arrowRight" size={18} />
              </ShutterLink>
            </div>
          </article>
        ))}
      </section>

      <section className="rb-trust" aria-labelledby="rb-trust-title">
        <div className="pg">
          <LinesUp id="rb-trust-title" className="rb-h2">
            {t('bTrustTitle')}
          </LinesUp>
          <p className="rb-trust-lead">{t('bTrustLead')}</p>
          <ProtoFacts className="rb-facts" />
          <ProtoServices className="rb-services" kind="solid" />
        </div>
      </section>

      <ProtoFooter title={t('bFootTitle')} className="rb-foot" />
    </>
  )
}
