import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { carStats } from '../lib/cars'
import { scrollToId } from '../lib/lenis'
import { CONTACT } from '../lib/contact'
import { prefersReducedMotion } from '../lib/motion'
import { useMagnetic } from '../hooks/useMagnetic'
import Counter from './Counter'

// Full-bleed cinematic hero — DESIGN.md §4.
// The video is the ONLY layer over the bg in both themes (no scrim/overlay).
// Because the footage is dark, ALL hero text is WHITE in both themes (no shadow).
export default function Hero() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const browseRef = useMagnetic<HTMLButtonElement>(0.4)
  const bookRef = useMagnetic<HTMLAnchorElement>(0.4)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      // Hide the headline until the SplitText reveal runs (after fonts load) —
      // set in this layout effect so there is no flash before the passive split.
      gsap.set(h1Ref.current, { autoAlpha: 0 })

      // Intro: everything EXCEPT the headline rises in (headline = SplitText).
      gsap.from('.hero-rise', {
        autoAlpha: 0,
        y: 18,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.45,
      })

      // Scroll-driven depth: the video pushes in while the content lifts + fades.
      // No scrim/overlay is added to the video (DESIGN.md) — only a scale.
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 },
        })
        .to('.hero-video', { scale: 1.12, ease: 'none', transformOrigin: 'center center' }, 0)
        .to('.hero-content', { yPercent: -22, autoAlpha: 0.35, ease: 'none' }, 0)
    },
    { scope: root },
  )

  // Headline line-mask reveal — AFTER fonts.ready (Archivo wdth 125% line metrics).
  useEffect(() => {
    const h1 = h1Ref.current
    if (!h1 || prefersReducedMotion()) return
    let done = false
    let cancelled = false
    let split: SplitText | null = null
    const run = () => {
      if (done || cancelled || !h1) return
      done = true
      split = new SplitText(h1, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
      gsap.set(h1, { autoAlpha: 1 })
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.15,
      })
    }
    document.fonts.ready.then(run).catch(() => {})
    const fallback = window.setTimeout(run, 1500)
    return () => {
      cancelled = true
      clearTimeout(fallback)
      split?.revert()
    }
  }, [])

  return (
    <section id="top" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-bg">
      {/* media layer — the ONLY thing over the bg. No scrim above it. */}
      <div className="absolute inset-0">
        <video
          className="hero-video h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero/hero-poster.jpg"
        >
          <source src="/hero/hero-main.mp4" type="video/mp4" />
        </video>
      </div>

      {/* content — white text in both themes (video is dark); no scrim, no shadow */}
      <div className="hero-content relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <p className="hero-rise eyebrow mb-5 text-white/70">{t('hero.eyebrow')}</p>

        <h1
          ref={h1Ref}
          className="display text-white"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 8rem)', textWrap: 'balance' }}
        >
          {t('hero.title')}
        </h1>

        <p className="hero-rise mt-6 max-w-[46ch] text-base leading-relaxed text-white/80 md:text-lg">
          {t('hero.subtitle')}
        </p>

        <div className="hero-rise mt-8 flex flex-wrap items-center gap-3">
          <button
            ref={browseRef}
            type="button"
            onClick={() => scrollToId('inventory')}
            className="btn-fill rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-white"
          >
            {t('hero.browse')}
          </button>
          <a
            ref={bookRef}
            href={CONTACT.whatsappBeratung}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2px] border border-white/40 px-7 py-3.5 text-sm text-white transition-colors hover:border-white/80"
          >
            {t('hero.book')}
          </a>
        </div>

        {/* credential strip — real stats from cars-data.json (animated count-up) */}
        <div className="hero-rise spec mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] text-white/70">
          <span>
            <Counter value={carStats.total} trigger="load" delay={0.7} /> {t('cred.vehicles')}
          </span>
          <span className="text-white/30">·</span>
          <span>
            <Counter value={carStats.brands} trigger="load" delay={0.8} /> {t('cred.brands')}
          </span>
          <span className="text-white/30">·</span>
          <span>
            {t('cred.from')} €
            <Counter
              value={carStats.minPrice}
              format={(n) => n.toLocaleString('de-DE')}
              trigger="load"
              delay={0.9}
            />
          </span>
        </div>
      </div>

      {/* scroll cue */}
      <div className="spec absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[0.58rem] text-white/60">
        {t('hero.scroll')}
      </div>
    </section>
  )
}
