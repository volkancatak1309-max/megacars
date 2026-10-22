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
    // design prototypes A / B / C (Volkan, 22.10.2026); noindex like the whole demo
    '/prototyp': { de: '/prototyp', tr: '/prototip' },
    '/prototyp/a': { de: '/prototyp/a', tr: '/prototip/a' },
    '/prototyp/b': { de: '/prototyp/b', tr: '/prototip/b' },
    '/prototyp/c': { de: '/prototyp/c', tr: '/prototip/c' },
    '/prototyp/a/[slug]': { de: '/prototyp/a/[slug]', tr: '/prototip/a/[slug]' },
    '/prototyp/b/[slug]': { de: '/prototyp/b/[slug]', tr: '/prototip/b/[slug]' },
    '/prototyp/c/[slug]': { de: '/prototyp/c/[slug]', tr: '/prototip/c/[slug]' },
  },
})

export type Locale = (typeof routing.locales)[number]
export type AppPathname = keyof typeof routing.pathnames
