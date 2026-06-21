import { useTranslation } from 'react-i18next'
import { CONTACT } from '../lib/contact'
import { goSection, go } from '../lib/router'

// Footer with REAL contact links (target of nav "Über uns"/"Kontakt").
export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer
      id="footer"
      className="scroll-mt-24 border-t border-border bg-bg px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              goSection('top')
            }}
            className="display text-2xl text-text"
          >
            MEGACARS
          </a>
          <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">{t('footer.about')}</p>
        </div>

        <div>
          <p className="eyebrow mb-4 text-faint">{t('footer.contact')}</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={CONTACT.tel} className="text-text transition-colors hover:text-accent">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={CONTACT.mailto} className="text-text transition-colors hover:text-accent">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text transition-colors hover:text-accent"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-faint">{t('footer.explore')}</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="#inventory"
                onClick={(e) => {
                  e.preventDefault()
                  goSection('inventory')
                }}
                className="text-text transition-colors hover:text-accent"
              >
                {t('nav.inventory')}
              </a>
            </li>
            <li>
              <a
                href="#/ueber-uns"
                onClick={(e) => {
                  e.preventDefault()
                  go('#/ueber-uns')
                }}
                className="text-text transition-colors hover:text-accent"
              >
                {t('nav.about')}
              </a>
            </li>
            <li>
              <a
                href="#/kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  go('#/kontakt')
                }}
                className="text-text transition-colors hover:text-accent"
              >
                {t('nav.contact')}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappBeratung}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text transition-colors hover:text-accent"
              >
                {t('hero.book')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-faint">{t('footer.service')}</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href="#/finanzierung"
                onClick={(e) => {
                  e.preventDefault()
                  go('#/finanzierung')
                }}
                className="text-text transition-colors hover:text-accent"
              >
                {t('nav.finance')}
              </a>
            </li>
            <li>
              <a
                href="#/inzahlungnahme"
                onClick={(e) => {
                  e.preventDefault()
                  go('#/inzahlungnahme')
                }}
                className="text-text transition-colors hover:text-accent"
              >
                {t('nav.tradein')}
              </a>
            </li>
            <li>
              <a
                href="#/faq"
                onClick={(e) => {
                  e.preventDefault()
                  go('#/faq')
                }}
                className="text-text transition-colors hover:text-accent"
              >
                {t('nav.faq')}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
        <p className="spec text-[0.62rem] text-faint">© 2026 MEGACARS · {t('footer.rights')}</p>
        <div className="spec flex flex-wrap gap-x-5 gap-y-2 text-[0.62rem]">
          <a
            href="#/impressum"
            onClick={(e) => {
              e.preventDefault()
              go('#/impressum')
            }}
            className="text-faint transition-colors hover:text-text"
          >
            {t('footer.impressum')}
          </a>
          <a
            href="#/datenschutz"
            onClick={(e) => {
              e.preventDefault()
              go('#/datenschutz')
            }}
            className="text-faint transition-colors hover:text-text"
          >
            {t('footer.datenschutz')}
          </a>
          <a
            href="#/agb"
            onClick={(e) => {
              e.preventDefault()
              go('#/agb')
            }}
            className="text-faint transition-colors hover:text-text"
          >
            {t('footer.agb')}
          </a>
        </div>
      </div>
    </footer>
  )
}
