import type { AcceptLocales } from './getLocale';
import { DEFAULT_LOCALE } from './getLocale';

export const getMessages = async (locale: AcceptLocales) => {
  try {
    const messages = await import(`../../../assets/locales/${locale}.json`);
    return messages;
  } catch {
    const defaultMessages = import(`../../../assets/locales/${DEFAULT_LOCALE}.json`);
    return defaultMessages;
  }
};
