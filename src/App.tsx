import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, NotFoundPage, RegistrationPage } from '@/pages';

import './App.css';
import { deleteCookie, getCookie } from '@/utils';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/auth' element={<LoginPage />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='*' element={<Navigate to='/auth' replace />} />
    </Routes>
  );
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  }, []);

  if (isLoading) return null;

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
};

export default App;
