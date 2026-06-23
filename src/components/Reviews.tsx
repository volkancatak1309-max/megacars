import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { carStats } from '../lib/cars'
import { CONTACT } from '../lib/contact'
import { useReveal } from '../hooks/useReveal'

// Trust card — NO invented reviews/ratings/names. Only the verifiable fact that
// every car is publicly listed on AutoScout24, plus a link to the dealer profile.
export default function Reviews() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useReveal(root)

  return (
    <section id="bewertungen" ref={root} className="bg-surface px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[820px] text-center">
        <p className="reveal eyebrow text-muted">{t('reviews.eyebrow')}</p>

        <div className="reveal mx-auto mt-8 border border-border bg-bg p-10 md:p-14">
          <span className="spec text-[0.7rem] tracking-[0.2em] text-faint">AutoScout24</span>
          <h2
            data-nosplit
            className="display mx-auto mt-5 max-w-[18ch] text-text"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)' }}
          >
            {t('reviews.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-[44ch] text-sm leading-relaxed text-muted">
            {t('reviews.sub', { count: carStats.total })}
          </p>
          <a
            href={CONTACT.autoscout24}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-[2px] border border-border px-7 py-3.5 text-sm text-text transition-colors hover:border-text/50"
          >
            {t('reviews.cta')} →
          </a>
        </div>
      </div>
    </section>
  )
}
