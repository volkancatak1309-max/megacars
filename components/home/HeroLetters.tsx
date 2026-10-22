'use client'
import { useEffect, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useMotion, MOTION_OK, REDUCED } from '@/lib/gsap'
import type { HeroFilm } from '@/lib/hero'
import { Icon } from '@/components/ui/Icon'
import { ShutterButton, ShutterLink } from '@/components/site/Shutter'

const PORTRAIT = '(max-aspect-ratio: 1/1)'

// Unbounded at its natural proportions (no glyph squeezing): MEGA over CARS, CARS
// spaced out to the width of MEGA. Sizes come from the font's metrics: "MEGA" is
// 4.03 em wide and the cap height is 0.75 em.
const LAYOUT = {
  landscape: { w: 1600, h: 900, size: 258, top: 432, lead: 230 },
  portrait: { w: 900, h: 1600, size: 174, top: 700, lead: 155 },
}

/** The dark plate with the letters cut out; whatever sits behind it shows through them. */
export function LetterMask({ id, portrait, className = '' }: { id: string; portrait: boolean; className?: string }) {
  const { w, h, size, top, lead } = LAYOUT[portrait ? 'portrait' : 'landscape']
  const width = Math.round(size * 4.03)
  return (
    <svg
      className={`hl-mask ${portrait ? 'is-portrait' : 'is-landscape'} ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <rect width={w} height={h} fill="#fff" />
          <text x={w / 2} y={top} textAnchor="middle" fill="#000" className="hl-letters" style={{ fontSize: size }}>
            MEGA
          </text>
          <text x={w / 2} y={top + lead} textAnchor="middle" textLength={width} lengthAdjust="spacing" fill="#000" className="hl-letters" style={{ fontSize: size }}>
            CARS
          </text>
        </mask>
      </defs>
      <rect width={w} height={h} fill="currentColor" mask={`url(#${id})`} />
    </svg>
  )
}

/** Screen point (px, relative to the mask) on the middle arm of the E, so the zoom flies into a letter, not into the plate. */
function zoomOrigin(svg: SVGSVGElement) {
  const text = svg.querySelector('text')
  const W = svg.parentElement?.clientWidth ?? 0
  const H = svg.parentElement?.clientHeight ?? 0
  if (!text || !W || getComputedStyle(svg).display === 'none') return '50% 50%'
  const { width: vw, height: vh } = svg.viewBox.baseVal
  const s = Math.max(W / vw, H / vh)
  const a = text.getStartPositionOfChar(1)
  const b = text.getEndPositionOfChar(1)
  const x = (a.x + b.x) / 2
  const y = a.y - parseFloat(text.style.fontSize) * 0.375
  return `${(W - vw * s) / 2 + x * s}px ${(H - vh * s) / 2 + y * s}px`
}

/** Attaches the film after the page has loaded; never on Save-Data, 2G or reduced motion. */
export function useFilm(film: HeroFilm) {
  const [src, setSrc] = useState<string | null>(null)
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
    if (matchMedia(REDUCED).matches || conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? '')) return
    const attach = () => setSrc(matchMedia(PORTRAIT).matches ? film.mobile : film.desktop)
    if (document.readyState === 'complete') attach()
    else window.addEventListener('load', attach, { once: true })
    return () => window.removeEventListener('load', attach)
  }, [film])
  return [src, setSrc] as const
}

/**
 * Wow 1: the film runs inside the giant letters MEGA CARS. Scrolling flies into the E
 * until the film fills the screen; the stage stays for exactly one screen (no pin
 * longer than one screen) and the page always scrolls down. The WebP poster is the
 * LCP element and is visible from the first paint; the title rises in CSS.
 * WCAG 2.2.2: the film can be paused. Reduced motion: no film, no zoom.
 */
export function HeroLetters({ film, title, cta, count }: { film: HeroFilm; title: string; cta: string; count: number }) {
  const t = useTranslations('hero')
  const locale = useLocale() as keyof HeroFilm['label']
  const root = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useFilm(film)
  const [paused, setPaused] = useState(false)

  // the film rests while the stage is off screen or the visitor paused it
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

  const toggle = () => {
    const v = video.current
    if (!v) {
      setPaused(false)
      setSrc(matchMedia(PORTRAIT).matches ? film.mobile : film.desktop)
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

  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true },
      })
      tl.to('.hl-mask', { scale: 14, transformOrigin: (_: number, el: SVGSVGElement) => zoomOrigin(el), duration: 1, ease: 'power2.in' }, 0)
        .to('.hl-mask', { opacity: 0, duration: 0.35 }, 0.6)
        .to('.hl-film', { scale: 1, duration: 1 }, 0)
        .to('.hl-hint', { opacity: 0, duration: 0.2 }, 0)
        .fromTo('.hl-copy', { yPercent: 0 }, { yPercent: -18, duration: 1 }, 0)
    })
  }, root)

  const playing = Boolean(src) && !paused

  return (
    <section ref={root} className="hl" aria-labelledby="hl-title">
      <div className="hl-stage">
        <div className="hl-film">
          {/* a very slow push-in breaks the locked-off camera; it never adds to the scroll zoom's peak */}
          <div className="hl-push">
            <picture>
              <source media={PORTRAIT} srcSet={film.posterMobile} width={540} height={960} />
              <img src={film.posterDesktop} width={1920} height={1080} alt="" fetchPriority="high" />
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
                aria-label={film.label[locale]}
                onPlaying={(e) => e.currentTarget.setAttribute('data-playing', '')}
              />
            )}
          </div>
        </div>
        <LetterMask id="hl-m-l" portrait={false} />
        <LetterMask id="hl-m-p" portrait />
        <div className="hl-scrim" aria-hidden="true" />
        <div className="hl-copy pg">
          <h1 id="hl-title" className="hl-title">
            <span className="mline rise">
              <span>{title}</span>
            </span>
          </h1>
          <div className="hl-actions fade-up">
            <ShutterLink href="/fahrzeuge" kind="solid">
              {cta}
              <span className="tabular">({count})</span>
              <Icon name="arrowRight" size={18} />
            </ShutterLink>
            <ShutterButton kind="line" className="hl-play" onClick={toggle} aria-label={playing ? t('pause') : t('play')}>
              <Icon name={playing ? 'pause' : 'play'} size={16} />
            </ShutterButton>
          </div>
        </div>
        <p className="hl-hint" aria-hidden="true">
          <span>{t('scroll')}</span>
          <i />
        </p>
      </div>
    </section>
  )
}
