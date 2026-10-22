'use client'
import { useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { osmEmbedHref } from '@/lib/site'
import { gsap, useGSAP, MOTION_OK } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'

export interface MapData {
  viewBox: string
  pin: { x: number; y: number }
  layers: Record<'water' | 'minor' | 'street' | 'major' | 'rail', string>
}

/**
 * DSGVO-friendly map: a static drawing of the surrounding streets (built once from
 * OpenStreetMap data) — nothing is requested from a third party until the visitor
 * clicks "Karte laden".
 */
export function MapPreview({ map }: { map: MapData }) {
  const t = useTranslations('location')
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [vw, vh] = map.viewBox.split(' ').slice(2).map(Number)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION_OK, () => {
        const paths = ref.current!.querySelectorAll('[data-draw]')
        gsap.fromTo(
          paths,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } },
        )
        gsap.from('[data-pin]', { scale: 0.6, autoAlpha: 0, duration: 0.7, delay: 0.6, scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
      })
    },
    { scope: ref, dependencies: [loaded] },
  )

  const line = { pathLength: 1, strokeDasharray: '1 1', 'data-draw': true } as const

  return (
    <div ref={ref} className="relative aspect-[16/10] overflow-clip rounded-[4px] border border-line bg-hall">
      {loaded ? (
        <iframe src={osmEmbedHref} title={t('mapTitle')} className="absolute inset-0 h-full w-full border-0" loading="lazy" />
      ) : (
        <>
          <svg viewBox={map.viewBox} role="img" aria-label={t('mapPreviewLabel')} className="map-lines absolute inset-0 h-full w-full">
            <path d={map.layers.water} stroke="oklch(0.42 0.03 240)" strokeWidth={3} {...line} />
            <path d={map.layers.minor} stroke="var(--color-line)" strokeWidth={1.6} {...line} />
            <path d={map.layers.street} stroke="var(--color-line-strong)" strokeWidth={2.6} {...line} />
            <path d={map.layers.major} stroke="var(--color-ink-3)" strokeWidth={5} {...line} />
            <path d={map.layers.rail} stroke="var(--color-ink-3)" strokeWidth={2} strokeDasharray="6 10" />
          </svg>
          <span
            data-pin
            aria-hidden="true"
            className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center"
            style={{ left: `${(map.pin.x / vw) * 100}%`, top: `${(map.pin.y / vh) * 100}%` }}
          >
            <span className="absolute size-10 rounded-full bg-signal-12" />
            <span className="size-3.5 rounded-full border-2 border-night bg-signal" />
            <span className="absolute top-6 whitespace-nowrap rounded-full bg-night px-3 py-1 text-[0.8125rem] font-medium text-ink">Mega Cars</span>
          </span>
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 bg-gradient-to-t from-night/90 to-transparent p-4 sm:p-5">
            <button type="button" onClick={() => setLoaded(true)} className="btn btn-secondary btn-sm bg-night">
              <Icon name="mapPin" size={16} />
              {t('loadMap')}
            </button>
            <p className="max-w-[36ch] text-[0.8125rem] text-ink-2">{t('mapNote')}</p>
          </div>
        </>
      )}
      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener"
        className="absolute top-2 right-2 rounded-full bg-night/80 px-2.5 py-1 text-[0.75rem] text-ink-2"
      >
        © OpenStreetMap
      </a>
    </div>
  )
}
