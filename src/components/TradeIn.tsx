import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT } from '../lib/contact'

// Inzahlungnahme — process + a simple form that prefills WhatsApp with the
// entered data. NO invented valuation figures / guarantees.
const STEPS = ['s1', 's2', 's3'] as const

export default function TradeIn() {
  const { t } = useTranslation()
  const [marke, setMarke] = useState('')
  const [modell, setModell] = useState('')
  const [jahr, setJahr] = useState('')
  const [km, setKm] = useState('')

  const field =
    'w-full rounded-[2px] border border-border bg-surface px-4 py-3 text-sm text-text placeholder:text-faint focus:border-accent focus:outline-none'

  return (
    <article className="bg-bg">
      <section className="mx-auto max-w-[1100px] px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <p className="eyebrow text-muted">{t('tradein.eyebrow')}</p>
        <h1
          className="display mt-5 text-text"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', textWrap: 'balance' }}
        >
          {t('tradein.title')}
        </h1>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">{t('tradein.intro')}</p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* steps */}
          <div>
            <p className="eyebrow text-muted">{t('tradein.howEyebrow')}</p>
            <div className="mt-8 space-y-8">
              {STEPS.map((s, i) => (
                <div key={s} className="flex gap-5 border-t border-border pt-6">
                  <span className="spec text-[0.7rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-base font-medium text-text">{t(`tradein.${s}t`)}</h3>
                    <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-muted">{t(`tradein.${s}d`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* form → WhatsApp prefill */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              const text = `Inzahlungnahme-Anfrage:\nMarke: ${marke}\nModell: ${modell}\nJahr: ${jahr}\nKilometerstand: ${km}`
              window.open(`${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
            }}
          >
            <input className={field} placeholder={t('tradein.fMarke')} aria-label={t('tradein.fMarke')} value={marke} onChange={(e) => setMarke(e.target.value)} required />
            <input className={field} placeholder={t('tradein.fModell')} aria-label={t('tradein.fModell')} value={modell} onChange={(e) => setModell(e.target.value)} required />
            <div className="grid grid-cols-2 gap-4">
              <input className={field} placeholder={t('tradein.fJahr')} aria-label={t('tradein.fJahr')} value={jahr} onChange={(e) => setJahr(e.target.value)} inputMode="numeric" required />
              <input className={field} placeholder={t('tradein.fKm')} aria-label={t('tradein.fKm')} value={km} onChange={(e) => setKm(e.target.value)} inputMode="numeric" required />
            </div>
            <button type="submit" className="rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-press">
              {t('tradein.cta')}
            </button>
            <p className="spec text-[0.6rem] text-faint">{t('tradein.note')}</p>
          </form>
        </div>
      </section>
    </article>
  )
}
