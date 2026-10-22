import type { MetadataRoute } from 'next'
import { routing, type AppPathname } from '@/i18n/routing'
import { vehicles } from '@/lib/inventory'
import { PAGES } from '@/lib/launch'
import { languageAlternates, localizedUrl } from '@/lib/seo'

type Href = Parameters<typeof localizedUrl>[0]

// Pages that wait for the dealer's confirmation (lib/launch.ts PAGES) are left out.
const STATIC: AppPathname[] = [
  '/',
  '/fahrzeuge',
  ...(PAGES.financing ? (['/finanzierung'] as const) : []),
  ...(PAGES.tradeIn ? (['/ankauf'] as const) : []),
  '/kontakt',
  '/impressum',
  '/datenschutz',
]

/** One entry per page and language, each with its hreflang alternates. */
function entries(href: Href): MetadataRoute.Sitemap {
  const languages = languageAlternates(href)
  return routing.locales.map((l) => ({ url: localizedUrl(href, l), alternates: { languages } }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC.flatMap((p) => entries(p as Href)),
    ...vehicles.flatMap((v) => entries({ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } })),
  ]
}
