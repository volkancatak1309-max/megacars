import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ITEMS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={'shrink-0 transition-transform duration-300 ' + (open ? 'rotate-45' : '')}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

// FAQ — honest answers consistent with the rest of the site. No invented policy.
export default function Faq() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <article className="bg-bg">
      <section className="mx-auto max-w-[820px] px-6 pb-28 pt-28 md:px-10 md:pt-36">
        <p className="eyebrow text-muted">{t('faq.eyebrow')}</p>
        <h1 className="display mt-5 text-text" style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)' }}>
          {t('faq.title')}
        </h1>

        <div className="mt-12 border-t border-border">
          {ITEMS.map((q, i) => {
            const isOpen = open === i
            return (
              <div key={q} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-text"
                >
                  <span className="text-base font-medium md:text-lg">{t(`faq.${q}.q`)}</span>
                  <Chevron open={isOpen} />
                </button>
                {isOpen && (
                  <p className="max-w-[64ch] pb-7 text-sm leading-relaxed text-muted">
                    {t(`faq.${q}.a`)}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </article>
  )
}
