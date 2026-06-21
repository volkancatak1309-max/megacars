import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cars, FACETS, matchesSelection, emptySelection } from '../lib/cars'
import type { FacetKey, Lang, Selection } from '../lib/cars'
import CarCard from './CarCard'

gsap.registerPlugin(ScrollTrigger)

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={'transition-transform duration-300 ' + (open ? 'rotate-180' : '')}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Inventory — DESIGN.md §5. Left filter rail (Farfetch) + dense grid (New Balance).
export default function Inventory() {
  const { t, i18n } = useTranslation()
  const lang = ((i18n.resolvedLanguage ?? 'de').slice(0, 2) === 'tr' ? 'tr' : 'de') as Lang
  const root = useRef<HTMLElement>(null)

  const [sel, setSel] = useState<Selection>(emptySelection)
  const [open, setOpen] = useState<Record<FacetKey, boolean>>({
    marke: true,
    preis: true,
    jahr: false,
    km: false,
    kraftstoff: true,
    karosserie: false,
  })

  const filtered = useMemo(() => cars.filter((c) => matchesSelection(c, sel)), [sel])
  const activeCount = Object.values(sel).reduce((n, a) => n + a.length, 0)

  const toggle = (key: FacetKey, value: string) =>
    setSel((s) => ({
      ...s,
      [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value],
    }))
  const clear = () => setSel(emptySelection())

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.inv-head', {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.inv-head', start: 'top 88%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section
      id="inventory"
      ref={root}
      className="scroll-mt-24 bg-bg px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <header className="inv-head mb-12 border-b border-border pb-8">
          <p className="eyebrow text-muted">{t('inventory.eyebrow')}</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-text" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
              {t('inventory.title')}
            </h2>
            <span className="spec text-sm text-muted">
              {t('inventory.count', { count: filtered.length })}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-12">
          {/* filter rail */}
          <aside className="lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:pr-2">
            <div className="flex items-center justify-between pb-2">
              <span className="spec text-xs text-text">{t('inventory.filters')}</span>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="spec text-[0.62rem] text-muted underline-offset-4 transition-colors hover:text-text hover:underline"
                >
                  {t('inventory.reset')}
                </button>
              )}
            </div>

            {FACETS.map((f) => (
              <div key={f.key} className="border-t border-border py-4">
                <button
                  type="button"
                  onClick={() => setOpen((o) => ({ ...o, [f.key]: !o[f.key] }))}
                  className="flex w-full items-center justify-between text-text"
                  aria-expanded={open[f.key]}
                >
                  <span className="spec text-xs">{t('filter.' + f.key)}</span>
                  <Chevron open={open[f.key]} />
                </button>
                {open[f.key] && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {f.options.map((o) => {
                      const active = sel[f.key].includes(o.value)
                      return (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => toggle(f.key, o.value)}
                          aria-pressed={active}
                          className={
                            'spec border px-2.5 py-1.5 text-[0.62rem] transition-colors ' +
                            (active
                              ? 'border-accent bg-accent text-accent-fg'
                              : 'border-border text-muted hover:border-text/40 hover:text-text')
                          }
                        >
                          {o.label[lang]}{' '}
                          <span className={active ? 'opacity-70' : 'text-faint'}>{o.count}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* sticky result count (DESIGN.md §5) */}
            <div className="sticky bottom-0 mt-2 border-t border-border bg-bg py-4">
              <span className="spec text-xs text-text">
                {t('inventory.count', { count: filtered.length })}
              </span>
            </div>
          </aside>

          {/* dense grid */}
          <div>
            {filtered.length === 0 ? (
              <p className="py-24 text-center text-muted">{t('inventory.empty')}</p>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
