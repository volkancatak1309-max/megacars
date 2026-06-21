import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import de from './locales/de.json'
import tr from './locales/tr.json'

// DE primary, TR secondary (DESIGN brief)
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      de: { translation: de },
      tr: { translation: tr },
    },
    // DE is primary: ignore the visitor's system locale on first visit.
    // Only an explicit toggle (persisted in localStorage) switches to TR.
    fallbackLng: 'de',
    supportedLngs: ['de', 'tr'],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'mc-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
