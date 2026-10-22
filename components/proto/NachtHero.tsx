'use client'
import { useEffect, useRef, useState } from 'react'
import { useMotion, MOTION_OK } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { ShutterLink } from './Shutter'

const PORTRAIT = '(max-aspect-ratio: 1/1)'

// Unbounded at its natural proportions (no glyph squeezing): MEGA over CARS,
// CARS spaced out to the width of MEGA. Sizes come from the font's metrics:
// "MEGA" is 4.03 em wide, the cap height is 0.75 em.
const LAYOUT = {
  landscape: { w: 1600, h: 900, size: 258, top: 432, lead: 230 },
  portrait: { w: 900, h: 1600, size: 174, top: 790, lead: 155 },
}

function LetterMask({ id, portrait }: { id: string; portrait: boolean }) {
  // the dark plate has the letters cut out; the film plays inside them
  const { w, h, size, top, lead } = LAYOUT[portrait ? 'portrait' : 'landscape']
  const width = Math.round(size * 4.03)
  return (
    <svg className={`rc-mask ${portrait ? 'is-portrait' : 'is-landscape'}`} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <rect width={w} height={h} fill="#fff" />
          <text x={w / 2} y={top} textAnchor="middle" fill="#000" className="rc-letters" style={{ fontSize: size }}>
            MEGA
          </text>
          <text x={w / 2} y={top + lead} textAnchor="middle" textLength={width} lengthAdjust="spacing" fill="#000" className="rc-letters" style={{ fontSize: size }}>
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

/**
 * Yön C hero: the film runs inside the giant letters MEGA CARS. Scrolling opens the
 * letters until the film fills the screen. The stage stays for exactly one screen
 * (Volkan: no pin longer than one screen), and the page always scrolls down.
 * Reduced motion: no autoplay, no scaling; the poster shows inside the letters.
 */
export function NachtHero({ title, cta, scroll, label }: { title: string; cta: string; scroll: string; label: string }) {
  const root = useRef<HTMLElement>(null)
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (conn?.saveData) return
    const attach = () => setSrc(matchMedia(PORTRAIT).matches ? '/hero/hero-mobile.mp4' : '/hero/hero-desktop.mp4')
    if (document.readyState === 'complete') attach()
    else window.addEventListener('load', attach, { once: true })
    return () => window.removeEventListener('load', attach)
  }, [])

  useMotion(({ gsap }) => {
    gsap.matchMedia().add(MOTION_OK, () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: 0.6, invalidateOnRefresh: true },
      })
      tl.to('.rc-mask', { scale: 14, transformOrigin: (_: number, el: SVGSVGElement) => zoomOrigin(el), duration: 1, ease: 'power2.in' }, 0)
        .to('.rc-mask', { opacity: 0, duration: 0.35 }, 0.6)
        .to('.rc-film', { scale: 1, duration: 1 }, 0)
        .to('.rc-hint', { opacity: 0, duration: 0.2 }, 0)
        .fromTo('.rc-copy', { yPercent: 0 }, { yPercent: -18, duration: 1 }, 0)
    })
  }, root)

  return (
    <section ref={root} className="rc-hero" aria-labelledby="rc-title">
      <div className="rc-stage">
        <div className="rc-film">
          <picture>
            <source media={PORTRAIT} srcSet="/hero/hero-poster-mobile.webp" width={540} height={960} />
            <img src="/hero/hero-poster-desktop.webp" width={1920} height={1080} alt="" fetchPriority="high" />
          </picture>
          {src && <video src={src} muted loop playsInline autoPlay preload="auto" aria-label={label} onPlaying={(e) => e.currentTarget.setAttribute('data-playing', '')} />}
        </div>
        <LetterMask id="rc-m-l" portrait={false} />
        <LetterMask id="rc-m-p" portrait />
        <div className="rc-scrim" aria-hidden="true" />
        <div className="rc-copy pg">
          <h1 id="rc-title" className="rc-title">
            <span className="mline rise">
              <span>{title}</span>
            </span>
          </h1>
          <ShutterLink href="/fahrzeuge" kind="solid">
            {cta}
            <Icon name="arrowRight" size={18} />
          </ShutterLink>
        </div>
        <p className="rc-hint" aria-hidden="true">
          <span>{scroll}</span>
          <i />
        </p>
      </div>
    </section>
  )
}
