import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // order = order in the language switch: DE · EN · TR
  locales: ['de', 'en', 'tr'],
  defaultLocale: 'de',
  localePrefix: 'always',
  // Only a visit to "/" picks a language: the NEXT_LOCALE cookie (set when the visitor
  // chooses a language) wins, then Accept-Language. Prefixed addresses are served as
  // they are. The cookie is strictly necessary (no consent, TKG 2021 § 165 Abs. 3) and
  // is named in the Datenschutz page; it lives one year (Volkan, 23.10.2026: the
  // chosen language must survive a return visit).
  localeCookie: { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' },
  pathnames: {
    '/': '/',
    '/fahrzeuge': { de: '/fahrzeuge', en: '/vehicles', tr: '/araclar' },
    '/fahrzeuge/[slug]': { de: '/fahrzeuge/[slug]', en: '/vehicles/[slug]', tr: '/araclar/[slug]' },
    '/finanzierung': { de: '/finanzierung', en: '/financing', tr: '/finansman' },
    '/ankauf': { de: '/ankauf', en: '/trade-in', tr: '/takas' },
    '/kontakt': { de: '/kontakt', en: '/contact', tr: '/iletisim' },
    '/impressum': { de: '/impressum', en: '/imprint', tr: '/kunye' },
    '/datenschutz': { de: '/datenschutz', en: '/privacy', tr: '/gizlilik' },
  },
})

export type Locale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
