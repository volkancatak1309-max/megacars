import { getLocale, getTranslations } from 'next-intl/server'
import type { Photo, Vehicle } from '@/lib/types'
import { SITE, mailHref, routeHref, whatsappHref } from '@/lib/site'
import { formatNumber, formatPrice, inSentence, vehicleFullName } from '@/lib/format'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { DrawGroup, Stagger, Ticker } from '@/components/motion/Reveal'
import { CurtainLink } from '@/components/site/Curtain'
import { BlockReveal, ClipReveal, LinesUp } from '@/components/site/Reveals'
import { ShutterA, ShutterLink } from '@/components/site/Shutter'
import { MapPreview, type MapData } from './MapPreview'

/** Six cars across the whole price range: alternating frames revealed by clip-path. */
export async function FeaturedCars({ cars }: { cars: Vehicle[] }) {
  const t = await getTranslations('featured')
  const tv = await getTranslations('vehicle')
  const locale = await getLocale()

  return (
    <section className="fc s-night" aria-labelledby="fc-title">
      <div className="pg wide">
        <div className="fc-head">
          <LinesUp id="fc-title" className="fc-title d-l">
            {t('title')}
          </LinesUp>
          <p className="lead">{t('lead')}</p>
        </div>
        <ol className="fc-list">
          {cars.map((v, k) => {
            const color = v.colorBase && tv.has(`colorValues.${v.colorBase}`) ? tv(`colorValues.${v.colorBase}`) : v.colorBase
            const name = vehicleFullName(v, locale)
            const alt = color
              ? tv('photoAlt', { name, color: inSentence(color, locale), index: 1, total: v.photos.length })
              : tv('photoAltNoColor', { name, index: 1, total: v.photos.length })
            const chain = [v.firstRegistration, `${formatNumber(v.mileage, locale)} km`, v.powerPs ? `${formatNumber(v.powerPs, locale)} PS` : null].filter(Boolean).join(' · ')
            return (
              <li key={v.id}>
                <CurtainLink href={{ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } }} className="fc-card">
                  <ClipReveal className="fc-frame" from={k % 2 ? 'left' : 'bottom'}>
                    <CarImage photo={v.photos[v.cover]} alt={alt} sizes="(min-width: 1024px) 58vw, 100vw" className="aspect-[4/3] h-full w-full" />
                  </ClipReveal>
                  <span className="fc-text">
                    <span className="fc-make">{v.make}</span>
                    <span className="fc-model">{v.model}</span>
                    <span className="fc-rule" aria-hidden="true" />
                    <span className="fc-chain tabular">{chain}</span>
                    <span className="fc-price tabular">{formatPrice(v.price, locale)}</span>
                  </span>
                </CurtainLink>
              </li>
            )
          })}
        </ol>
        <div className="fc-more">
          <ShutterLink href="/fahrzeuge" kind="line">
            {t('viewAll')}
            <Icon name="arrowRight" size={18} />
          </ShutterLink>
        </div>
      </div>
    </section>
  )
}

