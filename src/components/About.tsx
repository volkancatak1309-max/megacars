import { useTranslation } from 'react-i18next'
import { carStats } from '../lib/cars'
import { CONTACT } from '../lib/contact'
import { go } from '../lib/router'

// About — only verified facts (name, address, AutoScout24, real counts).
// NO invented founding year / years-of-experience / staff numbers.
export default function About() {
  const { t } = useTranslation()

  const facts: [string | number, string][] = [
    [carStats.total, t('about.factsVehicles')],
    [carStats.brands, t('about.factsBrands')],
    ['Hohenems', t('about.factsLocation')],
    ['AutoScout24', t('about.factsListed')],
  ]
  const values = ['v1', 'v2', 'v3'] as const

  return (
    <article className="bg-bg">
      <section className="mx-auto max-w-[1000px] px-6 pb-20 pt-28 md:px-10 md:pt-36">
        <p className="eyebrow text-muted">{t('about.eyebrow')}</p>
        <h1
          className="display mt-5 text-text"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)', textWrap: 'balance' }}
        >
          {t('about.title')}
        </h1>
        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-muted">{t('about.intro')}</p>
      </section>

      <section className="border-y border-border bg-surface px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-8 md:grid-cols-4">
          {facts.map(([v, l]) => (
            <div key={l}>
              <div
                className="font-display text-text"
                style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2.1rem)', fontVariationSettings: '"wght" 700, "wdth" 100', letterSpacing: '-0.01em' }}
              >
                {v}
              </div>
              <div className="spec mt-2 text-[0.62rem] text-muted">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 py-24 md:px-10">
        <p className="eyebrow text-muted">{t('about.valuesEyebrow')}</p>
        <div className="mt-10 grid gap-12 md:grid-cols-3">
          {values.map((v) => (
            <div key={v}>
              <h3 className="text-lg font-medium text-text">{t(`about.${v}t`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`about.${v}d`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 pb-28 md:px-10">
        <div className="border-t border-border pt-12">
          <p className="eyebrow text-muted">{t('about.locationEyebrow')}</p>
          <p className="mt-4 text-xl font-medium text-text md:text-2xl">{CONTACT.addressFull}</p>
          <a
            href="#/kontakt"
            onClick={(e) => {
              e.preventDefault()
              go('#/kontakt')
            }}
            className="mt-8 inline-block rounded-[2px] bg-accent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-press"
          >
            {t('about.cta')}
          </a>
        </div>
      </section>
    </article>
  )
}
