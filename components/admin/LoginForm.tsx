'use client'
import { useActionState } from 'react'
import { useTranslations } from 'next-intl'
import { signIn, type LoginState } from '@/app/[locale]/(admin)/admin/actions'
import { Faces } from '@/components/site/Shutter'

export function LoginForm({ locale, connected }: { locale: string; connected: boolean }) {
  const t = useTranslations('admin.login')
  const [state, action, pending] = useActionState<LoginState, FormData>(signIn, { error: null })
  const error = !connected ? 'noConnection' : state.error
  return (
    <form action={action} className="adm-form" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="field">
        <label htmlFor="email" className="field-label">
          {t('email')}
        </label>
        <input id="email" name="email" type="email" autoComplete="username" inputMode="email" required className="field-control" />
      </div>
      <div className="field">
        <label htmlFor="password" className="field-label">
          {t('password')}
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field-control" />
      </div>
      {error && (
        <p className="field-error adm-alert" role="alert">
          {t(error)}
        </p>
      )}
      <button type="submit" className="sh sh--solid sh--wide" disabled={pending || !connected} aria-busy={pending}>
        <Faces>{pending ? t('pending') : t('submit')}</Faces>
      </button>
    </form>
  )
}
