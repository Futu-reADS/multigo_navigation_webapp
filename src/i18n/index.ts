import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ja from './locales/ja.json'
import en from './locales/en.json'

const detected = typeof navigator !== 'undefined' && navigator.language ? navigator.language : null
const initialLng = detected ? (detected.startsWith('en') ? 'en' : detected.startsWith('ja') ? 'ja' : 'ja') : 'ja'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ja: { translation: ja }
  },
  lng: initialLng,
  fallbackLng: 'ja',
  interpolation: { escapeValue: false }
})

export default i18n
