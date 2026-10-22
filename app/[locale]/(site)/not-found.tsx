import { getTranslations } from 'next-intl/server'
import { Icon } from '@/components/ui/Icon'
import { ShutterLink } from '@/components/site/Shutter'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <section className="nf s-night pg wide">
      <p className="nf-code" aria-hidden="true">
        404
      </p>
      <h1 className="nf-title d-l">{t('title')}</h1>
      <p className="lead" style={{ marginTop: 20 }}>
        {t('lead')}
      </p>
      <ShutterLink href="/fahrzeuge" kind="solid">
        {t('cta')}
        <Icon name="arrowRight" size={18} />
      </ShutterLink>
    </section>
  )
}
