import i18n from 'i18n-js';
import { translations } from './translations';

i18n.translations = translations;

// FIXME: ReferenceError: navigator is not defined
// i18n.locale = Localization.locale;
i18n.locale = 'en';

i18n.fallbacks = true;
