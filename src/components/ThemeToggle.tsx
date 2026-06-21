import { useTranslation } from 'react-i18next'
import { useTheme } from '../theme/ThemeProvider'

// Single-button light/dark toggle. Custom minimal SVG (ARSENAL: no cartoon icons).
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t('theme.toLight') : t('theme.toDark')}
      title={isDark ? t('theme.toLight') : t('theme.toDark')}
      className="grid h-9 w-9 place-items-center rounded-[2px] border border-border text-text transition-colors hover:border-text/40"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.1" />
          <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.93 4.93l1.7 1.7M17.37 17.37l1.7 1.7M19.07 4.93l-1.7 1.7M6.63 17.37l-1.7 1.7" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.2A8 8 0 1 1 9.8 4 6.3 6.3 0 0 0 20 14.2z" />
        </svg>
      )}
    </button>
  )
}
