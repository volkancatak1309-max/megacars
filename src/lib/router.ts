import { useSyncExternalStore } from 'react'
import { scrollToId } from './lenis'

// Minimal hash router (no server config needed on Vite). Detail = #/fahrzeug/<slug>.
const subscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const getSnapshot = () => window.location.hash

export function useHash() {
  return useSyncExternalStore(subscribe, getSnapshot, () => '')
}

export type Route =
  | { name: 'home' }
  | { name: 'detail'; slug: string }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'finance' }
  | { name: 'tradein' }
  | { name: 'faq' }
  | { name: 'impressum' }
  | { name: 'datenschutz' }
  | { name: 'agb' }

export function parseRoute(hash: string): Route {
  const m = hash.match(/^#\/fahrzeug\/(.+)$/)
  if (m) return { name: 'detail', slug: decodeURIComponent(m[1]) }
  if (hash === '#/ueber-uns') return { name: 'about' }
  if (hash === '#/kontakt') return { name: 'contact' }
  if (hash === '#/finanzierung') return { name: 'finance' }
  if (hash === '#/inzahlungnahme') return { name: 'tradein' }
  if (hash === '#/faq') return { name: 'faq' }
  if (hash === '#/impressum') return { name: 'impressum' }
  if (hash === '#/datenschutz') return { name: 'datenschutz' }
  if (hash === '#/agb') return { name: 'agb' }
  return { name: 'home' }
}

export function navigate(to: string) {
  window.location.hash = to
}

// Remembers the home scroll position when opening a detail page, so returning
// (browser back OR the in-page "Zurück" link) lands exactly where the user was.
let remembered: number | null = null
export const scrollMemory = {
  remember() {
    remembered = window.scrollY
  },
  take(): number | null {
    const v = remembered
    remembered = null
    return v
  },
  forget() {
    remembered = null
  },
}

// Navigate to a route (about/contact/etc.) without triggering scroll restore.
export function go(hash: string) {
  scrollMemory.forget()
  window.location.hash = hash
}

// Scroll to an on-home section. If currently on ANY sub-page (detail, about,
// contact, faq, etc.), go home first, then scroll. Explicit section nav must
// NOT trigger a remembered-scroll restore.
export function goSection(id: string) {
  scrollMemory.forget()
  const onHome = window.location.hash === '' || window.location.hash === '#/'
  if (!onHome) {
    window.location.hash = ''
    setTimeout(() => scrollToId(id), 200)
  } else {
    scrollToId(id)
  }
}
