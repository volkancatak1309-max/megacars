'use client'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { scrollToTop } from '@/components/motion/SmoothScroll'

/**
 * Floating WhatsApp (desktop; mobile has the bottom bar) and "back to top" after two
 * screens. Quiet panel-coloured objects, no pulse, no green bubble (DESIGN.md §7.10).
 */
export function FloatingActions() {
  const tc = useTranslations('common')
  const tn = useTranslations('nav')
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 2)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed right-4 bottom-[calc(var(--bar-h)+env(safe-area-inset-bottom)+16px)] z-[210] flex flex-col items-end gap-3 lg:right-6 lg:bottom-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={tc('toTop')}
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`icon-btn size-11 shadow-[var(--shadow-float)] ${showTop ? 'pointer-events-auto opacity-100' : 'opacity-0'}`}
      >
        <Icon name="arrowUp" size={18} />
      </button>
      <a
        href={whatsappHref(tc('whatsappGeneric'))}
        target="_blank"
        rel="noopener"
        aria-label={tn('whatsappAria')}
        className="group pointer-events-auto hidden h-[52px] grid-cols-[0fr_auto] items-center rounded-full bg-panel text-ink shadow-[var(--shadow-float)] transition-[grid-template-columns,background-color] duration-[450ms] ease-[var(--ease)] hover:grid-cols-[1fr_auto] hover:bg-panel-hover focus-visible:grid-cols-[1fr_auto] lg:grid"
      >
        <span className="overflow-hidden whitespace-nowrap">
          <span className="block pl-5 text-[0.9375rem] font-medium">{tc('whatsappWrite')}</span>
        </span>
        <span className="grid size-[52px] place-items-center">
          <Icon name="whatsapp" size={22} />
        </span>
      </a>
    </div>
  )
}
