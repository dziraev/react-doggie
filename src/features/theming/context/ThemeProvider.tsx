import { useMemo, useState } from 'react';
import { setCookie } from '@/utils/helpers';

import type { ThemeContextProps, Theme } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

import lightTheme from '@/assets/themes/light/light.module.css';
import darkTheme from '@/assets/themes/dark/dark.module.css';

interface ThemeProviderProps extends Omit<ThemeContextProps, 'setTheme'> {
  children: React.ReactElement;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const setTheme = (theme: Theme) => {
    setCookie('doggie-theme', theme);
    setCurrentTheme(theme);
  };

  const value = useMemo(() => ({ theme: currentTheme, setTheme }), [currentTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <div className={currentTheme === 'light' ? lightTheme.theme : darkTheme.theme}>
        <button onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}>
          Theme!
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
