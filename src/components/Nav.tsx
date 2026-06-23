import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { goSection, go, useHash } from '../lib/router'
import { prefersReducedMotion } from '../lib/motion'
import { useMagnetic } from '../hooks/useMagnetic'

export default function Nav() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const hiddenRef = useRef(false)
  const logoRef = useMagnetic<HTMLAnchorElement>(0.4)
  const hash = useHash()

  // Transparent over the dark hero video, solid once scrolled past it / off-home.
  const applyState = useCallback(() => {
    const header = ref.current
    if (!header) return
    const hero = document.getElementById('top')
    const navH = header.offsetHeight || 64
    const threshold = hero ? Math.max(0, hero.offsetHeight - navH) : 0
    header.classList.toggle('nav-over-hero', window.scrollY < threshold)
  }, [])

  useGSAP(
    () => {
      const header = ref.current
      if (!header) return
      const reduce = prefersReducedMotion()

      const show = () => {
        if (!hiddenRef.current) return
        hiddenRef.current = false
        if (!reduce) gsap.to(header, { yPercent: 0, duration: 0.4, ease: 'power3.out' })
      }
      const hide = () => {
        if (hiddenRef.current) return
        hiddenRef.current = true
        if (!reduce) gsap.to(header, { yPercent: -100, duration: 0.4, ease: 'power3.out' })
      }

      applyState()
      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          applyState()
          // Never hide near the very top; otherwise hide on down, reveal on up.
          if (window.scrollY < window.innerHeight * 0.3) return show()
          if (self.direction === 1) hide()
          else show()
        },
      })
      return () => st.kill()
    },
    { scope: ref },
  )

  // Route change: reveal the nav and recompute transparency after the new page
  // mounts/scrolls (App resets scroll on non-home routes).
  useEffect(() => {
    hiddenRef.current = false
    const header = ref.current
    if (header) gsap.set(header, { yPercent: 0 })
    requestAnimationFrame(() => {
      applyState()
      ScrollTrigger.refresh()
    })
  }, [hash, applyState])

  const handleLogo = (e: React.MouseEvent) => {
    e.preventDefault()
    goSection('top')
  }
  const handleInventory = (e: React.MouseEvent) => {
    e.preventDefault()
    goSection('inventory')
  }
  const handleAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    go('#/ueber-uns')
  }
  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault()
    go('#/kontakt')
  }

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md transition-colors"
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          ref={logoRef}
          href="#/"
          onClick={handleLogo}
          className="display text-lg leading-none text-text"
        >
          MEGACARS
        </a>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#inventory"
            onClick={handleInventory}
            className="link-underline spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.inventory')}
          </a>
          <a
            href="#/ueber-uns"
            onClick={handleAbout}
            className="link-underline spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.about')}
          </a>
          <a
            href="#/kontakt"
            onClick={handleContact}
            className="link-underline spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.contact')}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <LangToggle />
          <span className="nav-divider h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
