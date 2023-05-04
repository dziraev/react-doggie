import { useMemo } from 'react';
import type { IntlContextProps } from './IntlContext';
import { IntlContext } from './IntlContext';

interface IntlProviderProps extends IntlContextProps {
  children: React.ReactElement;
}

export const IntlProvider: React.FC<IntlProviderProps> = ({ children, locale, messages }) => {
  const value = useMemo(() => ({ locale, messages }), []);
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
};
