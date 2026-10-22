import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Unbounded } from 'next/font/google'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { siteOrigin } from '@/lib/site'
import { NOINDEX } from '@/lib/seo'
import { SmoothScroll } from '@/components/motion/SmoothScroll'
import '../globals.css'

// Only the Latin file is preloaded; latin-ext (ş, ğ, ı …) still loads through
// unicode-range as soon as a Turkish page needs it.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  adjustFontFallback: true,
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
    robots: NOINDEX,
    formatDetection: { telephone: false, address: false, email: false },
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      locale: locale === 'tr' ? 'tr_TR' : 'de_AT',
      images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image' },
  }
}

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

// Only namespaces used by client components travel to the browser.
const CLIENT_NAMESPACES = ['common', 'nav', 'lang', 'hero', 'quickSearch', 'location', 'list', 'vehicle', 'detail', 'gallery', 'spin', 'testDrive']
const pick = (all: Record<string, unknown>, keys: string[]) => Object.fromEntries(keys.filter((k) => k in all).map((k) => [k, all[k]]))

// Runs before first paint: marks JS and shows the counter loader only on the first
// page of a visit (it is pure CSS and never delays the poster underneath).
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');try{if(sessionStorage.getItem('mc-loader'))d.setAttribute('data-loader-off','');else sessionStorage.setItem('mc-loader','1')}catch(e){d.setAttribute('data-loader-off','')}})()`

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
