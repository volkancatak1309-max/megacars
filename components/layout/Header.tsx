'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { SITE, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { LanguageSwitcher } from './LanguageSwitcher'
import { lockScroll } from '@/components/motion/SmoothScroll'

const NAV = [
  { href: '/fahrzeuge', key: 'vehicles' },
  { href: '/finanzierung', key: 'financing' },
  { href: '/ankauf', key: 'tradeIn' },
  { href: '/kontakt', key: 'contact' },
] as const

export function Header() {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const tl = useTranslations('location')
  const pathname = usePathname()
  const overlay = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
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

  // close the menu when the route changes
  useEffect(() => setOpen(false), [pathname])

  const solid = !overlay || scrolled
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      style={{ viewTransitionName: 'site-header' }}
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color] duration-[450ms] ease-[var(--ease)] ${
        solid ? 'border-line bg-night' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-max page-x flex h-[var(--header-h)] items-center gap-6">
        <Link href="/" aria-label={tc('brandHome')} className="mr-auto shrink-0 py-2 text-[0.9375rem] font-medium tracking-[0.32em] text-ink lg:mr-10">
          MEGA CARS
        </Link>

        <nav aria-label={t('label')} className="mr-auto hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className="group relative py-2 text-[0.9375rem] text-ink-2 transition-colors duration-300 hover:text-ink aria-[current=page]:text-ink"
                >
                  {t(item.key)}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={SITE.phoneHref} aria-label={t('callAria')} className="hidden items-center gap-2.5 text-[0.9375rem] text-ink-2 transition-colors duration-300 hover:text-ink lg:inline-flex">
          <Icon name="phone" size={18} />
          <span className="tabular hidden xl:inline">{SITE.phone}</span>
        </a>
        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        <a href={SITE.phoneHref} aria-label={t('callAria')} className="icon-btn size-11 bg-transparent lg:hidden">
          <Icon name="phone" size={20} />
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={t('openMenu')}
          className="btn btn-secondary btn-sm -mr-1 gap-2 lg:hidden"
        >
          <Icon name="menu" size={18} />
          {t('menu')}
        </button>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        aria-label={t('label')}
        className="menu-dialog fixed inset-0 m-0 h-[100svh] max-h-none w-full max-w-none bg-night p-0 text-ink"
      >
        <div className="page-x flex h-full flex-col overflow-y-auto pb-8">
          <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <span className="text-[0.9375rem] font-medium tracking-[0.32em]">MEGA CARS</span>
            <button type="button" onClick={() => setOpen(false)} aria-label={t('closeMenu')} className="btn btn-secondary btn-sm -mr-1 gap-2">
              <Icon name="close" size={18} />
              {tc('close')}
            </button>
          </div>
          <nav aria-label={t('label')} className="mt-8">
            <ul className="grid gap-2">
              {[{ href: '/', key: 'home' } as const, ...NAV].map((item, i) => (
                <li key={item.href} className="overflow-clip">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className="menu-link t-h1 block py-1 text-ink-2 aria-[current=page]:text-ink"
                    style={{ ['--i' as string]: i }}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-8 pt-12 sm:grid-cols-2">
            <div className="grid gap-3 text-ink-2">
              <a href={SITE.phoneHref} className="tabular inline-flex min-h-11 items-center gap-3 text-ink">
                <Icon name="phone" size={18} /> {SITE.phone}
              </a>
              <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 text-ink">
                <Icon name="whatsapp" size={18} /> {tc('whatsappWrite')}
              </a>
              <p className="mt-2">
                {SITE.street}, {SITE.zip} {SITE.city}
              </p>
              <p className="tabular text-[0.9375rem]">
                {tl('weekdays')} 08:00–18:00 · {tl('saturday')} 09:00–15:00
              </p>
            </div>
            <LanguageSwitcher variant="list" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </dialog>
    </header>
  )
}
