'use client'
import { useRef, ViewTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import type { CardVehicle } from '@/lib/filter'
import { vehicleName } from '@/lib/format'
import { useMotion, DESKTOP_FINE, MOTION_OK } from '@/lib/gsap'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { RevealText } from '@/components/motion/Reveal'
import { useVehicleLabels } from '@/components/vehicle/labels'

/**
 * Wow 2 — featured vehicles. Desktop: the section is pinned and vertical scrolling moves
 * the strip sideways like a camera dolly (ease "none" is required for scrubbed horizontal
 * motion, DESIGN.md §6 exception); each photo drifts inside its frame and the text rises
 * as the card arrives. Touch, tablet and reduced motion: a native snap strip.
 */
export function FeaturedStrip({ cards }: { cards: CardVehicle[] }) {
  const t = useTranslations('featured')
  const label = useVehicleLabels()
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useMotion(
    ({ gsap }) => {
      gsap.matchMedia().add(`${DESKTOP_FINE} and ${MOTION_OK}`, () => {
        const list = track.current!
        list.classList.add('is-pinned')
        const distance = () => Math.max(0, list.scrollWidth - document.documentElement.clientWidth)
        const strip = gsap.to(list, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })
        list.querySelectorAll<HTMLElement>('li').forEach((item) => {
          const photo = item.querySelector('[data-parallax]')
          if (photo) {
            gsap.fromTo(
              photo,
              { xPercent: -5 },
              { xPercent: 5, ease: 'none', scrollTrigger: { trigger: item, containerAnimation: strip, start: 'left right', end: 'right left', scrub: true } },
            )
          }
          gsap.from(item.querySelectorAll('[data-line]'), {
            yPercent: 110,
            duration: 0.7,
            stagger: 0.08,
            scrollTrigger: { trigger: item, containerAnimation: strip, start: 'left 78%', toggleActions: 'play none none reverse' },
          })
        })
        return () => list.classList.remove('is-pinned')
      })
    },
    root,
  )

  return (
    <section ref={root} aria-labelledby="featured-title" className="overflow-clip bg-night lg:flex lg:min-h-svh lg:flex-col lg:justify-center">
      <div className="container-max page-x flex w-full flex-wrap items-end justify-between gap-x-10 gap-y-4 pt-[var(--section-y)] lg:pt-[calc(var(--header-h)+32px)]">
        <div className="max-w-[56ch]">
          <RevealText id="featured-title" className="t-h2">
            {t('title')}
          </RevealText>
          <p className="t-lead mt-4">{t('lead')}</p>
        </div>
        <Link href="/fahrzeuge" className="link-arrow">
          {t('viewAll')}
          <Icon name="arrowRight" size={18} />
        </Link>
      </div>

      <ul ref={track} aria-label={t('listLabel')} className="snap-strip mt-10 pb-[var(--section-y)] lg:mt-12 lg:gap-8 lg:pb-16">
        {cards.map((v) => (
          <li key={v.id} className="w-[82vw] sm:w-[56vw] lg:w-[min(36vw,calc((100svh-400px)*1.333))]">
            <Link href={{ pathname: '/fahrzeuge/[slug]', params: { slug: v.slug } }} className="group block rounded-[4px] active:scale-[0.99]">
              <ViewTransition name={`car-${v.id}`} share="car-photo" default="none">
                <div className="relative aspect-[4/3] overflow-clip rounded-[4px] bg-panel">
                  {/* photo is 12 % wider than its frame so it can drift inside it */}
                  <div data-parallax className="absolute inset-y-0 -left-[6%] w-[112%]">
                    <CarImage
                      photo={v.cover}
                      alt={label.photoAlt(v, 1, v.photoCount)}
                      sizes="(min-width: 1024px) 45vw, (min-width: 640px) 63vw, 92vw"
                      className="h-full w-full"
                      imgClassName="transition-transform duration-700 ease-[var(--ease)] group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </ViewTransition>
              <div className="mt-5 grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1">
                <span className="mask-line">
                  <span data-line className="t-h3 block">
                    {vehicleName(v)}
                  </span>
                </span>
                <span className="mask-line row-span-2 self-start">
                  <span data-line className="t-price-s block">
                    {label.price(v.price)}
                  </span>
                </span>
                <span className="mask-line">
                  <span data-line className="tabular block text-[0.9375rem] text-ink-2">
                    {[v.firstRegistration, label.km(v.mileage), v.powerPs ? `${v.powerPs} PS` : null].filter(Boolean).join(' · ')}
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
