import { getTranslations } from 'next-intl/server'
import { mailHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { DrawLine, RevealText } from '@/components/motion/Reveal'

/**
 * Only services that are confirmed today. Financing, trade-in, leasing and maintenance
 * stay off the page until Mega Cars confirms them (KARAR-DEFTERI: "teyit bekliyor").
 */
export async function Services() {
  const t = await getTranslations('services')
  const tc = await getTranslations('common')

  const rows = [
    { title: t('visitTitle'), text: t('visitText'), link: t('visitLink'), href: '#standort', external: false },
    { title: t('driveTitle'), text: t('driveText'), link: t('driveLink'), href: whatsappHref(tc('whatsappTestDriveGeneric')), external: true },
    { title: t('adviceTitle'), text: t('adviceText'), link: t('adviceLink'), href: mailHref, external: false },
  ]

  return (
    <section aria-labelledby="services-title" className="section-y bg-hall">
      <div className="container-max page-x">
        <RevealText id="services-title" className="t-h2 max-w-[24ch]">
          {t('title')}
        </RevealText>
        <ul className="mt-12 lg:mt-16">
          {rows.map((row) => (
            <li key={row.title}>
              <DrawLine />
              <div className="grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-6 lg:py-10">
                <RevealText as="h3" className="t-h3 md:col-span-3">
                  {row.title}
                </RevealText>
                <RevealText as="p" className="t-lead text-ink-2 md:col-span-6">
                  {row.text}
                </RevealText>
                <div className="md:col-span-3 md:justify-self-end">
                  <a
                    href={row.href}
                    {...(row.external ? { target: '_blank', rel: 'noopener' } : {})}
                    className="link-arrow"
                  >
                    {row.link}
                    <Icon name="arrowRight" size={18} />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <DrawLine />
      </div>
    </section>
  )
}
