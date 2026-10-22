import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// First visit: Accept-Language decides; afterwards the NEXT_LOCALE cookie wins.
// Also maps the localized paths (/tr/araclar → internal /tr/fahrzeuge).
export default createMiddleware(routing)

export const config = {
  // everything except API routes, Next internals and files with an extension
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
