'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { whatsappHref } from '@/lib/site'
import { useMotion, MOTION_OK, REDUCED } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { Magnetic } from '@/components/ui/Magnetic'

const PORTRAIT = '(max-aspect-ratio: 1/1)'

/**
 * Wow 1 — full-screen film (real Pexels footage, 24 fps, seamless loop). The WebP poster
 * is the LCP element; the video is attached only after `load`, never on Save-Data/2G or
 * with reduced motion. The title rises line by line out of a mask at reading speed;
 * scrolling pulls the camera back (scale 1 → 0.92, darken 0 → 0.55).
 */
export function Hero() {
  const t = useTranslations('hero')
  const tc = useTranslations('common')
  const root = useRef<HTMLElement>(null)
  const media = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  // attach the video after the page has loaded
  useEffect(() => {
    const motion = matchMedia(REDUCED)
    setReduced(motion.matches)
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return
    const attach = () => {
      if (matchMedia(REDUCED).matches) return
      setSrc(matchMedia(PORTRAIT).matches ? '/hero/hero-mobile.mp4' : '/hero/hero-desktop.mp4')
    }
    if (document.readyState === 'complete') attach()
    else window.addEventListener('load', attach, { once: true })
    return () => window.removeEventListener('load', attach)
  }, [])

  // pause when the hero leaves the screen or the tab is hidden
  useEffect(() => {
    const v = video.current
    if (!v || !src) return
    const io = new IntersectionObserver(([entry]) => {
      if (paused) return
      if (entry.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    return () => io.disconnect()
  }, [src, paused])

  const togglePlay = () => {
    const v = video.current
    if (!v) {
      // reduced motion or saved data: the visitor explicitly asks for the film
      setPaused(false)
      setSrc(matchMedia(PORTRAIT).matches ? '/hero/hero-mobile.mp4' : '/hero/hero-desktop.mp4')
      return
    }
    if (v.paused) {
      v.play().catch(() => {})
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  // The title reveal is pure CSS (.hero-line), so it starts with the first paint and
  // never waits for JavaScript (keeps LCP early). GSAP only drives the scroll pull-back.
  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
        defaults: { ease: 'none' },
      })
      tl.to(media.current, { scale: 0.92 }, 0)
        .to('[data-hero-darken]', { opacity: 0.55 }, 0)
        .to('[data-hero-content]', { yPercent: -8 }, 0)
    })
  }, root)

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div ref={media} className="hero-media">
        <picture>
          <source media={PORTRAIT} srcSet="/hero/hero-poster-mobile.webp" width={540} height={960} type="image/webp" />
          <img src="/hero/hero-poster-desktop.webp" width={1920} height={1080} alt="" fetchPriority="high" />
        </picture>
        {src && (
          <video
            ref={video}
            src={src}
            muted
            loop
            playsInline
            autoPlay={!paused}
            preload="auto"
            aria-label={t('videoLabel')}
            data-playing={playing || undefined}
            onPlaying={() => setPlaying(true)}
          />
        )}
        <div className="hero-scrim" />
        <div className="hero-darken" data-hero-darken />
      </div>

      <div data-hero-content className="container-max page-x relative flex h-full flex-col justify-end pb-[calc(var(--bar-h)+40px)] lg:pb-24">
        <h1 id="hero-title" className="t-display">
          <span className="hero-line">
            <span style={{ ['--i' as string]: 0 }}>{t('line1')}</span>
          </span>
          <span className="hero-line">
            <span style={{ ['--i' as string]: 1 }}>{t('line2')}</span>
          </span>
        </h1>
        <p className="hero-lead t-lead mt-6 max-w-[44ch] text-ink-2">{t('lead')}</p>
        <div className="hero-ctas mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <Link href="/fahrzeuge" className="btn btn-primary">
              {t('ctaPrimary')}
              <Icon name="arrowRight" size={18} />
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" className="btn btn-secondary">
              <Icon name="whatsapp" size={18} />
              {t('ctaSecondary')}
            </a>
          </Magnetic>
        </div>
      </div>

      {(src || reduced) && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={!src || paused ? t('play') : t('pause')}
          className="icon-btn absolute right-[var(--page-x)] bottom-[calc(var(--bar-h)+40px)] size-11 border border-line-strong bg-night/60 lg:bottom-24"
        >
          <Icon name={!src || paused ? 'play' : 'pause'} size={16} />
        </button>
      )}
    </section>
  )
}
