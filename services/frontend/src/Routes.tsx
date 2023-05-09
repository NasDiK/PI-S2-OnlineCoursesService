import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import WrapComponent from './components/WrapComponent';
import WithHeader from './components/MainPage/WithHeader';

import SharedPage from './pages/SharedComponents';
import AuthPage from './pages/AuthPage';
import ReviewPage from './components/MainPage/Review/ReviewPage';
import CoursesPage from './components/MainPage/Courses/CoursesPage';
import RatingPage from './components/MainPage/Rating/RatingPage';
import StudentsPage from './components/MainPage/Students/StudentsPage';
import AdminPanelPage from './components/MainPage/AdminPanel/AdminPanelPage';
import CoursePage from './components/MainPage/Course/CoursePage';
import ProfilePage from './components/MainPage/Profile/ProfilePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrapComponent component={<WithHeader component={<CoursesPage />} />} />
  },
  {
    path: '/review/:id?',
    element: <WrapComponent component={<WithHeader component={<ReviewPage />} />} />
  },
  {
    path: '/course/:courseId/:id',
    element: <WrapComponent component={<WithHeader component={<CoursePage />} />} />
  },
  {
    path: '/courses',
    element: <WrapComponent component={<WithHeader component={<CoursesPage />} />} />
  },
  {
    path: '/rating',
    element: <WrapComponent component={<WithHeader component={<RatingPage />} />} />
  },
  {
    path: '/students/:id?',
    element: <WrapComponent component={<WithHeader component={<StudentsPage />} />} />
  },
  {
    path: '/admin-panel/:id?',
    element: <WrapComponent component={<WithHeader component={<AdminPanelPage />} />} />
  },
  {
    path: '/shared',
    element: <WrapComponent component={<SharedPage />} />
  },
  {
    path: '/auth',
    element: <WrapComponent component={<AuthPage />} />
  },
  {
    path: '/profile/:id?',
    element: <WrapComponent component={<WithHeader component={<ProfilePage />} />} />
  }
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;