import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import * as en from './languages/en/translation.json';
import * as ru from './languages/ru/translation.json';

export const defaultNS = 'translation';

export const resources = {
  en,
  ru,
};

const i18nOptions: InitOptions = {
  fallbackLng: 'en',
  detection: {
    order: ['queryString', 'cookie'],
    caches: ['cookie'],
  },
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    ru
  },
  returnNull: false,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nOptions);

export default i18n;