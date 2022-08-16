import { TRANSLATIONS_EN } from './en/translations'
import { TRANSLATIONS_JP } from './jp/translations'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'jp',
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      jp: {
        translation: TRANSLATIONS_JP,
      },
    },
  })

export default i18n
