import { getTranslations, setRequestLocale } from 'next-intl/server'
import { redirect } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import { currentAdmin } from '@/lib/supabase/server'
import { getVehicleById, knownMakesAndModels } from '@/lib/admin/queries'
import { VehicleForm } from '@/components/admin/VehicleForm'

export const dynamic = 'force-dynamic'

export default async function EditVehiclePage({ params }: PageProps<'/[locale]/admin/[id]'>) {
  const { locale, id } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('admin.form')
  const admin = await currentAdmin()
  const vehicle = admin && /^[0-9a-f-]{36}$/i.test(id) ? await getVehicleById(admin.client, id) : null
  if (!admin || !vehicle) {
    redirect({ href: '/admin', locale: locale as Locale })
    return null
  }
  const known = await knownMakesAndModels(admin.client)
  return (
    <div className="adm-page pg wide">
      <header className="adm-head">
        <h1 className="d-m">{t('editTitle')}</h1>
        <p className="adm-sub">
          {vehicle.make} {vehicle.model}
          {vehicle.version ? ` ${vehicle.version}` : ''}
        </p>
      </header>
      <VehicleForm locale={locale} vehicle={vehicle} known={known} />
    </div>
  )
}
