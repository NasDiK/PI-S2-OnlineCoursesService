import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import MainPage from './pages/MainPage';
import SharedPage from './pages/SharedComponents';
import AuthPage from './pages/AuthPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/shared',
    element: <SharedPage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;