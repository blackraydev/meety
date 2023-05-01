import i18n from './i18n';
import { Languages } from '../../constants/languages';

export const changeLanguage = (language: Languages) => {
  return i18n.changeLanguage(language);
};

export const getCurrentLanguage = () => {
  return i18n.language as Languages;
};
