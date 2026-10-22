'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { EMPTY_FILTERS, matches, toSearchParams, type CardVehicle, type FilterOptions, type Filters } from '@/lib/filter'
import { formatPrice } from '@/lib/format'
import { gsap } from '@/lib/gsap'
import { Icon } from '@/components/ui/Icon'
import { Magnetic } from '@/components/ui/Magnetic'
import { Stagger } from '@/components/motion/Reveal'

type QuickVehicle = Pick<CardVehicle, 'makeSlug' | 'price' | 'mileage' | 'firstRegistrationKey' | 'fuel' | 'transmission' | 'body'>

/** Marke · Preis bis · Karosserie with a live, real result count (DESIGN.md §8.1 #2). */
export function QuickSearch({ vehicles, options }: { vehicles: QuickVehicle[]; options: FilterOptions }) {
  const t = useTranslations('quickSearch')
  const tv = useTranslations('vehicle')
  const tl = useTranslations('list')
  const locale = useLocale()
  const [f, setF] = useState<Filters>(EMPTY_FILTERS)
  const count = useMemo(() => vehicles.filter((v) => matches(v, f)).length, [vehicles, f])
  const [shown, setShown] = useState(count)
  const tween = useRef<gsap.core.Tween | null>(null)

  // the number in the button rolls to its new value (t-2)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(count)
      return
    }
    const state = { n: shown }
    tween.current?.kill()
    tween.current = gsap.to(state, { n: count, duration: 0.45, snap: { n: 1 }, onUpdate: () => setShown(state.n) })
    return () => {
      tween.current?.kill()
    }
  }, [count])

  const countWith = (patch: Partial<Filters>, ignore: keyof Filters) =>
    vehicles.filter((v) => matches(v, { ...f, ...patch }, ignore as never)).length

  const query = Object.fromEntries(toSearchParams(f))

  return (
    <section aria-labelledby="quick-search-title" className="relative border-b border-line bg-hall">
      <Stagger className="container-max page-x py-10 lg:py-14">
        <h2 id="quick-search-title" data-stagger className="t-h3 font-normal">
          {t('title')}
        </h2>
        <form
          className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="field" data-stagger>
            <label htmlFor="qs-make" className="field-label">
              {t('make')}
            </label>
            <select
              id="qs-make"
              className="field-control"
              value={f.make ?? ''}
              onChange={(e) => setF({ ...f, make: e.target.value || null })}
            >
              <option value="">{t('allMakes')}</option>
              {options.makes.map((m) => {
                const n = countWith({ make: m.value }, 'make')
                return (
                  <option key={m.value} value={m.value} disabled={n === 0}>
                    {tl('optionCount', { label: m.label, count: n })}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="field" data-stagger>
            <label htmlFor="qs-price" className="field-label">
              {t('priceMax')}
            </label>
            <select
              id="qs-price"
              className="field-control tabular"
              value={f.priceMax ?? ''}
              onChange={(e) => setF({ ...f, priceMax: e.target.value ? Number(e.target.value) : null })}
            >
              <option value="">{t('anyPrice')}</option>
              {options.priceTo.map((p) => {
                const n = countWith({ priceMax: p }, 'priceMax')
                return (
                  <option key={p} value={p} disabled={n === 0}>
                    {tl('optionCount', { label: tl('upToPrice', { value: formatPrice(p, locale) }), count: n })}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="field" data-stagger>
            <label htmlFor="qs-body" className="field-label">
              {t('body')}
            </label>
            <select
              id="qs-body"
              className="field-control"
              value={f.body ?? ''}
              onChange={(e) => setF({ ...f, body: (e.target.value || null) as Filters['body'] })}
            >
              <option value="">{t('allBodies')}</option>
              {options.bodies.map((b) => {
                const n = countWith({ body: b }, 'body')
                return (
                  <option key={b} value={b} disabled={n === 0}>
                    {tl('optionCount', { label: tv(`bodyValues.${b}`), count: n })}
                  </option>
                )
              })}
            </select>
          </div>
          <div data-stagger className="md:col-span-2 lg:col-span-1">
            <Magnetic>
              <Link
                href={{ pathname: '/fahrzeuge', query }}
                className="btn btn-primary tabular w-full lg:w-auto"
                aria-disabled={count === 0 || undefined}
              >
                {t('submit', { count: shown })}
                <Icon name="arrowRight" size={18} />
              </Link>
            </Magnetic>
          </div>
        </form>
        <p className="sr-only" aria-live="polite">
          {tl('found', { count })}
        </p>
      </Stagger>
    </section>
  )
}
