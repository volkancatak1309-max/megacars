import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // order = order in the language switch: DE · EN · TR
  locales: ['de', 'en', 'tr'],
  defaultLocale: 'de',
  localePrefix: 'always',
  // The first visit follows Accept-Language; afterwards the address carries the language.
  // No NEXT_LOCALE cookie: the site sets no cookies at all (Datenschutz).
  localeCookie: false,
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
