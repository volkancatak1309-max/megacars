import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import type { Car } from '../lib/cars'
import { carYear } from '../lib/cars'
import { scrollMemory } from '../lib/router'
import { prefersReducedMotion, canHover } from '../lib/motion'

// Inventory card (DESIGN.md §5): 4:3 photo, model (Geist), year·km (mono faint),
// price (mono accent). FAZ C item 13 — premium hover: slow zoom + pointer
// parallax on the media + a soft-rising spec overlay (price/km). The zoom/
// parallax live on a media wrapper so the existing photo crossfade (opacity) and
// the Phase A scroll-velocity skew (.skewable) keep working untouched.
//   • Desktop only (canHover); reduced-motion/touch → static, info stays in the
//     caption below (overlay simply never reveals). Power-curve easing, no bounce.
export default function CarCard({ car }: { car: Car }) {
  const { t } = useTranslation()
  const root = useRef<HTMLAnchorElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const img1 = '/' + car.fotograflar[0]
  const img2 = '/' + (car.fotograflar[1] ?? car.fotograflar[0])

  useGSAP(
    () => {
      if (prefersReducedMotion() || !canHover()) return
      const card = root.current
      const media = mediaRef.current
      const overlay = overlayRef.current
      if (!card || !media || !overlay) return

      gsap.set(overlay, { autoAlpha: 0, y: 14 })
      const xTo = gsap.quickTo(media, 'xPercent', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(media, 'yPercent', { duration: 0.6, ease: 'power3' })

      const enter = () => {
        gsap.to(media, { scale: 1.08, duration: 0.7, ease: 'power3.out' })
        gsap.to(overlay, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      }
      const leave = () => {
        gsap.to(media, { scale: 1, duration: 0.7, ease: 'power3.out' })
        xTo(0)
        yTo(0)
        gsap.to(overlay, { autoAlpha: 0, y: 14, duration: 0.4, ease: 'power3.out' })
      }
      const move = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        // shift opposite the pointer for a subtle parallax depth (≤ ~4%)
        xTo(px * -4)
        yTo(py * -4)
      }

      card.addEventListener('mouseenter', enter)
      card.addEventListener('mouseleave', leave)
      card.addEventListener('mousemove', move)
      return () => {
        card.removeEventListener('mouseenter', enter)
        card.removeEventListener('mouseleave', leave)
        card.removeEventListener('mousemove', move)
      }
    },
    { scope: root },
  )

  return (
    <a
      ref={root}
      href={`#/fahrzeug/${car.id}`}
      onClick={() => scrollMemory.remember()}
      aria-label={`${car.marka} ${car.model}`}
      data-flip-id={car.id}
      data-cursor-label={t('card.view')}
      className="car-card reveal group block w-full cursor-pointer text-left focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
    >
      <div className="skewable relative aspect-[4/3] overflow-hidden bg-surface">
        <div ref={mediaRef} className="absolute inset-0 will-change-transform">
          <img
            src={img1}
            alt={`${car.marka} ${car.model}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-[800ms] ease-out group-hover:opacity-0"
          />
          <img
            src={img2}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[800ms] ease-out group-hover:opacity-100"
          />
        </div>

        {/* spec overlay — soft-rises on hover (desktop); info also lives below */}
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="card-spec pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-3.5 pt-12 opacity-0"
        >
          <span className="spec text-[0.82rem] text-white">
            €{car.fiyat.toLocaleString('de-DE')}
          </span>
          <span className="spec text-[0.64rem] text-white/85">
            {car.km.toLocaleString('de-DE')} {t('card.km')}
          </span>
        </div>
      </div>

      <div className="mt-3.5">
        <h3 className="text-[0.95rem] font-medium leading-snug text-text">
          {car.marka} {car.model}
        </h3>
        <p className="spec mt-1.5 text-[0.66rem] text-faint">
          {carYear(car)} · {car.km.toLocaleString('de-DE')} {t('card.km')}
        </p>
        <p className="spec mt-2 text-[0.8rem] text-accent">€{car.fiyat.toLocaleString('de-DE')}</p>
      </div>
    </a>
  )
}
