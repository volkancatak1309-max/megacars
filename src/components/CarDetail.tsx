import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Car } from '../lib/cars'
import { carYear } from '../lib/cars'
import { CONTACT } from '../lib/contact'
import { go } from '../lib/router'
import { useMagnetic } from '../hooks/useMagnetic'
import Counter from './Counter'

// Equipment chips parsed from the dealer's own `aciklama` (real data, not invented).
// First "/"|"|" segment is the model repeat → dropped; the rest are feature tokens.
function parseEquipment(aciklama: string): string[] {
  const parts = aciklama
    .split(/[/|]+/)
    .map((s) => s.trim())
    .filter(Boolean)
  return [...new Set(parts.slice(1).filter((p) => p.length > 1 && p.length <= 24))]
}

function Icon({ d, label }: { d: string; label: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-label={label}>
      <path d={d} />
    </svg>
  )
}

export default function CarDetail({ car }: { car: Car }) {
  const { t } = useTranslation()
  const photos = car.fotograflar.map((p) => '/' + p)
  const [idx, setIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const equip = parseEquipment(car.aciklama)
  const reserveRef = useMagnetic<HTMLAnchorElement>(0.4)
  const testRef = useMagnetic<HTMLAnchorElement>(0.4)

  // Go back to the collection at the exact scroll position the user left from.
  // history.back() replays the same path as the browser back button.
  const goBack = () => {
    if (window.history.length > 1) window.history.back()
    else window.location.hash = ''
  }

  const next = () => setIdx((i) => (i + 1) % photos.length)
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length)

  useEffect(() => {
    setIdx(0)
    setLightbox(false)
  }, [car.id])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, photos.length])

  const priceFmt = `€${car.fiyat.toLocaleString('de-DE')}`
  const waReserve = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hallo MEGACARS, ich möchte den ${car.marka} ${car.model} (${priceFmt}) reservieren.`,
  )}`
  const waTest = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hallo MEGACARS, ich möchte eine Probefahrt für den ${car.marka} ${car.model} vereinbaren.`,
  )}`

  const plainNum = (n: number) => String(Math.round(n))
  const deNum = (n: number) => Math.round(n).toLocaleString('de-DE')
  const stats: { label: string; value: number; format: (n: number) => string }[] = [
    { label: t('detail.year'), value: carYear(car), format: plainNum },
    { label: t('detail.km'), value: car.km, format: deNum },
    { label: t('detail.ps'), value: car.guc_ps, format: plainNum },
  ]
  const specs: [string, string][] = [
    [t('detail.spec.marke'), car.marka],
    [t('detail.spec.modell'), car.model],
    [t('detail.spec.erstzulassung'), car.yil],
    [t('detail.spec.km'), `${car.km.toLocaleString('de-DE')} km`],
    [t('detail.spec.leistung'), `${car.guc_ps} PS (${car.guc_kw} kW)`],
    [t('detail.spec.kraftstoff'), car.yakit],
    [t('detail.spec.getriebe'), car.vites],
  ]

  return (
    <article className="bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 pt-28 md:px-10 md:pt-32">
        <button
          type="button"
          onClick={goBack}
          className="spec mb-8 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-text"
        >
          ← {t('detail.back')}
        </button>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          {/* gallery */}
          <div>
            <button
              type="button"
              onClick={() => setLightbox(true)}
              aria-label={t('detail.zoom')}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-surface focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <img
                src={photos[idx]}
                alt={`${car.marka} ${car.model} — ${idx + 1}/${photos.length}`}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <span className="spec absolute bottom-3 right-3 bg-bg/70 px-2 py-1 text-[0.58rem] text-text">
                {idx + 1}/{photos.length}
              </span>
            </button>

            <div className="mt-3 grid grid-cols-5 gap-3">
              {photos.map((p, i) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`${t('detail.photo')} ${i + 1}`}
                  aria-current={i === idx}
                  className={
                    'aspect-[4/3] overflow-hidden bg-surface transition-opacity ' +
                    (i === idx ? 'outline outline-2 outline-accent' : 'opacity-55 hover:opacity-100')
                  }
                >
                  <img src={p} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* sticky buy rail */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h1
              data-split
              className="display text-text"
              style={{ fontSize: 'clamp(1.8rem, 3vw, 3rem)' }}
            >
              {car.marka} {car.model}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">{car.aciklama}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-5">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="spec text-[0.6rem] text-faint">{s.label}</div>
                  <div className="spec mt-1 text-base text-text">
                    <Counter value={s.value} format={s.format} trigger="view" />
                  </div>
                </div>
              ))}
            </div>

            <p className="display mt-6 text-accent" style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)' }}>
              €<Counter value={car.fiyat} format={deNum} trigger="view" />
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                ref={reserveRef}
                href={waReserve}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fill rounded-[2px] bg-accent px-7 py-3.5 text-center text-sm font-medium text-accent-fg"
              >
                {t('detail.reserve')}
              </a>
              <a
                ref={testRef}
                href={waTest}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] border border-border px-7 py-3.5 text-center text-sm text-text transition-colors hover:border-text/50"
              >
                {t('detail.testdrive')}
              </a>
            </div>

            <p className="spec mt-5 text-[0.62rem] text-muted">{t('detail.trust')}</p>
            <a
              href="#/finanzierung"
              onClick={(e) => {
                e.preventDefault()
                go('#/finanzierung')
              }}
              className="link-underline spec mt-2 inline-block text-[0.62rem] text-accent transition-colors hover:text-accent-press"
            >
              {t('detail.finance')} →
            </a>
          </aside>
        </div>
      </div>

      {/* sections */}
      <div className="mx-auto max-w-[1000px] px-6 py-24 md:px-10 md:py-32">
        <section className="text-center">
          <h2 className="display text-text" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
            {t('detail.specsTitle')}
          </h2>
          <dl className="mx-auto mt-10 max-w-[640px] divide-y divide-border text-left">
            {specs.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-3.5">
                <dt className="spec text-[0.66rem] text-muted">{k}</dt>
                <dd className="text-sm text-text">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mx-auto mt-8 max-w-[640px] text-left text-sm leading-relaxed text-muted">
            {car.aciklama}
          </p>
        </section>

        {equip.length > 0 && (
          <section className="mt-24 text-center">
            <h2 className="display text-text" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
              {t('detail.equipTitle')}
            </h2>
            <div className="mx-auto mt-10 flex max-w-[720px] flex-wrap justify-center gap-2.5">
              {equip.map((e) => (
                <span key={e} className="spec border border-border px-3 py-1.5 text-[0.66rem] text-text">
                  {e}
                </span>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20 text-center">
          <button
            type="button"
            onClick={goBack}
            className="spec border border-border px-6 py-3 text-xs text-text transition-colors hover:border-text/50"
          >
            ← {t('detail.back')}
          </button>
        </div>
      </div>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={photos[idx]}
            alt={`${car.marka} ${car.model} — ${idx + 1}/${photos.length}`}
            className="max-h-[88vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Schließen"
            className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white"
          >
            <Icon d="M6 6l12 12M18 6L6 18" label="close" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            aria-label="Zurück"
            className="absolute left-4 text-white/80 transition-colors hover:text-white md:left-8"
          >
            <Icon d="M15 5l-7 7 7 7" label="prev" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            aria-label="Weiter"
            className="absolute right-4 text-white/80 transition-colors hover:text-white md:right-8"
          >
            <Icon d="M9 5l7 7-7 7" label="next" />
          </button>
          <span className="spec absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/70">
            {idx + 1}/{photos.length}
          </span>
        </div>
      )}
    </article>
  )
}
