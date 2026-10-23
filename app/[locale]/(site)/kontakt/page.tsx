import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import map from '@/data/map.json'
import type { Locale } from '@/i18n/routing'
import { getCards, statsOf } from '@/lib/inventory'
import { BUILDING_PHOTO, SHOWROOM_PHOTO } from '@/lib/dealer-photos'
import { formatPrice } from '@/lib/format'
import { autoDealerLd, breadcrumbLd, localizedUrl, pageMeta } from '@/lib/seo'
import { SITE, mailHref, routeHref, whatsappHref } from '@/lib/site'
import { JsonLd } from '@/components/ui/JsonLd'
import { Icon } from '@/components/ui/Icon'
import { CarImage } from '@/components/ui/CarImage'
import { DrawGroup, Ticker } from '@/components/motion/Reveal'
import { LocationSection } from '@/components/home/Sections'
import type { MapData } from '@/components/home/MapPreview'
import { ActionBar } from '@/components/site/ActionBar'
import { PageHero } from '@/components/site/PageHero'
import { RequestForm, type FormField } from '@/components/site/RequestForm'
import { BlockReveal, ClipReveal, LinesUp } from '@/components/site/Reveals'
import { ShutterA } from '@/components/site/Shutter'
import { Chars } from '@/components/site/Loader'

type Props = PageProps<'/[locale]/kontakt'>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  return pageMeta({ locale: locale as Locale, href: '/kontakt', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params
  const locale = raw as Locale
  setRequestLocale(locale)
  const t = await getTranslations('contactPage')
  const tl = await getTranslations('location')
  const tc = await getTranslations('common')
  const tn = await getTranslations('nav')
  const tt = await getTranslations('trust')
  const tf = await getTranslations('form')

  const cards = await getCards()
  const stats = statsOf(cards)
  const makes = new Set(cards.map((v) => v.makeSlug)).size
  const fields: FormField[] = [
    {
      name: 'topic',
      kind: 'choice',
      options: [
        { value: 'vehicle', label: tf('contact.topicVehicle') },
        { value: 'testDrive', label: tf('contact.topicTestDrive') },
        { value: 'other', label: tf('contact.topicOther') },
      ],
    },
    { name: 'name', kind: 'text', required: true, autoComplete: 'name', half: true },
    { name: 'phone', kind: 'tel', autoComplete: 'tel', half: true },
    { name: 'email', kind: 'email', autoComplete: 'email' },
    { name: 'message', kind: 'textarea', required: true },
  ]

  return (
    <>
      <JsonLd data={autoDealerLd(locale)} />
      <JsonLd
        data={breadcrumbLd([
          { name: tn('home'), url: localizedUrl('/', locale) },
          { name: tn('contact'), url: localizedUrl('/kontakt', locale) },
        ])}
      />

      <PageHero word={t('word')} title={t('title')} lead={t('lead')}>
        <ul className="ct-lines">
          <li>
            <span className="label">{t('phoneLabel')}</span>
            <a href={SITE.phoneHref} className="ct-big tabular" aria-label={tn('callAria')}>
              {SITE.phone}
            </a>
          </li>
          <li>
            <span className="label">{t('whatsappLabel')}</span>
            <ShutterA href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" kind="text" className="ct-mid">
              <Icon name="whatsapp" size={22} />
              {tc('whatsappWrite')}
            </ShutterA>
          </li>
          <li>
            <span className="label">{t('emailLabel')}</span>
            <ShutterA href={mailHref} kind="text" className="ct-mid">
              <Icon name="mail" size={22} />
              {SITE.email}
            </ShutterA>
          </li>
        </ul>
        <dl className="ip-rows">
          <DrawGroup>
            <dt>{t('addressLabel')}</dt>
            <dd>
              <ShutterA href={routeHref} target="_blank" rel="noopener" kind="text">
                {SITE.street}, {SITE.zip} {SITE.city}
              </ShutterA>
            </dd>
          </DrawGroup>
          <DrawGroup>
            <dt>{t('hoursLabel')}</dt>
            <dd className="tabular ct-hours">
              <span>
                {tl('weekdays')} 08:00–18:00
              </span>
              <span>
                {tl('saturday')} 09:00–15:00
              </span>
              <span>
                {tl('sunday')} {tl('closed')}
              </span>
            </dd>
          </DrawGroup>
        </dl>
      </PageHero>

      <section className="rf-section s-red" aria-label={tf('contact.title')}>
        <div className="rf-grid pg wide">
          <div className="rf-aside">
            <p className="rf-aside-word" aria-hidden="true">
              <Chars text={t('formWord')} />
            </p>
            <p className="lead">{t('formLead')}</p>
          </div>
          <RequestForm kind="contact" fields={fields} />
        </div>
      </section>

      <section className="abt s-bone" aria-labelledby="abt-title">
        <div className="pg wide">
          <p className="abt-word" aria-hidden="true">
            {t('aboutWord')}
          </p>
          <LinesUp id="abt-title" className="abt-title d-l">
            {t('aboutTitle')}
          </LinesUp>
          <div className="abt-grid">
            <ClipReveal className="abt-photo">
              <CarImage photo={SHOWROOM_PHOTO} alt={tt('photoAlt')} sizes="(min-width: 1024px) 46vw, 100vw" className="aspect-[4/3] h-full w-full" />
            </ClipReveal>
            <div className="abt-text">
              <BlockReveal className="lead abt-lead">{t('aboutText1')}</BlockReveal>
              <p>{t('aboutText2')}</p>
              <figure className="abt-motto">
                <figcaption className="label">{t('mottoIntro')}</figcaption>
                {/* only the page language on the page (Volkan, 23.10.2026): EN/TR show the translation */}
                {locale === 'de' ? <blockquote>„… Autos zu Top Preisen. Auch für die kleine Geldtasche.“</blockquote> : <blockquote>{t('mottoTranslation')}</blockquote>}
              </figure>
              <dl className="abt-facts">
                <DrawGroup>
                  <dt>{t('ownerLabel')}</dt>
                  <dd>{SITE.owner}</dd>
                </DrawGroup>
                <DrawGroup>
                  <dt>{t('registerLabel')}</dt>
                  <dd>
                    {SITE.legalName}
                    <span>
                      {SITE.register} · {tc('court')}
                    </span>
                  </dd>
                </DrawGroup>
                <DrawGroup>
                  <dt>{t('stockLabel')}</dt>
                  <dd>
                    <Ticker value={stats.count} locale={locale} className="abt-count" />
                    {stats.count > 0 && <span className="tabular">{t('stockValue', { makes, min: formatPrice(stats.min, locale), max: formatPrice(stats.max, locale) })}</span>}
                  </dd>
                </DrawGroup>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <LocationSection map={map as MapData} building={BUILDING_PHOTO} />
      <ActionBar />
    </>
  )
}
