'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { EMPTY_FILTERS, matches, toSearchParams, type CardVehicle, type FilterOptions, type Filters } from '@/lib/filter'
import { formatPrice } from '@/lib/format'
import { loadMotion, REDUCED } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { LinesUp } from '@/components/site/Reveals'
import { ShutterLink } from '@/components/site/Shutter'
import { Stagger } from '@/components/motion/Reveal'

type QuickVehicle = Pick<CardVehicle, 'makeSlug' | 'price' | 'mileage' | 'firstRegistrationKey' | 'fuel' | 'transmission' | 'body'>

/**
 * Marke · Preis bis · Karosserie as three large fields and a live, real result count.
 * Each field is a native select laid over its large value, so keyboards, screen readers
 * and phones get the system picker; the count in the button rolls to its new value.
 */
export function QuickSearch({ vehicles, options }: { vehicles: QuickVehicle[]; options: Pick<FilterOptions, 'makes' | 'priceTo' | 'bodies'> }) {
  const t = useTranslations('quickSearch')
  const tv = useTranslations('vehicle')
  const tl = useTranslations('list')
  const locale = useLocale()
  const [f, setF] = useState<Filters>(EMPTY_FILTERS)
  const count = useMemo(() => vehicles.filter((v) => matches(v, f)).length, [vehicles, f])
  const [shown, setShown] = useState(count)
  const tween = useRef<{ kill: () => void } | null>(null)

  useEffect(() => {
    if (matchMedia(REDUCED).matches) {
      setShown(count)
      return
    }
    let cancelled = false
    const state = { n: shown }
    tween.current?.kill()
    loadMotion().then(({ gsap }) => {
      if (!cancelled) tween.current = gsap.to(state, { n: count, duration: 0.6, snap: { n: 1 }, ease: 'power3.out', onUpdate: () => setShown(state.n) })
    })
    return () => {
      cancelled = true
      tween.current?.kill()
    }
    // `shown` is the tween's start value only
  }, [count])

  const countWith = (patch: Partial<Filters>, ignore: keyof Filters) => vehicles.filter((v) => matches(v, { ...f, ...patch }, ignore as never)).length
  const query = Object.fromEntries(toSearchParams(f))

  const makeLabel = f.make ? (options.makes.find((m) => m.value === f.make)?.label ?? t('all')) : t('all')
  const priceLabel = f.priceMax ? tl('upToPrice', { value: formatPrice(f.priceMax, locale) }) : t('anyPrice')
  const bodyLabel = f.body ? tv(`bodyValues.${f.body}`) : t('all')

  const field = (id: string, label: string, value: string, control: React.ReactNode) => (
    <div className="qs-field" data-stagger>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <span className="qs-value" aria-hidden="true">
        <span>{value}</span>
        <Icon name="chevronDown" size={22} />
      </span>
      {control}
    </div>
  )

  return (
    <section className="qs s-night" aria-labelledby="qs-title">
      <div className="pg wide">
        <LinesUp id="qs-title" className="qs-title d-m">
          {t('title')}
        </LinesUp>
        <Stagger as="form" className="qs-form" start="top 92%">
          {field(
            'qs-make',
            t('make'),
            makeLabel,
            <select id="qs-make" value={f.make ?? ''} onChange={(e) => setF({ ...f, make: e.target.value || null })}>
              <option value="">{t('allMakes')}</option>
              {options.makes.map((m) => {
                const n = countWith({ make: m.value }, 'make')
                return (
                  <option key={m.value} value={m.value} disabled={n === 0}>
                    {tl('optionCount', { label: m.label, count: n })}
                  </option>
                )
              })}
            </select>,
          )}
          {field(
            'qs-price',
            t('priceMax'),
            priceLabel,
            <select id="qs-price" value={f.priceMax ?? ''} onChange={(e) => setF({ ...f, priceMax: e.target.value ? Number(e.target.value) : null })}>
              <option value="">{t('anyPrice')}</option>
              {options.priceTo.map((p) => {
                const n = countWith({ priceMax: p }, 'priceMax')
                return (
                  <option key={p} value={p} disabled={n === 0}>
                    {tl('optionCount', { label: tl('upToPrice', { value: formatPrice(p, locale) }), count: n })}
                  </option>
                )
              })}
            </select>,
          )}
          {field(
            'qs-body',
            t('body'),
            bodyLabel,
            <select id="qs-body" value={f.body ?? ''} onChange={(e) => setF({ ...f, body: (e.target.value || null) as Filters['body'] })}>
              <option value="">{t('allBodies')}</option>
              {options.bodies.map((b) => {
                const n = countWith({ body: b }, 'body')
                return (
                  <option key={b} value={b} disabled={n === 0}>
                    {tl('optionCount', { label: tv(`bodyValues.${b}`), count: n })}
                  </option>
                )
              })}
            </select>,
          )}
          <div className="qs-submit" data-stagger>
            <ShutterLink href={{ pathname: '/fahrzeuge', query }} kind="solid" aria-disabled={count === 0 ? 'true' : undefined}>
              <span className="tabular">{t('submit', { count: shown })}</span>
              <Icon name="arrowRight" size={18} />
            </ShutterLink>
          </div>
        </Stagger>
        <p className="sr-only" aria-live="polite">
          {tl('found', { count })}
        </p>
      </div>
    </section>
  )
}
