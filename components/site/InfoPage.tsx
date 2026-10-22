import { getTranslations } from 'next-intl/server'
import { SITE, mailHref, routeHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { DrawGroup } from '@/components/motion/Reveal'
import { ActionBar } from './ActionBar'
import { Chars } from './Loader'
import { ShutterA } from './Shutter'

/**
 * Interim page (stage 2 brings the content and forms): the page title set large and the
 * real contact data from BRIEF.md only — no placeholder text, no "coming soon".
 */
export async function InfoPage({ title, lead, imprint = false }: { title: string; lead: string; imprint?: boolean }) {
  const t = await getTranslations('info')
  const tc = await getTranslations('common')
  const tl = await getTranslations('location')

  const rows = [
    ...(imprint
      ? [
          { label: t('imprintCompany'), value: SITE.legalName },
          { label: t('imprintOwner'), value: SITE.owner },
          { label: t('imprintRegister'), value: `${SITE.register}, ${SITE.court}` },
        ]
      : []),
    { label: t('address'), value: `${SITE.street}, ${SITE.zip} ${SITE.city}, ${SITE.region}`, href: routeHref, ext: true },
    { label: t('phone'), value: SITE.phone, href: SITE.phoneHref },
    { label: t('email'), value: SITE.email, href: mailHref },
    { label: t('hours'), value: `${tl('weekdays')} 08:00–18:00 · ${tl('saturday')} 09:00–15:00` },
  ]

  return (
    <>
      <section className="ip s-night">
        <div className="pg wide">
          <h1 className="ip-title">
            <Chars text={title} />
          </h1>
          <p className="ip-lead lead fade-up">{lead}</p>
          <dl className="ip-rows">
            {rows.map((r) => (
              <DrawGroup key={r.label}>
                <dt>{r.label}</dt>
                <dd className="tabular">
                  {'href' in r && r.href ? (
                    <ShutterA href={r.href} kind="text" {...('ext' in r && r.ext ? { target: '_blank', rel: 'noopener' } : {})}>
                      {r.value}
                    </ShutterA>
                  ) : (
                    r.value
                  )}
                </dd>
              </DrawGroup>
            ))}
          </dl>
          <div className="ip-ctas">
            <ShutterA href={SITE.phoneHref} kind="solid">
              <Icon name="phone" size={18} />
              {tc('call')}
            </ShutterA>
            <ShutterA href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" kind="line">
              <Icon name="whatsapp" size={18} />
              {tc('whatsappWrite')}
            </ShutterA>
            <ShutterA href={mailHref} kind="line">
              <Icon name="mail" size={18} />
              {tc('email')}
            </ShutterA>
          </div>
        </div>
      </section>
      <ActionBar />
    </>
  )
}
