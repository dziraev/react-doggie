import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, NotFoundPage, RegistrationPage } from '@/pages';
import { deleteCookie, getCookie, getLocale, getMessages } from '@/utils/helpers';
import { IntlProvider, ThemeProvider } from '@/features';
import type { Theme } from '@/features';

import './App.css';

const AuthRoutes = () => (
  <Routes>
    <Route path='/auth' element={<LoginPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='*' element={<Navigate to='/auth' replace />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path='*' element={<NotFoundPage />} />
  </Routes>
);

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState({});
  const locale = getLocale();

  useEffect(() => {
    const authCookie = getCookie('doggie-auth-token');
    const isNotMyDevice = getCookie('doggie-isNotMyDevice');

    const deviceExpire = isNotMyDevice && new Date().getTime() > +isNotMyDevice;

    if (authCookie && deviceExpire) {
      deleteCookie('doggie-auth-token');
      deleteCookie('doggie-isNotMyDevice');
    }

    if (authCookie && !deviceExpire) {
      setIsAuth(true);
    }

    getMessages(locale).then((messages) => {
      setMessages(messages.default);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return null;

  const theme = (getCookie('doggie-theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light')) as Theme;

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider locale={locale} messages={messages}>
        <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};

export default App;
