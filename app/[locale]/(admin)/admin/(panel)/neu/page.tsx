import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { currentAdmin } from '@/lib/supabase/server'
import { knownMakesAndModels } from '@/lib/admin/queries'
import { VehicleForm } from '@/components/admin/VehicleForm'

export const dynamic = 'force-dynamic'

export default async function NewVehiclePage({ params }: PageProps<'/[locale]/admin/neu'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('admin.form')
  const admin = await currentAdmin()
  const known = admin ? await knownMakesAndModels(admin.client) : { makes: [], models: {} }
  return (
    <div className="adm-page pg wide">
      <header className="adm-head">
        <h1 className="d-m">{t('newTitle')}</h1>
      </header>
      <VehicleForm locale={locale} vehicle={null} known={known} />
    </div>
  )
}
