'use client'
import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import type { Spin } from '@/lib/types'
import { mountSpin } from './mountSpin'

const frameUrls = (id: string, spin: Spin, size: number) =>
  Array.from({ length: spin.frames }, (_, i) => `/spin/${id}/${spin.version}/${size}/${String(i).padStart(3, '0')}.webp`)

/**
 * 360° showroom (DESIGN.md §10). Rendered only when the vehicle has spin data; the first
 * frame is a server-rendered <img> (the page's LCP), the canvas viewer takes over after it.
 */
export function SpinViewer({ id, spin, name }: { id: string; spin: Spin; name: string }) {
  const t = useTranslations('spin')
  const ref = useRef<HTMLDivElement>(null)
  const large = Math.max(...spin.sizes)
  const smallSize = Math.min(...spin.sizes)
  const frames = frameUrls(id, spin, large)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return mountSpin(el, {
      frames,
      framesSmall: smallSize !== large ? frameUrls(id, spin, smallSize) : undefined,
      cameraDirection: spin.cameraDirection,
      degPerFrame: spin.angleStep,
      labels: { left: t('left'), right: t('right'), fullscreen: t('fullscreen'), hint: t('hint') },
    })
    // frames derive from props that do not change for a mounted vehicle page
  }, [id, spin.version])

  return (
    <figure>
      <div
        ref={ref}
        tabIndex={0}
        role="group"
        aria-roledescription="360°"
        aria-label={t('label', { name })}
        className="mcs relative aspect-[4/3] overflow-clip bg-hall lg:aspect-[16/10]"
      >
        <img src={frames[0]} alt="" fetchPriority="high" className="mcs-poster absolute inset-0 h-full w-full object-cover" />
      </div>
      <figcaption className="label" style={{ marginTop: 12 }}>
        {t('note')}
      </figcaption>
    </figure>
  )
}
