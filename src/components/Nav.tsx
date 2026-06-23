import { useTranslation } from 'react-i18next'
import ThemeToggle from './ThemeToggle'
import LangToggle from './LangToggle'
import { goSection, go } from '../lib/router'

// Fixed top nav with solid background so scrolling content never bleeds through.
export default function Nav() {
  const { t } = useTranslation()
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        
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
          
            href="#inventory"
            onClick={(e) => {
              e.preventDefault()
              goSection('inventory')
            }}
            className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.inventory')}
          </a>
          
            href="#/ueber-uns"
            onClick={(e) => {
              e.preventDefault()
              go('#/ueber-uns')
            }}
            className="spec text-[0.72rem] text-text/75 transition-colors hover:text-text"
          >
            {t('nav.about')}
          </a>
          
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
