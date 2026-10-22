import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { RiseHeading } from '@/components/motion/Reveal'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <section className="container-max page-x flex min-h-[70svh] flex-col justify-center pt-[var(--header-h)] pb-[var(--section-y)]">
      <RiseHeading className="t-h1 max-w-[20ch]">{t('title')}</RiseHeading>
      <p className="t-lead mt-6">{t('lead')}</p>
      <Link href="/fahrzeuge" className="btn btn-primary mt-10 self-start">
        {t('cta')}
        <Icon name="arrowRight" size={18} />
      </Link>
    </section>
  )
}
