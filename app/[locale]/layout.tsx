import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
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
  themeColor: '#0d0e11',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

// Only namespaces used by client components travel to the browser.
const CLIENT_NAMESPACES = ['common', 'nav', 'lang', 'hero', 'quickSearch', 'featured', 'location', 'list', 'vehicle', 'detail', 'gallery', 'spin', 'testDrive', 'proto']
const pick = (all: Record<string, unknown>, keys: string[]) => Object.fromEntries(keys.filter((k) => k in all).map((k) => [k, all[k]]))

// Runs before first paint: marks JS, View Transitions support and the first visit
// of the session (loader, max 900 ms, never on top of the LCP poster's paint).
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');if(!('startViewTransition' in document))d.classList.add('no-vt');try{if(!sessionStorage.getItem('mc-visited')){sessionStorage.setItem('mc-visited','1');d.setAttribute('data-loader','');setTimeout(function(){d.removeAttribute('data-loader')},1300)}}catch(e){}})()`

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const messages = await getMessages()

  return (
    <html lang={locale} className={hanken.variable} suppressHydrationWarning>
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
