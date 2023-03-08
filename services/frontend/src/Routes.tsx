import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import WrapComponent from './components/WrapComponent';

import MainPage from './pages/MainPage';
import SharedPage from './pages/SharedComponents';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrapComponent component={<MainPage />} />
  },
  {
    path: '/shared',
    element: <WrapComponent component={<SharedPage />} />
  },
  {
    path: '/auth',
    element: <WrapComponent component={<AuthPage />} />
  }
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;