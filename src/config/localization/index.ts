// import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './en.json';
import tr from './tr.json';
import ru from './ru.json';
import gr from './gr.json';

i18n.translations = {
  en,
  tr,
  ru,
  gr,
};

// FIXME: ReferenceError: navigator is not defined
// i18n.locale = Localization.locale;
i18n.locale = 'en';

i18n.fallbacks = true;
