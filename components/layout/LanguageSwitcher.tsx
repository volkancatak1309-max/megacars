'use client'
import { useState, type MouseEvent } from 'react'
import { useParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'

type Href = Parameters<typeof Link>[0]['href']

/**
 * DE · TR segmented control. The indicator slides to the chosen language (t-2) before the
 * same page opens in that language; the choice is kept in the NEXT_LOCALE cookie.
 */
export function LanguageSwitcher({ variant = 'segmented', onNavigate }: { variant?: 'segmented' | 'list'; onNavigate?: () => void }) {
  const locale = useLocale() as Locale
  const t = useTranslations('lang')
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const [active, setActive] = useState<Locale>(locale)
  const { locale: _ignored, ...routeParams } = params as Record<string, string>
  const href = { pathname, params: routeParams } as unknown as Href

  const go = (e: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    if (target === locale) return
    setActive(target)
    const query = Object.fromEntries(new URLSearchParams(window.location.search))
    const delay = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 320
    window.setTimeout(() => {
      onNavigate?.()
      router.replace({ ...(href as object), query } as unknown as Parameters<typeof router.replace>[0], { locale: target, scroll: false })
    }, delay)
  }

  if (variant === 'list') {
    return (
      <ul className="grid gap-1" aria-label={t('label')}>
        {routing.locales.map((l) => (
          <li key={l}>
            <Link
              href={href}
              locale={l}
              hrefLang={l}
              lang={l}
              onClick={(e) => go(e, l)}
              aria-current={l === locale ? 'true' : undefined}
              className="flex min-h-11 items-center gap-3 text-ink-2 aria-[current]:text-ink"
            >
              <span
                aria-hidden="true"
                className={`grid size-4 place-items-center rounded-full border transition-colors duration-300 ${l === active ? 'border-signal' : 'border-line-strong'}`}
              >
                <span className={`size-2 rounded-full bg-signal transition-transform duration-300 ${l === active ? 'scale-100' : 'scale-0'}`} />
              </span>
              {t(l)}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  const index = routing.locales.indexOf(active)
  return (
    <nav aria-label={t('label')} className="relative h-10 rounded-full border border-line p-1">
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-panel transition-transform duration-[450ms] ease-[var(--ease)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      />
      <ul className="relative grid h-full grid-cols-2">
        {routing.locales.map((l) => (
          <li key={l} className="relative">
            <Link
              href={href}
              locale={l}
              hrefLang={l}
              lang={l}
              onClick={(e) => go(e, l)}
              aria-label={t('switchTo', { language: t(l) })}
              aria-current={l === locale ? 'true' : undefined}
              className={`grid h-full min-w-11 place-items-center rounded-full px-3 text-[0.8125rem] font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${l === active ? 'text-ink' : 'text-ink-3 hover:text-ink-2'}`}
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
