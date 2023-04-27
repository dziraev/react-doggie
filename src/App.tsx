import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage, NotFoundPage, RegistrationPage } from '@/pages';

import './App.css';
import './assets/css/fonts.css';

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
  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
};

export default App;
