import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Locale } from '@/i18n/routing'
import { currentAdmin } from '@/lib/supabase/server'
import { listVehicles } from '@/lib/admin/queries'
import { ArchiveList, type ArchiveRow } from '@/components/admin/ArchiveList'

export const dynamic = 'force-dynamic'

export default async function ArchivePage({ params }: PageProps<'/[locale]/admin/archiv'>) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations('admin.archive')
  const admin = await currentAdmin()
  const vehicles = admin ? await listVehicles(admin.client, true) : []
  const rows: ArchiveRow[] = vehicles.map((v) => ({
    id: v.id,
    make: v.make,
    model: v.model,
    version: v.version,
    price: v.price,
    firstRegistration: v.firstRegistration,
    cover: v.photos[v.cover] ?? null,
    photoCount: v.photos.length,
    archivedAt: v.archivedAt ?? v.updatedAt,
  }))
  return (
    <div className="adm-page pg wide">
      <header className="adm-head">
        <h1 className="d-m">{t('title')}</h1>
        <p className="lead">{t('lead')}</p>
      </header>
      <ArchiveList rows={rows} locale={locale} />
    </div>
  )
}
