import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SITE, mailHref, whatsappHref } from '@/lib/site'
import { Icon } from '@/components/ui/Icon'
import { FooterWordmark } from './FooterWordmark'

export async function Footer() {
  const t = await getTranslations('footer')
  const tn = await getTranslations('nav')
  const tc = await getTranslations('common')
  const tl = await getTranslations('location')

  return (
    <footer className="border-t border-line bg-night pb-[calc(var(--bar-h)+env(safe-area-inset-bottom))] lg:pb-0">
      <div className="container-max page-x pt-16 lg:pt-24">
        <p className="t-h3 measure max-w-[30ch] font-normal text-ink">{t('statement')}</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr] lg:gap-16">
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact" className="t-label mb-4">
              {t('contact')}
            </h2>
            <ul className="grid gap-2 text-ink-2">
              <li>
                <a href={SITE.phoneHref} className="tabular inline-flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-ink">
                  <Icon name="phone" size={18} />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={whatsappHref(tc('whatsappGeneric'))} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-ink">
                  <Icon name="whatsapp" size={18} />
                  {tc('whatsappWrite')}
                </a>
              </li>
              <li>
                <a href={mailHref} className="inline-flex min-h-11 items-center gap-3 transition-colors duration-300 hover:text-ink">
                  <Icon name="mail" size={18} />
                  {SITE.email}
                </a>
              </li>
              <li className="inline-flex items-start gap-3 pt-2">
                <Icon name="mapPin" size={18} className="mt-1 shrink-0" />
                <span>
                  {SITE.street}
                  <br />
                  {SITE.zip} {SITE.city}, {SITE.region}
                </span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="footer-hours">
            <h2 id="footer-hours" className="t-label mb-4">
              {t('hours')}
            </h2>
            <dl className="tabular grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-ink-2">
              <dt>{tl('weekdays')}</dt>
              <dd>08:00–18:00</dd>
              <dt>{tl('saturday')}</dt>
              <dd>09:00–15:00</dd>
              <dt>{tl('sunday')}</dt>
              <dd>{tl('closed')}</dd>
            </dl>
          </section>

          <section aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="t-label mb-4">
              {t('legal')}
            </h2>
            <ul className="grid gap-1 text-ink-2">
              <li>
                <Link href="/impressum" className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-ink">
                  {tn('imprint')}
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-ink">
                  {tn('privacy')}
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <FooterWordmark />

      <div className="container-max page-x flex flex-wrap items-center justify-between gap-4 border-t border-line py-6 text-[0.8125rem] text-ink-3">
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        <a href={SITE.galzura} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-ink-2">
          {t('website')}
        </a>
      </div>
    </footer>
  )
}
