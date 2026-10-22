'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { scrollToTop } from '@/components/motion/SmoothScroll'
import { ShutterA } from './Shutter'

/**
 * Back to top with a thin red ring that fills with the reading progress, and WhatsApp
 * on desktop (mobile has it in the action bar). Quiet night-coloured objects: no
 * pulse, no green bubble (Mobbin: Goodreads' quiet "up" button above the bar).
 */
export function Floating() {
  const tc = useTranslations('common')
  const tn = useTranslations('nav')
  const [on, setOn] = useState(false)
  const [end, setEnd] = useState(false)
  const top = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      top.current?.style.setProperty('--p', p.toFixed(3))
      setOn(window.scrollY > window.innerHeight * 1.5)
      // the footer carries the contact links itself; WhatsApp steps aside there
      setEnd(max - window.scrollY < 320)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="fl" data-on={on || undefined} data-end={end || undefined}>
      <button ref={top} type="button" className="fl-top" data-on={on || undefined} onClick={scrollToTop} aria-label={tc('toTop')} tabIndex={on ? 0 : -1} aria-hidden={!on}>
        <svg className="fl-ring" viewBox="0 0 52 52" aria-hidden="true">
          <circle className="fl-track" cx="26" cy="26" r="25" />
          <circle className="fl-progress" cx="26" cy="26" r="25" pathLength={1} />
        </svg>
        <Icon name="arrowUp" size={18} />
      </button>
      <ShutterA href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" kind="solid" className="fl-wa" aria-label={tn('whatsappAria')} tabIndex={on ? 0 : -1}>
        <Icon name="whatsapp" size={18} />
        {tc('whatsappWrite')}
      </ShutterA>
    </div>
  )
}
