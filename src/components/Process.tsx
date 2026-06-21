import { useRef } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Custom minimal line icons (ARSENAL: no cartoon).
const STEPS: { k: string; icon: ReactNode }[] = [
  {
    k: 's1',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M8.4 12.3l2.4 2.4 4.8-5.2" />
      </>
    ),
  },
  {
    k: 's2',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.4V12l3 1.8" />
      </>
    ),
  },
  {
    k: 's3',
    icon: (
      <>
        <path d="M12 3.2l6.6 2.4v5c0 4.2-2.9 7.1-6.6 8.2-3.7-1.1-6.6-4-6.6-8.2v-5z" />
        <path d="M9 11.6l2 2 4-4" />
      </>
    ),
  },
  {
    k: 's4',
    icon: (
      <>
        <path d="M3 6.5h9.5v8.5H3z" />
        <path d="M12.5 9.5h4l3 3v2.5h-7z" />
        <circle cx="7" cy="16.8" r="1.7" />
        <circle cx="16.6" cy="16.8" r="1.7" />
      </>
    ),
  },
]

export default function Process() {
  const { t } = useTranslation()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.proc-step', {
        autoAlpha: 0,
        y: 22,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: 'top 78%', once: true },
      })
    },
    { scope: root },
  )

  return (
    <section id="ablauf" ref={root} className="bg-bg px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-14 max-w-[640px]">
          <p className="eyebrow text-muted">{t('process.eyebrow')}</p>
          <h2 className="display mt-4 text-text" style={{ fontSize: 'clamp(2rem, 4vw, 3.6rem)' }}>
            {t('process.title')}
          </h2>
        </header>

        <div className="grid gap-y-12 border-t border-border md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.k}
              className="proc-step pt-8 lg:border-l lg:border-border lg:pl-8 lg:[&:first-child]:border-l-0 lg:[&:first-child]:pl-0"
            >
              <div className="flex items-center justify-between">
                <span className="spec text-[0.7rem] text-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-text/80">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </span>
              </div>
              <h3 className="mt-6 text-base font-medium leading-snug text-text">
                {t(`process.${s.k}.t`)}
              </h3>
              <p className="mt-2.5 max-w-[26ch] text-sm leading-relaxed text-muted">
                {t(`process.${s.k}.d`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
