import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredCar as car, carYear } from '../lib/cars'

gsap.registerPlugin(ScrollTrigger)

// Featured car — cinematic single-vehicle moment (DESIGN.md hero/void DNA).
// Paced parallax + reveal (ARSENAL: no bounce/spring). Data-driven, real photo.
export default function FeaturedCar() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)
  const img = '/' + car.fotograflar[0]

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.to('.featured-img', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })
      gsap.from('.featured-reveal', {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      })
    },
    { scope: root },
  )

  const stats: [string, string | number][] = [
    [t('detail.year'), carYear(car)],
    [t('detail.km'), car.km.toLocaleString('de-DE')],
    [t('detail.ps'), car.guc_ps],
  ]

  return (
    <section id="featured" ref={root} className="bg-bg px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <img
              src={img}
              alt={`${car.marka} ${car.model}`}
              className="featured-img absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className="featured-reveal eyebrow text-muted">{t('featured.eyebrow')}</p>
          <h2
            className="featured-reveal display mt-4 text-text"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.6rem)' }}
          >
            {car.marka} {car.model}
          </h2>
          <p className="featured-reveal mt-4 max-w-[42ch] text-sm leading-relaxed text-muted">
            {car.aciklama}
          </p>

          <div className="featured-reveal mt-7 grid grid-cols-3 gap-4 border-y border-border py-5">
            {stats.map(([l, v]) => (
              <div key={l}>
                <div className="spec text-[0.6rem] text-faint">{l}</div>
                <div className="spec mt-1 text-base text-text">{v}</div>
              </div>
            ))}
          </div>

          <p
            className="featured-reveal display mt-6 text-accent"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)' }}
          >
            €{car.fiyat.toLocaleString('de-DE')}
          </p>

          <a
            href={`#/fahrzeug/${car.id}`}
            className="featured-reveal mt-6 inline-block rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-press"
          >
            {t('featured.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
