import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { getVehicle, similarVehicles, toCard, vehicles } from '@/lib/inventory'
import { formatDecimal, formatKm, formatNumber, formatPower, formatPrice, vehicleFullName, vehicleName } from '@/lib/format'
import { alternates, breadcrumbLd, carLd, localizedUrl } from '@/lib/seo'
import { SITE, siteOrigin, whatsappHref } from '@/lib/site'
import { JsonLd } from '@/components/ui/JsonLd'
import { Icon } from '@/components/ui/Icon'
import { Magnetic } from '@/components/ui/Magnetic'
import { CarImage } from '@/components/ui/CarImage'
import { DrawLine, RevealText, Stagger } from '@/components/motion/Reveal'
import { Gallery, PhotoGrid } from '@/components/vehicle/Gallery'
import { SpinViewer } from '@/components/vehicle/spin/SpinViewer'
import { Equipment } from '@/components/vehicle/Equipment'
import { TestDriveForm } from '@/components/vehicle/TestDriveForm'
import { VehicleCard } from '@/components/vehicle/VehicleCard'
import { MobileActionBar } from '@/components/layout/MobileActionBar'

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
  const tg = await getTranslations('gallery')

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

  const keyFacts = [
    { label: tv('registration'), value: v.firstRegistration },
    { label: tv('mileage'), value: formatKm(v.mileage, locale) },
    { label: tv('power'), value: formatPower(v.powerKw, v.powerPs, locale) },
    { label: tv('fuel'), value: fuel },
    { label: tv('gearbox'), value: gearbox },
    { label: tv('body'), value: body },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

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
  const vtName = `car-${v.id}`

  return (
    <div className="pt-[var(--header-h)]">
      <JsonLd data={carLd(v, locale, { fuel, gearbox, body })} />
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('vehicles'), url: localizedUrl('/fahrzeuge', locale) },
          { name: fullName, url },
        ])}
      />

      <div className="container-max page-x">
        <nav aria-label={t('breadcrumb')} className="py-5 text-[0.875rem] text-ink-3">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition-colors duration-300 hover:text-ink">
                {tn('home')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/fahrzeuge" className="transition-colors duration-300 hover:text-ink">
                {tn('vehicles')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink-2">
              {name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            {v.spin ? (
              <SpinViewer id={v.id} spin={v.spin} name={fullName} viewTransitionName={vtName} />
            ) : (
              <Gallery photos={v.photos} alts={alts} name={fullName} viewTransitionName={vtName} whatsapp={waHref} />
            )}
          </div>

          <aside className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-5 lg:self-start xl:col-span-4">
            <h1 className="t-h1">{name}</h1>
            {v.version && <p className="t-lead mt-2">{v.version}</p>}
            <p className="mt-6">
              <span className="t-label block">{tc('price')}</span>
              <span className="t-price">{price}</span>
            </p>

            <Stagger as="dl" className="mt-8 grid grid-cols-2 border-t border-line" start="top 100%">
              {keyFacts.map((f) => (
                <div key={f.label} data-stagger className="border-b border-line py-4 pr-4">
                  <dt className="t-label">{f.label}</dt>
                  <dd className="tabular mt-1 text-ink">{f.value}</dd>
                </div>
              ))}
            </Stagger>

            <div className="mt-8 grid gap-3">
              <Magnetic>
                <a href="#probefahrt" className="btn btn-primary">
                  <Icon name="calendar" size={18} />
                  {t('testDrive')}
                </a>
              </Magnetic>
              <div className="grid grid-cols-2 gap-3">
                <Magnetic>
                  <a href={waHref} target="_blank" rel="noopener" className="btn btn-secondary">
                    <Icon name="whatsapp" size={18} />
                    {tc('whatsapp')}
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href={SITE.phoneHref} className="btn btn-secondary">
                    <Icon name="phone" size={18} />
                    {tc('call')}
                  </a>
                </Magnetic>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <section aria-labelledby="photos-title" className="container-max page-x pt-[var(--section-y)]">
        <RevealText id="photos-title" className="t-h2 max-w-[30ch]">
          {t('photosTitle', { count: v.photos.length })}
        </RevealText>
        <div className="mt-8">
          <PhotoGrid photos={v.photos} alts={alts} labels={v.photos.map((_, i) => tg('open', { index: i + 1 }))} />
        </div>
      </section>

      {Object.values(v.equipment).some((g) => g.length) && (
        <section aria-labelledby="equipment-title" className="container-max page-x pt-[var(--section-y)]">
          <RevealText id="equipment-title" className="t-h2 mb-8 max-w-[30ch]">
            {t('equipmentTitle')}
          </RevealText>
          <Equipment equipment={v.equipment} />
        </section>
      )}

      <section aria-labelledby="data-title" className="container-max page-x pt-[var(--section-y)]">
        <RevealText id="data-title" className="t-h2 mb-8 max-w-[30ch]">
          {t('dataTitle')}
        </RevealText>
        <dl className="grid gap-x-12 md:grid-cols-2">
          {data.map((row) => (
            <div key={row.label}>
              <DrawLine />
              <div className="grid grid-cols-[1fr_auto] gap-6 py-4">
                <dt className="text-ink-2">{row.label}</dt>
                <dd className="tabular text-right text-ink">{row.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <section id="probefahrt" aria-label={t('testDrive')} className="scroll-mt-[var(--header-h)] pt-[var(--section-y)]">
        <div className="container-max page-x">
          <div className="grid gap-10 border-y border-line py-12 lg:grid-cols-12 lg:gap-8 lg:py-16">
            <div className="lg:col-span-7">
              <TestDriveForm vehicle={vehicleRef} />
            </div>
            <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
              <CarImage photo={v.photos[v.cover]} alt={alts[v.cover]} sizes="30vw" className="aspect-[4/3] rounded-[4px]" />
              <p className="t-h3 mt-4">{fullName}</p>
              <p className="t-price-s mt-1">{price}</p>
            </div>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section aria-labelledby="similar-title" className="py-[var(--section-y)]">
          <div className="container-max page-x flex flex-wrap items-end justify-between gap-4">
            <RevealText id="similar-title" className="t-h2 max-w-[26ch]">
              {t('similarTitle')}
            </RevealText>
            <Link href="/fahrzeuge" className="link-arrow">
              {t('allVehicles')}
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
          <ul className="snap-strip container-max mt-10 gap-6">
            {similar.map((s) => (
              <li key={s.id} className="w-[82vw] sm:w-[45vw] lg:w-[calc((min(100vw,1440px)-2*var(--page-x)-48px)/3)]">
                <VehicleCard v={s} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 45vw, 82vw" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <MobileActionBar vehicle={vehicleRef} />
    </div>
  )
}
