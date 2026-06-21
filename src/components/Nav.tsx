import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { goSection, go } from '../lib/router'

// Thin, transparent top nav over the hero (DESIGN.md §4).
export default function Nav() {
  const { t } = useTranslation()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault()
            goSection('top')
          }}
          className="display text-lg leading-none text-text"
        >
          MEGACARS
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#inventory"
            onClick={(e) => {
              e.preventDefault()
              goSection('inventory')
            }}
            className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.inventory')}
          </a>
          <a
            href="#/ueber-uns"
            onClick={(e) => {
              e.preventDefault()
              go('#/ueber-uns')
            }}
            className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.about')}
          </a>
          <a
            href="#/kontakt"
            onClick={(e) => {
              e.preventDefault()
              go('#/kontakt')
            }}
            className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.contact')}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <LangToggle />
          <span className="h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
