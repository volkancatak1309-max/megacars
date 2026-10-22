'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CarImage } from '@/components/ui/CarImage'
import { Icon } from '@/components/ui/Icon'
import { ShutterButton, ShutterLink } from './Shutter'
import type { ProtoCar } from './data'

const DURATION = 6500
const reduced = () => typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// characters on the longest line and number of lines once the name wraps
// advance widths (em) of Archivo 900 at 'wdth' 62, measured in the browser
const EM: Record<string, number> = {
  ' ': 0.105, '-': 0.235, '.': 0.217, I: 0.258, '1': 0.366, '7': 0.391, F: 0.397,
  M: 0.7, W: 0.724, A: 0.525, G: 0.538, O: 0.549, Q: 0.549, N: 0.513, H: 0.508, C: 0.508,
}
const em = (text: string) => [...text.toUpperCase()].reduce((sum, ch) => sum + (EM[ch] ?? (/[0-9]/.test(ch) ? 0.44 : 0.5)), 0)

/** --w: width of the longest line in em, --l: number of lines (short names stay on one line) */
const size = (model: string) => {
  const words = model.split(' ')
  if (model.length <= 9 || words.length === 1) return { w: em(model), l: 1 }
  let w = em(model)
  for (let k = 1; k < words.length; k++) {
    w = Math.min(w, Math.max(em(words.slice(0, k).join(' ')), em(words.slice(k).join(' '))))
  }
  return { w, l: 2 }
}

/**
 * Yön A hero: a slideshow of the dealer's real cars. Giant model names roll out and in
 * line by line; the framed photo opens in two bands from the right while it settles
 * (Animmaster Sliders 19, "modular slider"). Auto-advance pauses on hover, focus and
 * with the pause button (WCAG 2.2.2); reduced motion: no autoplay, no slide motion.
 */
export function RossoHero({
  cars,
  labels,
}: {
  cars: ProtoCar[]
  labels: { kicker: string; cta: string; next: string; prev: string; pause: string; play: string; slideOf: string[] }
}) {
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const layers = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const n = cars.length

  const go = useCallback(
    (to: number) => {
      setPrev(i)
      setI(((to % n) + n) % n)
    },
    [i, n],
  )

  useEffect(() => {
    if (reduced()) setPlaying(false)
  }, [])

  useEffect(() => {
    if (!playing || held) return
    const id = window.setTimeout(() => go(i + 1), DURATION)
    return () => window.clearTimeout(id)
  }, [i, playing, held, go])

  useEffect(() => {
    if (prev === null) return
    const id = window.setTimeout(() => setPrev(null), 1100)
    return () => window.clearTimeout(id)
  }, [prev, i])

  // the new photo opens in two bands from the right edge and settles from 1.3 to 1
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const root = layers.current
    if (!root) return
    const car = cars[i]
    const layer = document.createElement('div')
    layer.className = 'ra-layer'
    const srcset = [`${car.cover.src240} 240w`, car.cover.src800 && `${car.cover.src800} 800w`, `${car.cover.src} ${car.cover.width}w`].filter(Boolean).join(', ')
    const halves = ['top', 'bottom'].map((pos) => {
      const half = document.createElement('div')
      half.className = `ra-half ra-half-${pos}`
      const img = document.createElement('img')
      img.src = car.cover.src
      img.srcset = srcset
      img.sizes = '(min-width: 1024px) 52vw, 100vw'
      img.alt = ''
      half.appendChild(img)
      layer.appendChild(half)
      return { half, img }
    })
    root.appendChild(layer)
    if (reduced()) {
      ;[...root.querySelectorAll('.ra-layer')].slice(0, -1).forEach((l) => l.remove())
      return
    }
    const ease = 'cubic-bezier(0.16, 1, 0.3, 1)'
    halves.forEach(({ half, img }, k) => {
      half.animate(
        [{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' }, { clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' }],
        { duration: 1500, delay: k * 140, easing: ease, fill: 'both' },
      )
      img.animate([{ transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 1700, delay: k * 140, easing: ease, fill: 'both' })
    })
    const old = [...root.querySelectorAll('.ra-layer')].slice(0, -2)
    window.setTimeout(() => old.forEach((l) => l.remove()), 1800)
  }, [i, cars])

  const car = cars[i]
  const name = (k: number, out = false) => {
    const c = cars[k]
    const s = size(c.model)
    return (
      <p key={`${k}-${out}`} className={`ra-name${out ? ' is-out' : ''}`} style={{ ['--w' as string]: s.w, ['--l' as string]: s.l }} aria-hidden={out || undefined}>
        {c.model.split(' ').map((word, j, all) => (
          <span key={j} className="mline">
            <span style={{ ['--i' as string]: j }}>
              {word}
              {j < all.length - 1 ? ' ' : ''}
            </span>
          </span>
        ))}
      </p>
    )
  }

  return (
    <section
      className="ra-hero"
      aria-roledescription="carousel"
      aria-label={labels.kicker}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="ra-hero-in pg">
        <div className="ra-copy">
          <p className="ra-kicker">{labels.kicker}</p>
          <p className="ra-make" key={`m-${i}`}>
            <span className="mline">
              <span>{car.make}</span>
            </span>
          </p>
          <div className="ra-names" aria-live={playing ? 'off' : 'polite'}>
            {prev !== null && name(prev, true)}
            {name(i)}
          </div>
          <div className="ra-meta" key={`x-${i}`}>
            <p className="ra-price tabular">{car.price}</p>
            <p className="ra-chain tabular">{[car.version, car.chain].filter(Boolean).join(' · ')}</p>
          </div>
          <div className="ra-actions">
            <ShutterLink href={{ pathname: '/prototyp/a/[slug]', params: { slug: car.slug } }} kind="solid">
              {labels.cta}
              <Icon name="arrowRight" size={18} />
            </ShutterLink>
          </div>
        </div>

        <div className="ra-stage" data-cursor>
          <div ref={layers} className="ra-frame">
            <div className="ra-layer">
              <CarImage photo={cars[0].cover} alt={cars[0].alt} sizes="(min-width: 1024px) 52vw, 100vw" priority className="h-full w-full" />
            </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {car.alt}
          </p>
        </div>

        <div className="ra-controls">
          <p className="ra-count tabular" aria-label={labels.slideOf[i]}>
            <span>{String(i + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}
          </p>
          <div className="ra-progress" aria-hidden="true">
            {cars.map((c, k) => (
              <span key={c.id} className={k < i ? 'is-done' : k === i ? 'is-now' : ''} data-run={(playing && !held) || undefined}>
                <i key={`${k}-${i}`} />
              </span>
            ))}
          </div>
          <div className="ra-buttons">
            <ShutterButton kind="line" className="ra-round" aria-label={labels.prev} onClick={() => go(i - 1)}>
              <Icon name="chevronLeft" size={18} />
            </ShutterButton>
            <ShutterButton kind="line" className="ra-round" aria-label={labels.next} onClick={() => go(i + 1)}>
              <Icon name="chevronRight" size={18} />
            </ShutterButton>
            <ShutterButton kind="line" className="ra-round" aria-label={playing ? labels.pause : labels.play} onClick={() => setPlaying((p) => !p)}>
              <Icon name={playing ? 'pause' : 'play'} size={14} />
            </ShutterButton>
          </div>
        </div>
      </div>
    </section>
  )
}
