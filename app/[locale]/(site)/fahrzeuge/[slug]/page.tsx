import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getVehicle, similarVehicles, toCard, vehicles } from '@/lib/inventory'
import { formatDecimal, formatKm, formatNumber, formatPower, formatPrice, vehicleFullName, vehicleName } from '@/lib/format'
import { alternates, breadcrumbLd, carLd, localizedUrl } from '@/lib/seo'
import { SITE, siteOrigin, whatsappHref } from '@/lib/site'
import { JsonLd } from '@/components/ui/JsonLd'
import { Icon } from '@/components/ui/Icon'
import { CarImage } from '@/components/ui/CarImage'
import { DrawGroup } from '@/components/motion/Reveal'
import { CurtainLink } from '@/components/site/Curtain'
import { Odometer } from '@/components/site/Loader'
import { LinesUp } from '@/components/site/Reveals'
import { ShutterA, ShutterLink } from '@/components/site/Shutter'
import { ActionBar, TestDriveButton } from '@/components/site/ActionBar'
import { Stage } from '@/components/vehicle/Stage'
import { TechCard, RevealFrames, type TechFact } from '@/components/vehicle/TechCard'
import { SpinViewer } from '@/components/vehicle/spin/SpinViewer'
import { Equipment } from '@/components/vehicle/Equipment'
import { TestDriveForm } from '@/components/vehicle/TestDriveForm'
import { VehicleCard } from '@/components/vehicle/VehicleCard'

