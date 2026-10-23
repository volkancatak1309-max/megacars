import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { currentAdmin } from '@/lib/supabase/server'
import { listVehicles } from '@/lib/admin/queries'
import { toCard } from '@/lib/inventory'
import { AdminList, type AdminRow } from '@/components/admin/AdminList'

export const dynamic = 'force-dynamic'

export default async function AdminHome({ params }: PageProps<'/[locale]/admin'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('admin.list')
  const admin = await currentAdmin()
  const vehicles = admin ? await listVehicles(admin.client, false) : []
  const rows: AdminRow[] = vehicles.map((v, i) => ({
    ...toCard(v, i),
    cover: v.photos[v.cover] ?? null,
    visible: v.visible,
    featured: v.featured,
    featuredOrder: v.featuredOrder,
  }))
  return (
    <div className="adm-page pg wide">
      <header className="adm-head">
        <h1 className="d-m">{t('title')}</h1>
        <p className="adm-count tabular">{t('count', { count: rows.length })}</p>
      </header>
      <AdminList rows={rows} locale={locale} />
    </div>
  )
}
