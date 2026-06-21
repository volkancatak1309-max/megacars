import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { carStats } from '../lib/cars'
import { scrollToId } from '../lib/lenis'
import { CONTACT } from '../lib/contact'

// Full-bleed cinematic hero — DESIGN.md §4.
// The video is the ONLY layer over the bg in both themes (no scrim/overlay).
// Because the footage is dark, ALL hero text is WHITE in both themes (no shadow).
export default function Hero() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('.hero-rise', {
        autoAlpha: 0,
        y: 18,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.1,
        delay: 0.2,
      })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="relative h-[100svh] w-full overflow-hidden bg-bg">
      {/* media layer — the ONLY thing over the bg. No scrim above it. */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
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
      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
        <p className="hero-rise eyebrow mb-5 text-white/70">{t('hero.eyebrow')}</p>

        <h1
          className="hero-rise display text-white"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 8rem)', textWrap: 'balance' }}
        >
          {t('hero.title')}
        </h1>

        <p className="hero-rise mt-6 max-w-[46ch] text-base leading-relaxed text-white/80 md:text-lg">
          {t('hero.subtitle')}
        </p>

        <div className="hero-rise mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId('inventory')}
            className="rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-press"
          >
            {t('hero.browse')}
          </button>
          <a
            href={CONTACT.whatsappBeratung}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[2px] border border-white/40 px-7 py-3.5 text-sm text-white transition-colors hover:border-white/80"
          >
            {t('hero.book')}
          </a>
        </div>

        {/* credential strip — real stats from cars-data.json */}
        <div className="hero-rise spec mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.72rem] text-white/70">
          <span>
            {carStats.total} {t('cred.vehicles')}
          </span>
          <span className="text-white/30">·</span>
          <span>
            {carStats.brands} {t('cred.brands')}
          </span>
          <span className="text-white/30">·</span>
          <span>
            {t('cred.from')} €{carStats.minPrice.toLocaleString('de-DE')}
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