type Props = PageProps<'/[locale]/fahrzeuge/[slug]'>

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => vehicles.map((v) => ({ locale, slug: v.slug })))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const v = getVehicle(slug)
  if (!v) return {}
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tv = await getTranslations({ locale, namespace: 'vehicle' })
  const name = vehicleFullName(v)
  const price = formatPrice(v.price, locale)
  const href = { pathname: '/fahrzeuge/[slug]', params: { slug } } as const
  const title = t('detailTitle', { name: vehicleName(v), price })
  const description = t('detailDescription', {
    name,
    registration: v.firstRegistration,
    mileage: formatKm(v.mileage, locale),
    power: formatPower(v.powerKw, v.powerPs, locale) ?? '',
    fuel: v.fuel ? tv(`fuelValues.${v.fuel}`) : '',
    gearbox: v.transmission ? tv(`gearboxValues.${v.transmission}`) : '',
  })
  return {
    title,
    description,
    alternates: alternates(href, locale as Locale),
    openGraph: { title, description, type: 'website', url: localizedUrl(href, locale as Locale), images: [{ url: `${siteOrigin()}${v.og}`, width: 1200, height: 630, alt: name }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${siteOrigin()}${v.og}`] },
  }
}

/** "Hybrid (Benzin/Elektro)" → big "Hybrid" + small "Benzin/Elektro"; "SUV / Geländewagen" likewise. */
const split = (label: string): { value: string; note?: string } => {
  const paren = label.match(/^(.*?) \((.*)\)$/)
  if (paren) return { value: paren[1], note: paren[2] }
  const slash = label.split(' / ')
  return slash.length === 2 ? { value: slash[0], note: slash[1] } : { value: label }
}

export default async function VehiclePage({ params }: Props) {
  const { locale: raw, slug } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const v = getVehicle(slug)
  if (!v) notFound()

  const t = await getTranslations('detail')
  const tv = await getTranslations('vehicle')
  const tn = await getTranslations('nav')
  const tc = await getTranslations('common')

  const name = vehicleName(v)
  const fullName = vehicleFullName(v)
  const price = formatPrice(v.price, locale)
  const url = localizedUrl({ pathname: '/fahrzeuge/[slug]', params: { slug } }, locale)
  const vehicleRef = { name: fullName, price, url }
  const fuel = v.fuel ? tv(`fuelValues.${v.fuel}`) : null
  const gearbox = v.transmission ? tv(`gearboxValues.${v.transmission}`) : null
  const body = v.body ? tv(`bodyValues.${v.body}`) : null
  const color = v.colorBase && tv.has(`colorValues.${v.colorBase}`) ? tv(`colorValues.${v.colorBase}`) : v.colorBase
  const material = v.interiorMaterial && tv.has(`materialValues.${v.interiorMaterial}`) ? tv(`materialValues.${v.interiorMaterial}`) : v.interiorMaterial
  const interiorColor = v.interiorColor && tv.has(`colorValues.${v.interiorColor}`) ? tv(`colorValues.${v.interiorColor}`) : v.interiorColor
  const alts = v.photos.map((_, i) =>
    color
      ? tv('photoAlt', { name: fullName, color: locale === 'tr' ? color.toLocaleLowerCase('tr') : color, index: i + 1, total: v.photos.length })
      : tv('photoAltNoColor', { name: fullName, index: i + 1, total: v.photos.length }),
  )
  const yesNo = (b: boolean | null) => (b === null ? null : b ? tc('yes') : tc('no'))
  const n = (x: number | null, unit = '') => (x === null ? null : `${formatNumber(x, locale)}${unit}`)

  const tech: TechFact[] = [
    { label: tv('registration'), value: v.firstRegistration },
    { label: tv('mileage'), value: formatNumber(v.mileage, locale), unit: 'km' },
    v.powerPs
      ? { label: tv('power'), value: formatNumber(v.powerPs, locale), unit: 'PS', note: v.powerKw ? `${formatNumber(v.powerKw, locale)} kW` : undefined }
      : v.powerKw
        ? { label: tv('power'), value: formatNumber(v.powerKw, locale), unit: 'kW' }
        : null,
    fuel ? { label: tv('fuel'), ...split(fuel) } : null,
    gearbox ? { label: tv('gearbox'), value: gearbox } : null,
    body ? { label: tv('body'), ...split(body) } : null,
  ].filter((f): f is TechFact => Boolean(f))

  const data = [
    { label: tv('drive'), value: v.drive ? tv(`driveValues.${v.drive}`) : null },
    { label: tv('seats'), value: n(v.seats) },
    { label: tv('doors'), value: n(v.doors) },
    { label: tv('gears'), value: n(v.gears) },
    { label: tv('cylinders'), value: n(v.cylinders) },
    { label: tv('displacement'), value: n(v.displacementCcm, ' cm³') },
    { label: tv('weight'), value: n(v.weightKg, ' kg') },
    { label: tv('emissionClass'), value: v.emissionClass },
    { label: tv('consumption'), value: v.consumptionL === null ? null : `${formatDecimal(v.consumptionL, locale)} l/100 km` },
    { label: tv('co2'), value: n(v.co2, ' g/km') },
    { label: tv('colorBase'), value: color },
    { label: tv('colorManufacturer'), value: v.colorManufacturer },
    { label: tv('interiorMaterial'), value: material },
    { label: tv('interiorColor'), value: interiorColor },
    { label: tv('previousOwners'), value: n(v.previousOwners) },
    { label: tv('serviceBook'), value: yesNo(v.serviceBook) },
    { label: tv('nonSmoker'), value: yesNo(v.nonSmoker) },
    { label: tv('lastService'), value: v.lastService },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  const similar = similarVehicles(v).map(toCard)
  const waHref = whatsappHref(t('whatsappMessage', vehicleRef))
  const chain = [v.firstRegistration, formatKm(v.mileage, locale), formatPower(v.powerKw, v.powerPs, locale)].filter(Boolean).join(' · ')
  const hasEquipment = Object.values(v.equipment).some((g) => g.length)

  return (
    <article aria-labelledby="vd-title">
      <JsonLd data={carLd(v, locale, { fuel, gearbox, body })} />
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('vehicles'), url: localizedUrl('/fahrzeuge', locale) },
          { name: fullName, url },
        ])}
      />

      <header className="vd-head s-night pg wide">
        <nav aria-label={t('breadcrumb')} className="vd-crumbs">
          <ol>
            <li>
              <CurtainLink href="/">{tn('home')}</CurtainLink>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <CurtainLink href="/fahrzeuge">{tn('vehicles')}</CurtainLink>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>
        <p className="vd-make">{v.make}</p>
        <h1 id="vd-title" className={`vd-model${v.model.length > 10 ? ' is-long' : ''}`}>
          <span className="sr-only">{v.make} </span>
          <span className="mline rise">
            <span>{v.model}</span>
          </span>
        </h1>
        {v.version && (
          <p className="vd-version fade-up" style={{ ['--i' as string]: 1 }}>
            {v.version}
          </p>
        )}
      </header>

      <div className="vd-main s-night pg wide">
        <div className="vd-stage">
          {v.spin && <SpinViewer id={v.id} spin={v.spin} name={fullName} />}
          <Stage photos={v.photos} alts={alts} name={fullName} whatsapp={waHref} />
        </div>
        <section className="vd-tech" aria-labelledby="tc-title">
          <div className="tc-head">
            <LinesUp id="tc-title" className="d-s">
              {t('techTitle')}
            </LinesUp>
          </div>
          <TechCard facts={tech} label={t('keyFacts')} />
        </section>

        <aside className="vd-side" aria-label={t('actionsLabel')}>
          <p className="vd-price">
            <span className="label">{tc('price')}</span>
            <Odometer text={price} className="vd-price-value tabular" />
            <span className="vd-price-note">{t('priceNote')}</span>
          </p>
          <p className="vd-chain tabular">{chain}</p>
          <div className="vd-ctas">
            <TestDriveButton label={t('testDrive')} />
            <div className="vd-ctas-row">
              <ShutterA href={waHref} target="_blank" rel="noopener" kind="line">
                <Icon name="whatsapp" size={17} />
                {tc('whatsapp')}
              </ShutterA>
              <ShutterA href={SITE.phoneHref} kind="line">
                <Icon name="phone" size={17} />
                {tc('call')}
              </ShutterA>
            </div>
          </div>
          <p className="vd-direct">{t('visitNote')}</p>
        </aside>
      </div>

      {hasEquipment && (
        <section className="eq s-bone" aria-labelledby="eq-title">
          <div className="pg wide">
            <LinesUp id="eq-title" className="eq-title d-l">
              {t('equipmentTitle')}
            </LinesUp>
            <Equipment equipment={v.equipment} />
          </div>
        </section>
      )}

      <section className="dd s-night" aria-labelledby="dd-title">
        <div className="pg wide">
          <LinesUp id="dd-title" className="dd-title d-m">
            {t('dataTitle')}
          </LinesUp>
          <dl className="dd-list">
            {data.map((row) => (
              <DrawGroup key={row.label}>
                <dt>{row.label}</dt>
                <dd className="tabular">{row.value}</dd>
              </DrawGroup>
            ))}
          </dl>
        </div>
      </section>

      <section id="probefahrt" className="td s-red" aria-label={t('testDrive')}>
        <div className="td-grid pg wide">
          <TestDriveForm vehicle={vehicleRef} />
          <div className="td-car">
            <CarImage photo={v.photos[v.cover]} alt={alts[v.cover]} sizes="(min-width: 1024px) 30vw, 100vw" className="aspect-[4/3]" />
            <p className="d-s">{fullName}</p>
            <p className="tabular" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
              {price}
            </p>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="sim s-night" aria-labelledby="sim-title">
          <div className="pg wide">
            <div className="sim-head">
              <LinesUp id="sim-title" className="sim-title d-l">
                {t('similarTitle')}
              </LinesUp>
              <ShutterLink href="/fahrzeuge" kind="line">
                {t('allVehicles')}
                <Icon name="arrowRight" size={18} />
              </ShutterLink>
            </div>
            <RevealFrames>
              <ul className="vl-grid">
                {similar.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <VehicleCard v={s} />
                  </li>
                ))}
              </ul>
            </RevealFrames>
          </div>
        </section>
      )}

      <ActionBar vehicle={vehicleRef} />
    </article>
  )
}
