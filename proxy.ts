import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import { routing } from './i18n/routing'

// First visit: Accept-Language decides; afterwards the NEXT_LOCALE cookie wins.
// Also maps the localized paths (/tr/araclar → internal /tr/fahrzeuge).
const intl = createMiddleware(routing)

const ADMIN = /^\/(de|en|tr)\/admin(?=\/|$)/
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

/**
 * The admin panel (/de/admin, /tr/admin) opens only with a Supabase session: the proxy
 * refreshes the session cookies on every request and sends visitors without one to the
 * login page. The panel speaks German and Turkish, so /en/admin goes to /de/admin.
 */
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const admin = pathname.match(ADMIN)
  if (!admin) return intl(request)

  const locale = admin[1]
  if (locale === 'en') return NextResponse.redirect(new URL(pathname.replace(/^\/en/, '/de'), request.url))

  const isLogin = /^\/(de|tr)\/admin\/login\/?$/.test(pathname)
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    // no database connection: the login page explains it, everything else goes there
    return isLogin ? intl(request) : NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
  }

  let refreshed: { name: string; value: string; options: Record<string, unknown> }[] = []
  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        refreshed = list
        list.forEach(({ name, value }) => request.cookies.set(name, value))
      },
    },
  })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let response: NextResponse
  if (!user && !isLogin) response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
  else if (user && isLogin) response = NextResponse.redirect(new URL(`/${locale}/admin`, request.url))
  else response = intl(request)
  refreshed.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
  return response
}

export const config = {
  // everything except API routes, Next internals and files with an extension
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