/** A thin bone band with the makes that are actually in stock, each with its count. */
export async function BrandBand({ makes }: { makes: { slug: string; label: string; count: number }[] }) {
  const t = await getTranslations('brands')
  return (
    <section className="br s-bone" aria-labelledby="br-title">
      <div className="br-in pg wide">
        <h2 id="br-title" className="label">
          {t('title')}
        </h2>
        <Stagger as="ul" className="br-list" start="top 95%">
          {makes.map((m) => (
            <li key={m.slug} data-stagger>
              <ShutterLink href={{ pathname: '/fahrzeuge', query: { make: m.slug } }} kind="text" aria-label={t('linkLabel', { make: m.label, count: m.count })}>
                {m.label}
                <sup className="tabular">{m.count}</sup>
              </ShutterLink>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/**
 * "This dealer is real": only facts with a source (KARAR-DEFTERI, FAZ 4A records) and
 * the dealer's own showroom photo. The three words come from the dealer's own plate
 * holders. No reviews, no founding year, no guarantees.
 */
export async function TrustSection({ photo, stock }: { photo: Photo; stock: { count: number; min: number; max: number } }) {
  const t = await getTranslations('trust')
  const tl = await getTranslations('location')
  const tc = await getTranslations('common')
  const locale = await getLocale()
  return (
    <section className="tr s-bone" aria-labelledby="tr-title">
      <div className="pg wide">
        {/* the dealer's plate-holder slogan, in the page language (Volkan, 23.10.2026) */}
        <LinesUp as="h2" id="tr-title" className="tr-quote">
          {t('quote1')} <em>{t('quote2')}</em> {t('quote3')}
        </LinesUp>
      </div>
      <div className="tr-grid pg wide">
        <ClipReveal className="tr-photo">
          <CarImage photo={photo} alt={t('photoAlt')} sizes="(min-width: 1024px) 52vw, 100vw" className="aspect-[4/3] h-full w-full" />
        </ClipReveal>
        <div>
          <BlockReveal className="tr-lead lead" color="var(--red)">
            {t('lead')}
          </BlockReveal>
          <dl className="tr-facts">
            <DrawGroup>
              <dt>{t('registerLabel')}</dt>
              <dd>
                {SITE.legalName}
                <span>
                  {SITE.register} · {tc('court')}
                </span>
              </dd>
            </DrawGroup>
            <DrawGroup>
              <dt>{t('showroomLabel')}</dt>
              <dd>
                {SITE.street}
                <span>
                  {SITE.zip} {SITE.city}, {SITE.region}
                </span>
              </dd>
            </DrawGroup>
            <DrawGroup>
              <dt>{t('hoursLabel')}</dt>
              <dd className="tabular">
                {tl('weekdays')} 08:00–18:00
                <span>{tl('saturday')} 09:00–15:00</span>
              </dd>
            </DrawGroup>
            <DrawGroup>
              <dt>{t('stockLabel')}</dt>
              <dd>
                <Ticker value={stock.count} locale={locale} className="tr-count" />
                <span className="tabular">{t('stockRange', { min: formatPrice(stock.min, locale), max: formatPrice(stock.max, locale) })}</span>
              </dd>
            </DrawGroup>
          </dl>
        </div>
      </div>
    </section>
  )
}

/** The three services that are confirmed today (financing, trade-in … stay pending). */
export async function ServicesSection() {
  const t = await getTranslations('services')
  const tc = await getTranslations('common')
  const rows = [
    { title: t('visitTitle'), text: t('visitText'), link: t('visitLink'), href: routeHref, ext: true },
    { title: t('driveTitle'), text: t('driveText'), link: t('driveLink'), href: whatsappHref(tc('whatsappTestDriveGeneric')), ext: true },
    { title: t('adviceTitle'), text: t('adviceText'), link: t('adviceLink'), href: mailHref, ext: false },
  ]
  return (
    <section className="sv s-red" aria-labelledby="sv-title">
      <div className="pg wide">
        <LinesUp id="sv-title" className="sv-title d-l">
          {t('title')}
        </LinesUp>
        <Stagger as="ul" className="sv-list">
          {rows.map((r) => (
            <li key={r.title} data-stagger className="draw">
              <h3>{r.title}</h3>
              <p>{r.text}</p>
              <ShutterA href={r.href} kind="solid" {...(r.ext ? { target: '_blank', rel: 'noopener' } : {})}>
                {r.link}
                <Icon name="arrowRight" size={16} />
              </ShutterA>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/** Map (OSM only after a click), hours, contact and the building with its sign. */
export async function LocationSection({ map, building }: { map: MapData; building: Photo }) {
  const t = await getTranslations('location')
  const tc = await getTranslations('common')
  return (
    <section id="standort" className="lc s-night" aria-labelledby="lc-title">
      <div className="pg wide">
        <LinesUp id="lc-title" className="lc-title d-l">
          {t('title')}
        </LinesUp>
        <div className="lc-grid">
          <div>
            <MapPreview map={map} />
          </div>
          <div className="lc-info">
            <div>
              <p className="label">{t('addressLabel')}</p>
              <p>
                {SITE.street}
                <br />
                {SITE.zip} {SITE.city}, {SITE.region}
              </p>
              <p style={{ marginTop: 12 }}>
                <ShutterA href={routeHref} target="_blank" rel="noopener" kind="text">
                  {t('route')}
                  <Icon name="arrowRight" size={16} />
                </ShutterA>
              </p>
            </div>
            <div>
              <p className="label">{t('hoursLabel')}</p>
              <dl className="lc-hours tabular">
                <dt>{t('weekdays')}</dt>
                <dd>08:00–18:00</dd>
                <dt>{t('saturday')}</dt>
                <dd>09:00–15:00</dd>
                <dt>{t('sunday')}</dt>
                <dd>{t('closed')}</dd>
              </dl>
            </div>
            <div>
              <p className="label">{t('contactLabel')}</p>
              <a href={SITE.phoneHref} className="lc-phone tabular">
                {SITE.phone}
              </a>
              <p style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <ShutterA href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" kind="line" className="sh--sm">
                  <Icon name="whatsapp" size={16} />
                  {tc('whatsappWrite')}
                </ShutterA>
                <ShutterA href={mailHref} kind="line" className="sh--sm">
                  <Icon name="mail" size={16} />
                  {tc('email')}
                </ShutterA>
              </p>
            </div>
            <ClipReveal className="lc-building" from="left">
              <CarImage photo={building} alt={t('buildingAlt')} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3] h-full w-full" />
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
