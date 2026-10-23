import { getTranslations, setRequestLocale } from 'next-intl/server'
import { redirect } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { currentAdmin } from '@/lib/supabase/server'
import { Logo } from '@/components/brand/Logo'
import { AdminNav } from '@/components/admin/AdminNav'

/** Every page behind this layout needs a signed-in administrator (proxy.ts checks first). */
export default async function PanelLayout({ children, params }: LayoutProps<'/[locale]/admin'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const admin = await currentAdmin()
  if (!admin) {
    redirect({ href: '/admin/login', locale: locale as Locale })
    return null
  }
  const t = await getTranslations('admin')
  return (
    <>
      <header className="adm-bar">
        <div className="adm-bar-in">
          <span className="adm-brand" aria-label={t('title')}>
            <Logo layout="mark" tone="dark" />
            <span className="adm-brand-word">{t('title')}</span>
          </span>
          <AdminNav locale={locale} email={admin.user.email ?? ''} />
        </div>
      </header>
      <main id="main" className="adm-main">
        {children}
      </main>
    </>
  )
}
