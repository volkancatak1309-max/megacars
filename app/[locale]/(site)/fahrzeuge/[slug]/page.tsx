import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { redirect } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { getCards, getVehicle, getVehicles, similarVehicles, toCard } from '@/lib/inventory'
import { formatDecimal, formatKm, formatNumber, formatPower, formatPrice, hpUnit, inSentence, vehicleFullName, vehicleName, versionLabel } from '@/lib/format'
import { colorName } from '@/lib/colors'
import { breadcrumbLd, carLd, localizedUrl, pageMeta } from '@/lib/seo'
import { PAGES } from '@/lib/launch'
import { SITE, whatsappHref } from '@/lib/site'
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

// Known vehicles are built ahead; a car added later renders on its first visit and is
// then cached until the next save in the admin panel.
export async function generateStaticParams() {
  const cards = await getCards()
  return routing.locales.flatMap((locale) => cards.map((v) => ({ locale, slug: v.slug })))
}
export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const v = await getVehicle(slug)
  if (!v) return {}
  const t = await getTranslations({ locale, namespace: 'meta' })
  const tv = await getTranslations({ locale, namespace: 'vehicle' })
  const name = vehicleFullName(v, locale)
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
  // share image: the car's own cover photo
  const cover = v.photos[v.cover]
  return pageMeta({ locale: locale as Locale, href, title, description, image: cover ? { url: cover.src, width: cover.width, height: cover.height } : undefined, imageAlt: name })
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
  const v = await getVehicle(slug)
  // hidden, archived or unknown: the visitor lands on the list, no broken link (Volkan, 23.10.2026)
  if (!v || !v.photos.length) {
    redirect({ href: '/fahrzeuge', locale })
    return null
  }

  const t = await getTranslations('detail')
  const tv = await getTranslations('vehicle')
  const tn = await getTranslations('nav')
  const tc = await getTranslations('common')

  const name = vehicleName(v)
  const fullName = vehicleFullName(v, locale)
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
      ? tv('photoAlt', { name: fullName, color: inSentence(color, locale), index: i + 1, total: v.photos.length })
      : tv('photoAltNoColor', { name: fullName, index: i + 1, total: v.photos.length }),
  )
  const yesNo = (b: boolean | null) => (b === null ? null : b ? tc('yes') : tc('no'))
  const flag = (b: boolean) => (b ? tc('yes') : null)
  const n = (x: number | null, unit = '') => (x === null ? null : `${formatNumber(x, locale)}${unit}`)
  // sold or reserved cars stay visible with their label until the dealer hides them
  const statusLabel = v.status === 'for_sale' ? null : tv(`statusValues.${v.status}`)
  const priceNote = v.vatNote === 'unknown' ? t('priceNote') : tv(`vatValues.${v.vatNote}`)

  const tech: TechFact[] = [
    { label: tv('registration'), value: v.firstRegistration },
    { label: tv('mileage'), value: formatNumber(v.mileage, locale), unit: 'km' },
    v.powerPs
      ? { label: tv('power'), value: formatNumber(v.powerPs, locale), unit: hpUnit(locale), note: v.powerKw ? `${formatNumber(v.powerKw, locale)} kW` : undefined }
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
    { label: tv('colorManufacturer'), value: colorName(v.colorManufacturer, locale) },
    { label: tv('interiorMaterial'), value: material },
    { label: tv('interiorColor'), value: interiorColor },
    { label: tv('previousOwners'), value: n(v.previousOwners) },
    { label: tv('firstOwner'), value: flag(v.firstOwner) },
    { label: tv('accidentFree'), value: flag(v.accidentFree) },
    { label: tv('serviceBook'), value: yesNo(v.serviceBook) },
    { label: tv('nonSmoker'), value: yesNo(v.nonSmoker) },
    { label: tv('warranty'), value: flag(v.warranty) },
    { label: tv('inspectionNew'), value: flag(v.inspectionNew) },
    { label: tv('lastService'), value: v.lastService },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  const similar = similarVehicles(v, await getVehicles()).map((s, i) => toCard(s, i))
  const waHref = whatsappHref(t('whatsappMessage', vehicleRef))
  const chain = [v.firstRegistration, formatKm(v.mileage, locale), formatPower(v.powerKw, v.powerPs, locale)].filter(Boolean).join(' · ')

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
        <p className="vd-make">
          {v.make}
          {statusLabel && (
            <span className="status-chip vd-status-inline" data-status={v.status}>
              {statusLabel}
            </span>
          )}
        </p>
        <h1 id="vd-title" className={`vd-model${v.model.length > 10 ? ' is-long' : ''}`}>
          <span className="sr-only">{v.make} </span>
          <span className="mline rise">
            <span>{v.model}</span>
          </span>
        </h1>
        {v.version && (
          <p className="vd-version fade-up" style={{ ['--i' as string]: 1 }}>
            {versionLabel(v.version, locale)}
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
            <span className="vd-price-note">{priceNote}</span>
          </p>
          {statusLabel && (
            <p className="vd-status-note" data-status={v.status}>
              <span className="status-chip" data-status={v.status}>
                {statusLabel}
              </span>
              <span>{v.status === 'sold' ? t('soldNote') : t('reservedNote')}</span>
            </p>
          )}
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
            {PAGES.financing && v.status === 'for_sale' && (
              <ShutterLink href={{ pathname: '/finanzierung', query: { fahrzeug: slug } }} kind="text" className="vd-fin">
                {t('financingLink')}
                <Icon name="arrowRight" size={16} />
              </ShutterLink>
            )}
          </div>
          <p className="vd-direct">{t('visitNote')}</p>
        </aside>
      </div>

      {v.equipment.length > 0 && (
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
