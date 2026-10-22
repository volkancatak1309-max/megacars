import { getPathname } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { SITE, siteOrigin } from './site'
import type { Vehicle } from './types'
import { vehicleFullName } from './format'

type Href = Parameters<typeof getPathname>[0]['href']

export const localizedPath = (href: Href, locale: Locale) => getPathname({ href, locale })
export const localizedUrl = (href: Href, locale: Locale) => siteOrigin() + localizedPath(href, locale)

const hreflang = (l: Locale) => (l === 'de' ? 'de-AT' : l)

export function alternates(href: Href, locale: Locale) {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) languages[hreflang(l)] = localizedUrl(href, l)
  languages['x-default'] = localizedUrl(href, routing.defaultLocale)
  return { canonical: localizedUrl(href, locale), languages }
}

/** Demo stays out of search engines until it goes live (KARAR-DEFTERI 22.10.2026). */
export const NOINDEX = { index: false, follow: false, googleBot: { index: false, follow: false } } as const

const DAY: Record<string, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
}

const dealerId = () => `${siteOrigin()}/#dealer`

export function autoDealerLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': dealerId(),
    name: SITE.name,
    legalName: SITE.legalName,
    url: localizedUrl('/', locale),
    telephone: SITE.phone,
    email: SITE.email,
    image: `${siteOrigin()}/cars/mercedes-s-560-4matic/1.webp`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      postalCode: SITE.zip,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    openingHoursSpecification: SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${DAY[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [SITE.facebook],
  }
}

export function carLd(
  v: Vehicle,
  locale: Locale,
  labels: { fuel: string | null; gearbox: string | null; body: string | null },
) {
  const url = localizedUrl({ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } }, locale)
  const [mm, yyyy] = v.firstRegistration.split('/')
  return {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: vehicleFullName(v),
    url,
    image: v.photos.map((p) => siteOrigin() + p.src),
    brand: { '@type': 'Brand', name: v.make },
    model: v.model,
    ...(v.version && { vehicleConfiguration: v.version }),
    dateVehicleFirstRegistered: `${yyyy}-${mm}`,
    mileageFromOdometer: { '@type': 'QuantitativeValue', value: v.mileage, unitCode: 'KMT' },
    ...(labels.fuel && { fuelType: labels.fuel }),
    ...(labels.gearbox && { vehicleTransmission: labels.gearbox }),
    ...(labels.body && { bodyType: labels.body }),
    ...(v.colorBase && { color: v.colorBase }),
    ...(v.doors && { numberOfDoors: v.doors }),
    ...(v.seats && { seatingCapacity: v.seats }),
    ...(v.powerKw && {
      vehicleEngine: {
        '@type': 'EngineSpecification',
        enginePower: { '@type': 'QuantitativeValue', value: v.powerKw, unitCode: 'KWT' },
      },
    }),
    itemCondition: 'https://schema.org/UsedCondition',
    offers: {
      '@type': 'Offer',
      url,
      price: v.price,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/UsedCondition',
      seller: { '@type': 'AutoDealer', '@id': dealerId(), name: SITE.name },
    },
  }
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: item.url })),
  }
}
