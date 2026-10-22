'use client'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { SITE, mailHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { CurtainLink, type CurtainHref } from './Curtain'
import { ShutterA, ShutterLink } from './Shutter'

type Variant = 'a' | 'b' | 'c'

/**
 * Top bar shared by the three prototypes; each variant styles .ph in its own sheet.
 * Every link and button carries the galzura roll + red shutter hover. The mobile
 * menu opens full screen (Animmaster Navigation Menus 19: clip-path drop, lines rise;
 * Mobbin: Open's black menu with large links, ZARA's serif menu for B).
 */
export function ProtoHeader({ variant }: { variant: Variant }) {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const tp = useTranslations('proto')
  const locale = useLocale()
  const pathname = usePathname()
  const params = useParams()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const home = `/prototyp/${variant}` as const

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
    document.documentElement.classList.toggle('plock', open)
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const { locale: _l, ...routeParams } = params as Record<string, string>
  const here = { pathname, params: routeParams } as unknown as CurtainHref

  const links: { href: CurtainHref; label: string }[] = [
    { href: '/fahrzeuge', label: t('vehicles') },
    { href: '/finanzierung', label: t('financing') },
    { href: '/ankauf', label: t('tradeIn') },
    { href: '/kontakt', label: t('contact') },
  ]

  return (
    <header className="ph" data-solid={solid || undefined}>
      <div className="ph-in pg">
        <CurtainLink href={home} className="ph-logo" aria-label={tc('brandHome')}>
          MEGA CARS
        </CurtainLink>
        <nav className="ph-nav" aria-label={t('label')}>
          {links.map((l) => (
            <ShutterLink key={String(l.href)} href={l.href} kind="text">
              {l.label}
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
                className="sh sh--text R-host"
              >
                <span className="R">
                  <span className="R-face">{l.toUpperCase()}</span>
                  <span className="R-face" aria-hidden="true">
                    {l.toUpperCase()}
                  </span>
                </span>
              </CurtainLink>
            ))}
          </span>
          <ShutterA href={SITE.phoneHref} kind="text" className="ph-tel" aria-label={t('callAria')}>
            <Icon name="phone" size={16} />
            <span className="tabular">{SITE.phone}</span>
          </ShutterA>
          <button type="button" className="ph-burger sh sh--line" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
            <span className="R">
              <span className="R-face">{t('menu')}</span>
              <span className="R-face" aria-hidden="true">
                {t('menu')}
              </span>
            </span>
          </button>
        </div>
      </div>

      <dialog ref={dialog} className="pmenu" aria-label={t('label')} onClose={() => setOpen(false)}>
        <div className="pmenu-in pg">
          <div className="pmenu-top">
            <span className="ph-logo">MEGA CARS</span>
            <button type="button" className="sh sh--line" onClick={() => setOpen(false)} aria-label={t('closeMenu')}>
              <span className="R">
                <span className="R-face">{tc('close')}</span>
                <span className="R-face" aria-hidden="true">
                  {tc('close')}
                </span>
              </span>
            </button>
          </div>
          <nav className="pmenu-nav" aria-label={t('label')}>
            {[{ href: home as CurtainHref, label: t('home') }, ...links].map((l, i) => (
              <span key={String(l.href)} className="pmenu-line" style={{ ['--i' as string]: i }}>
                <ShutterLink href={l.href} kind="text" className="pmenu-link">
                  {l.label}
                </ShutterLink>
              </span>
            ))}
          </nav>
          <div className="pmenu-foot">
            <span className="pmenu-line" style={{ ['--i' as string]: 6 }}>
              <span className="pmenu-label">{tp('menuContact')}</span>
            </span>
            <span className="pmenu-line" style={{ ['--i' as string]: 7 }}>
              <a href={SITE.phoneHref} className="tabular">
                {SITE.phone}
              </a>
            </span>
            <span className="pmenu-line" style={{ ['--i' as string]: 8 }}>
              <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener">
                {tc('whatsappWrite')}
              </a>
            </span>
            <span className="pmenu-line" style={{ ['--i' as string]: 9 }}>
              <a href={mailHref}>{SITE.email}</a>
            </span>
            <span className="pmenu-line" style={{ ['--i' as string]: 10 }}>
              <span>
                {SITE.street}, {SITE.zip} {SITE.city} · {tp('hours')}
              </span>
            </span>
          </div>
        </div>
      </dialog>
    </header>
  )
}
