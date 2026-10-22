import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // EN follows in FAZ 4B.
  locales: ['de', 'tr'],
  defaultLocale: 'de',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/fahrzeuge': { de: '/fahrzeuge', tr: '/araclar' },
    '/fahrzeuge/[slug]': { de: '/fahrzeuge/[slug]', tr: '/araclar/[slug]' },
    '/finanzierung': { de: '/finanzierung', tr: '/finansman' },
    '/ankauf': { de: '/ankauf', tr: '/takas' },
    '/kontakt': { de: '/kontakt', tr: '/iletisim' },
    '/impressum': { de: '/impressum', tr: '/kunye' },
    '/datenschutz': { de: '/datenschutz', tr: '/gizlilik' },
    // opening-film candidates (KARAR-DEFTERI 23.10.2026); stays until Volkan has chosen
    '/prototyp/hero-adaylari': { de: '/prototyp/hero-adaylari', tr: '/prototip/hero-adaylari' },
  },
})

export type Locale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
