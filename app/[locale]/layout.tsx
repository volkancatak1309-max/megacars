import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Unbounded } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { siteOrigin } from '@/lib/site'
import { DEFAULT_OG, ROBOTS } from '@/lib/seo'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import '../globals.css'

// Body face is not preloaded: on a slow line its 34 KB would compete with the LCP
// photo/poster; the metric-adjusted fallback keeps the swap free of layout shift.
// latin-ext (ş, ğ, ı …) loads through unicode-range as soon as a Turkish page needs it.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  adjustFontFallback: true,
  preload: false,
})

// Display face (SIL OFL 1.1): wide, confident capitals for headings and the opening letters.
const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    metadataBase: new URL(siteOrigin()),
    title: t('homeTitle'),
    description: t('homeDescription'),
    applicationName: 'Mega Cars',
    robots: ROBOTS,
    formatDetection: { telephone: false, address: false, email: false },
    // fallback for pages without their own share data (pageMeta sets it everywhere else)
    openGraph: { type: 'website', siteName: t('siteName'), images: [DEFAULT_OG] },
    twitter: { card: 'summary_large_image' },
  }
}

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

// Only namespaces used by client components travel to the browser.
const CLIENT_NAMESPACES = ['common', 'nav', 'lang', 'hero', 'quickSearch', 'location', 'list', 'vehicle', 'detail', 'gallery', 'spin', 'testDrive', 'form']
const pick = (all: Record<string, unknown>, keys: string[]) => Object.fromEntries(keys.filter((k) => k in all).map((k) => [k, all[k]]))

// Runs before first paint: marks JS and shows the counter loader only when a visit
// arrives from outside (not after a reload, back/forward or a link within the site).
// Nothing is stored on the device (Datenschutz: no cookies, no storage). The loader is
// pure CSS and never delays the poster underneath.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{var n=performance.getEntriesByType('navigation')[0],r=document.referrer;if((r&&new URL(r).origin===location.origin)||(n&&n.type!=='navigate'))d.setAttribute('data-loader-off','')}catch(e){d.setAttribute('data-loader-off','')}})()`

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${hanken.variable} ${unbounded.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {t('skip')}
        </a>
        <NextIntlClientProvider messages={pick(messages, CLIENT_NAMESPACES)}>
          <SmoothScroll />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
