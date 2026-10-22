import { getTranslations } from 'next-intl/server'
import { SITE, mailHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { DrawGroup, RiseHeading } from '@/components/motion/Reveal'
import { MobileActionBar } from './MobileActionBar'

/**
 * Temporary page for sections that follow in FAZ 4B: the page title and the real
 * contact data from BRIEF.md only — no placeholder text, no "coming soon".
 */
export async function InfoPage({ title, imprint = false }: { title: string; imprint?: boolean }) {
  const t = await getTranslations('info')
  const tc = await getTranslations('common')

  const rows = [
    ...(imprint
      ? [
          { label: t('imprintCompany'), value: SITE.legalName },
          { label: t('imprintOwner'), value: SITE.owner },
          { label: t('imprintRegister'), value: `${SITE.register}, ${SITE.court}` },
        ]
      : []),
    { label: t('address'), value: `${SITE.street}, ${SITE.zip} ${SITE.city}, ${SITE.region}` },
    { label: t('phone'), value: SITE.phone, href: SITE.phoneHref },
    { label: t('email'), value: SITE.email, href: mailHref },
    { label: t('hours'), value: `${t('weekdays')} 08:00–18:00 · ${t('saturday')} 09:00–15:00` },
  ]

  return (
    <div className="pt-[var(--header-h)]">
      <section className="container-max page-x py-[var(--section-y)]">
        <RiseHeading className="t-h1">{title}</RiseHeading>
        <p className="t-lead mt-6">{t('reach')}</p>
        <dl className="mt-10 max-w-3xl border-b border-line">
          {rows.map((r) => (
            <DrawGroup key={r.label} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="t-label pt-0.5">{r.label}</dt>
                <dd className="tabular text-ink">
                  {'href' in r && r.href ? (
                    <a href={r.href} className="transition-colors duration-300 hover:text-ink-2">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
            </DrawGroup>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={SITE.phoneHref} className="btn btn-primary">
            <Icon name="phone" size={18} />
            {tc('call')}
          </a>
          <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" className="btn btn-secondary">
            <Icon name="whatsapp" size={18} />
            {tc('whatsappWrite')}
          </a>
          <a href={mailHref} className="btn btn-secondary">
            <Icon name="mail" size={18} />
            {tc('email')}
          </a>
        </div>
      </section>
      <MobileActionBar />
    </div>
  )
}
