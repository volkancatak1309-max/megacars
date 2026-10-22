import type { MetadataRoute } from 'next'
import { routing, type AppPathname, type Locale } from '@/i18n/routing'
import { vehicles } from '@/lib/inventory'
import { localizedUrl } from '@/lib/seo'

type Href = Parameters<typeof localizedUrl>[0]

const STATIC: AppPathname[] = ['/', '/fahrzeuge', '/finanzierung', '/ankauf', '/kontakt', '/impressum', '/datenschutz']

function entry(href: Href): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) languages[l === 'de' ? 'de-AT' : l] = localizedUrl(href, l as Locale)
  languages['x-default'] = localizedUrl(href, routing.defaultLocale)
  return { url: localizedUrl(href, routing.defaultLocale), alternates: { languages } }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC.filter((p) => p !== '/fahrzeuge/[slug]').map((p) => entry(p as Href)),
    ...vehicles.map((v) => entry({ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } })),
  ]
}
