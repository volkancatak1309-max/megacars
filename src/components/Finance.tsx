import { useTranslation } from 'react-i18next'
import { CONTACT } from '../lib/contact'

// Finanzierung — honest, general language only. NO invented rates / installment
// tables / bank names.
const STEPS = ['s1', 's2', 's3'] as const

export default function Finance() {
  const { t } = useTranslation()
  const wa = `${CONTACT.whatsapp}?text=${encodeURIComponent('Hallo MEGACARS, ich interessiere mich für eine Finanzierung.')}`

  return (
    <article className="bg-bg">
      <section className="mx-auto max-w-[1000px] px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <p className="eyebrow text-muted">{t('finance.eyebrow')}</p>
        <h1
          className="display mt-5 text-text"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', textWrap: 'balance' }}
        >
          {t('finance.title')}
        </h1>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">{t('finance.intro')}</p>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 pb-20 md:px-10">
        <p className="eyebrow text-muted">{t('finance.howEyebrow')}</p>
        <div className="mt-10 grid gap-y-10 border-t border-border md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className="pt-8 lg:border-l lg:border-border lg:pl-8 lg:[&:first-child]:border-l-0 lg:[&:first-child]:pl-0"
            >
              <span className="spec text-[0.7rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-base font-medium text-text">{t(`finance.${s}t`)}</h3>
              <p className="mt-2.5 max-w-[28ch] text-sm leading-relaxed text-muted">{t(`finance.${s}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 pb-28 md:px-10">
        <div className="border-t border-border pt-12">
          <p className="max-w-[48ch] text-sm leading-relaxed text-muted">{t('finance.note')}</p>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-block rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-press"
          >
            {t('finance.cta')}
          </a>
        </div>
      </section>
    </article>
  )
}
