'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { PAGES } from '@/lib/launch'
import { SITE, mailHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { lockScroll } from '@/components/motion/SmoothScroll'
import { CurtainLink, type CurtainHref } from './Curtain'
import { Faces, ShutterA, ShutterLink } from './Shutter'

// Pages waiting for the dealer's confirmation stay out of the menu (lib/launch.ts).
const NAV = [
  { href: '/fahrzeuge', key: 'vehicles', on: true },
  { href: '/finanzierung', key: 'financing', on: PAGES.financing },
  { href: '/ankauf', key: 'tradeIn', on: PAGES.tradeIn },
  { href: '/kontakt', key: 'contact', on: true },
].filter((l) => l.on) as { href: '/fahrzeuge' | '/finanzierung' | '/ankauf' | '/kontakt'; key: 'vehicles' | 'financing' | 'tradeIn' | 'contact' }[]

/**
 * Top bar: transparent over the opening film, solid once the page moves, out of the way
 * while reading downwards and back as soon as the visitor scrolls up. Every link carries
 * the galzura roll + red shutter. The mobile menu drops in full screen (Animmaster
 * Navigation Menus 19; Mobbin: Open's black menu with large links).
 */
export function Header({ stock }: { stock: number }) {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const tl = useTranslations('location')
  const tlang = useTranslations('lang')
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      // hide while reading down, show again on the way up
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.6)
        last = y
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    lockScroll(open)
  }, [open])

  useEffect(() => {
    setOpen(false)
    setHidden(false)
  }, [pathname])

  const { locale: _l, ...routeParams } = params as Record<string, string>
  const here = { pathname, params: routeParams } as unknown as CurtainHref
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header className="ph" data-solid={solid || open || undefined} data-hidden={(hidden && !open) || undefined}>
      <div className="ph-in pg">
        <CurtainLink href="/" className="ph-logo" aria-label={tc('brandHome')}>
          MEGA<i> </i>CARS
        </CurtainLink>
        <nav className="ph-nav" aria-label={t('label')}>
          {NAV.map((l) => (
            <ShutterLink key={l.href} href={l.href} kind="text" aria-current={active(l.href) ? 'page' : undefined}>
              {t(l.key)}
            </ShutterLink>
          ))}
        </nav>
        <div className="ph-tools">
          <span className="ph-lang">
            {routing.locales.map((l) => (
              <CurtainLink
                key={l}
                href={here}
                locale={l}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? 'true' : undefined}
                aria-label={l === locale ? undefined : tlang('switchTo', { language: tlang(l) })}
                className="sh sh--text R-host"
              >
                <Faces>{l.toUpperCase()}</Faces>
              </CurtainLink>
            ))}
          </span>
          <ShutterA href={SITE.phoneHref} kind="text" className="ph-tel" aria-label={t('callAria')}>
            <Icon name="phone" size={16} />
            <span className="tabular">{SITE.phone}</span>
          </ShutterA>
          <button type="button" className="ph-burger sh sh--line" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
            <Faces>{t('menu')}</Faces>
          </button>
        </div>
      </div>

      <dialog ref={dialog} className="menu" aria-label={t('label')} onClose={() => setOpen(false)}>
        <div className="menu-in pg">
          <div className="menu-top">
            <span className="ph-logo">
              MEGA<i> </i>CARS
            </span>
            <button type="button" className="sh sh--line ph-burger" style={{ display: 'inline-flex' }} onClick={() => setOpen(false)} aria-label={t('closeMenu')}>
              <Faces>{tc('close')}</Faces>
            </button>
          </div>
          <nav className="menu-nav" aria-label={t('label')}>
            {[{ href: '/', key: 'home' } as const, ...NAV].map((l, i) => (
              <span key={l.href} className="menu-line" style={{ ['--i' as string]: i }}>
                <ShutterLink href={l.href} kind="text" className="menu-link" aria-current={pathname === l.href ? 'page' : undefined}>
                  {t(l.key)}
                  {l.href === '/fahrzeuge' ? <sup className="tabular">{stock}</sup> : null}
                </ShutterLink>
              </span>
            ))}
          </nav>
          <div className="menu-foot">
            <div className="menu-contact">
              <span className="menu-line" style={{ ['--i' as string]: 6 }}>
                <span className="label">{tc('reachUs')}</span>
              </span>
              <span className="menu-line" style={{ ['--i' as string]: 7 }}>
                <a href={SITE.phoneHref} className="tabular">
                  {SITE.phone}
                </a>
              </span>
              <span className="menu-line" style={{ ['--i' as string]: 8 }}>
                <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener">
                  {tc('whatsappWrite')}
                </a>
              </span>
              <span className="menu-line" style={{ ['--i' as string]: 9 }}>
                <a href={mailHref}>{SITE.email}</a>
              </span>
              <span className="menu-line" style={{ ['--i' as string]: 10 }}>
                <span>
                  {SITE.street}, {SITE.zip} {SITE.city}
                </span>
              </span>
              <span className="menu-line" style={{ ['--i' as string]: 11 }}>
                <span className="tabular">
                  <span style={{ whiteSpace: 'nowrap' }}>{tl('weekdays')} 08:00–18:00</span> · <span style={{ whiteSpace: 'nowrap' }}>{tl('saturday')} 09:00–15:00</span>
                </span>
              </span>
            </div>
            <span className="menu-line ph-lang" style={{ ['--i' as string]: 12 }}>
              <span>
                {routing.locales.map((l) => (
                  <CurtainLink key={l} href={here} locale={l} hrefLang={l} lang={l} aria-current={l === locale ? 'true' : undefined} className="sh sh--text R-host" style={{ marginRight: '1.2em' }}>
                    <Faces>{tlang(l)}</Faces>
                  </CurtainLink>
                ))}
              </span>
            </span>
          </div>
        </div>
      </dialog>
    </header>
  )
}
