'use client'
import { useTransition } from 'react'
import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/i18n/navigation'
import { signOut } from '@/app/[locale]/(admin)/admin/actions'
import { Faces } from '@/components/site/Shutter'
import { Icon } from '@/components/ui/Icon'

const LANGS = [
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'tr', label: 'TR', name: 'Türkçe' },
] as const

/** Panel navigation: vehicles, archive, new vehicle, language, site, sign out. */
export function AdminNav({ locale, email }: { locale: string; email: string }) {
  const t = useTranslations('admin.nav')
  const pathname = usePathname()
  const [pending, start] = useTransition()
  const active = (href: string) => (pathname === href ? 'page' : undefined)
  return (
    <nav className="adm-nav" aria-label={t('label')}>
      <Link href="/admin" className="sh sh--text" aria-current={active('/admin')}>
        <Faces>{t('vehicles')}</Faces>
      </Link>
      <Link href="/admin/archiv" className="sh sh--text" aria-current={active('/admin/archiv')}>
        <Faces>{t('archive')}</Faces>
      </Link>
      <Link href="/admin/neu" className="sh sh--solid sh--sm adm-nav-new" aria-current={active('/admin/neu')}>
        <Faces>
          <Icon name="plus" size={15} />
          {t('new')}
        </Faces>
      </Link>
      <span className="adm-nav-tools">
        <span className="adm-lang" aria-label={t('language')}>
          {LANGS.map((l) => (
            <Link key={l.code} href={pathname as '/admin'} locale={l.code} hrefLang={l.code} lang={l.code} aria-current={l.code === locale ? 'true' : undefined} className="sh sh--text">
              <Faces>{l.label}</Faces>
              <span className="sr-only"> {l.name}</span>
            </Link>
          ))}
        </span>
        <a href={`/${locale}`} className="sh sh--text" target="_blank" rel="noopener">
          <Faces>{t('site')}</Faces>
        </a>
        <button type="button" className="sh sh--line sh--sm" onClick={() => start(() => signOut(locale))} disabled={pending} title={email}>
          <Faces>{t('logout')}</Faces>
        </button>
      </span>
    </nav>
  )
}
