import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { hasSupabase } from '@/lib/supabase/env'
import { Logo } from '@/components/brand/Logo'
import { LoginForm } from '@/components/admin/LoginForm'

// the panel speaks German and Turkish; proxy.ts sends /en/admin to /de/admin
export function generateStaticParams() {
  return [{ locale: 'de' }, { locale: 'tr' }]
}
export const dynamicParams = false

export default async function LoginPage({ params }: PageProps<'/[locale]/admin/login'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('admin.login')
  return (
    <main className="adm-login">
      <div className="adm-login-card">
        <div className="adm-login-brand">
          <Logo sizes="158px" />
        </div>
        <h1 className="d-s">{t('title')}</h1>
        <p className="adm-login-lead">{t('lead')}</p>
        <LoginForm locale={locale} connected={hasSupabase()} />
      </div>
    </main>
  )
}
