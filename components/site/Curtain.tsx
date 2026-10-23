'use client'
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, type ComponentProps, type MouseEvent } from 'react'
import { usePathname as useRawPathname } from 'next/navigation'
import { Link, useRouter } from '@/i18n/navigation'
import { getLenis } from '@/components/motion/SmoothScroll'

export type CurtainHref = ComponentProps<typeof Link>['href']

type Ctx = { go: (href: CurtainHref) => void }
const CurtainContext = createContext<Ctx | null>(null)

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Red curtain between pages (Animmaster Page Transitions 5 "cover", two rows): the
 * rows close from top and bottom, the wordmark rises on the red, the next page loads
 * behind it, then the rows fold away. Back/forward and reduced motion skip it.
 */
export function CurtainProvider({ mark, children }: { mark: string; children: React.ReactNode }) {
  const router = useRouter()
  const pathname = useRawPathname()
  const root = useRef<HTMLDivElement>(null)
  const pending = useRef(false)
  const lastPath = useRef(pathname)

  const rows = () => [...(root.current?.querySelectorAll<HTMLElement>('.curtain-row') ?? [])]
  const word = () => root.current?.querySelector<HTMLElement>('.curtain-mark > span > span') ?? null

  const reveal = useCallback(async () => {
    const el = root.current
    if (!el) return
    const w = word()
    await Promise.all([
      w?.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-110%)' }], { duration: 500, easing: EASE, fill: 'forwards' }).finished,
      ...rows().map((r) =>
        r.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 800, delay: 180, easing: EASE, fill: 'forwards' }).finished,
      ),
    ])
    el.removeAttribute('data-state')
    el.getAnimations({ subtree: true }).forEach((a) => a.cancel())
    pending.current = false
  }, [])

  const go = useCallback(
    async (href: CurtainHref) => {
      const el = root.current
      if (!el || reduced() || pending.current) {
        router.push(href as never)
        return
      }
      pending.current = true
      el.setAttribute('data-state', 'cover')
      const w = word()
      await Promise.all([
        ...rows().map((r) => r.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 700, easing: EASE, fill: 'forwards' }).finished),
        w?.animate([{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }], { duration: 650, delay: 250, easing: EASE, fill: 'forwards' }).finished,
      ])
      router.push(href as never)
      // never leave the visitor behind a curtain if the page does not change
      window.setTimeout(() => pending.current && reveal(), 4000)
    },
    [router, reveal],
  )

  useEffect(() => {
    if (pathname === lastPath.current) return
    lastPath.current = pathname
    if (!pending.current) return
    // behind the closed curtain the new page starts at its top
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => reveal())
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, reveal])

  return (
    <CurtainContext.Provider value={{ go }}>
      {children}
      <div ref={root} className="curtain" aria-hidden="true">
        <div className="curtain-row" />
        <div className="curtain-row" />
        <div className="curtain-mark">
          <span>
            <span>{mark}</span>
          </span>
        </div>
      </div>
    </CurtainContext.Provider>
  )
}

/**
 * A next-intl link that travels behind the red curtain when a provider is present.
 * No prefetch for every link that scrolls into view (on a slow phone those requests
 * kept the main thread busy before the first paint); the next page is prefetched on
 * hover or touch instead, and the closing curtain covers the rest of the wait.
 */
export const CurtainLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(function CurtainLink(
  { href, onClick, onMouseEnter, onTouchStart, prefetch = false, ...rest },
  ref,
) {
  const ctx = useContext(CurtainContext)
  const router = useRouter()
  return (
    <Link
      ref={ref}
      href={href}
      prefetch={prefetch}
      onMouseEnter={(e) => {
        onMouseEnter?.(e)
        router.prefetch(href as never)
      }}
      onTouchStart={(e) => {
        onTouchStart?.(e)
        router.prefetch(href as never)
      }}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (e.defaultPrevented || !ctx || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        ctx.go(href)
      }}
      {...rest}
    />
  )
})
