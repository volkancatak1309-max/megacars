'use client'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { osmEmbedHref } from '@/lib/site'
import { useMotion, MOTION_OK } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { ShutterButton } from '@/components/site/Shutter'

export interface MapData {
  viewBox: string
  pin: { x: number; y: number }
  src: string
}

/**
 * DSGVO-friendly map: a static drawing of the surrounding streets (built once from
 * OpenStreetMap data, served from this site) — nothing is requested from a third party
 * until the visitor clicks "Karte laden". The drawing is inlined when it comes near the
 * viewport so its streets can draw themselves in.
 */
export function MapPreview({ map }: { map: MapData }) {
  const t = useTranslations('location')
  const [loaded, setLoaded] = useState(false)
  const [inline, setInline] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [vw, vh] = map.viewBox.split(' ').slice(2).map(Number)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        fetch(map.src)
          .then((r) => (r.ok ? r.text() : Promise.reject()))
          .then(setInline)
          .catch(() => {})
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [map.src])

  useMotion(
    ({ gsap }) => {
      if (loaded || !inline) return
      gsap.matchMedia().add(MOTION_OK, () => {
        if (ref.current!.getBoundingClientRect().top < window.innerHeight * 0.8) return
        gsap.fromTo(
          ref.current!.querySelectorAll('[data-draw]'),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.4, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } },
        )
        gsap.from('.map-pin', { scale: 0.6, autoAlpha: 0, duration: 0.7, delay: 0.6, scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } })
      })
    },
    ref,
    [loaded, inline],
  )

  return (
    <div ref={ref} className="map">
      {loaded ? (
        <iframe src={osmEmbedHref} title={t('mapTitle')} className="absolute inset-0 h-full w-full border-0" loading="lazy" />
      ) : (
        <>
          <div role="img" aria-label={t('mapPreviewLabel')} className="absolute inset-0">
            {inline ? (
              <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: inline }} />
            ) : (
              <img src={map.src} alt="" width={vw} height={vh} loading="lazy" className="h-full w-full" />
            )}
          </div>
          <span className="map-pin" aria-hidden="true" style={{ left: `${(map.pin.x / vw) * 100}%`, top: `${(map.pin.y / vh) * 100}%` }}>
            <i />
            <b>Mega Cars</b>
          </span>
          <div className="map-bar">
            <ShutterButton kind="solid" className="sh--sm" onClick={() => setLoaded(true)}>
              <Icon name="mapPin" size={16} />
              {t('loadMap')}
            </ShutterButton>
            <p>{t('mapNote')}</p>
          </div>
        </>
      )}
      <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener" className="map-osm">
        © OpenStreetMap
      </a>
    </div>
  )
}
