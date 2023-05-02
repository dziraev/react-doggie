import { useContext } from 'react';
import { IntlContext } from '@/features';

export interface TranslateMessage {
  path: string;
  values?: Record<string, string | number | boolean>;
}

export const useIntl = () => {
  const intl = useContext(IntlContext);

  const translateMessage = (
    path: TranslateMessage['path'],
    values?: TranslateMessage['values']
  ) => {
    if (!intl.messages[path]) return path;
    if (!values) return intl.messages[path];

    for (const key in values) {
      if ({}.hasOwnProperty.call(values, key)) {
        intl.messages[path] = intl.messages[path].replace(`{${key}}`, String(values[key]));
      }
    }

    return intl.messages[path];
  };

  return { locale: intl.locale, translateMessage };
};
