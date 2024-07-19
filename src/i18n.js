import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend';
//To load the translation files

i18n.on('languageChanged', function (lng) {
  localStorage.setItem("lng", lng);
})

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'production' ? false : true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'it', 'es', 'fr', 'de', 'pt', 'nl'], //Array of abbrevations of the languages
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation', 'anniversary'], //Names of the translation files
    defaultNS: 'translation',
    backend: {
      loadPath: process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_URL}/locales/{{lng}}/{{ns}}.json` : './locales/{{lng}}/{{ns}}.json'
    },
    detection: {
      order: ['localStorage'],
      lookupLocalStorage: 'lng'
    },
    saveMissing: true,
    saveMissingTo: 'all',
  });

export default i18n;
