import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import WrapComponent from './components/WrapComponent';
import WithHeader from './components/MainPage/WithHeader';

// import MainPage from './pages/MainPage';
import SharedPage from './pages/SharedComponents';
import AuthPage from './pages/AuthPage';
import ReviewPage from './components/MainPage/Review/ReviewPage';
import CoursesPage from './components/MainPage/Courses/CoursesPage';
import RatingPage from './components/MainPage/Rating/RatingPage';
import StudentsPage from './components/MainPage/Students/StudentsPage';
import AdminPanelPage from './components/MainPage/AdminPanel/AdminPanelPage';
import CoursePage from './components/MainPage/Course/CoursePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WrapComponent component={<WithHeader component={<CoursesPage />} />} />
  },
  {
    path: '/review',
    element: <WrapComponent component={<WithHeader component={<ReviewPage />} />} />
  },
  {
    path: '/course/:course_id?/:task_id?',
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
    path: '/students',
    element: <WrapComponent component={<WithHeader component={<StudentsPage />} />} />
  },
  {
    path: '/admin-panel',
    element: <WrapComponent component={<WithHeader component={<AdminPanelPage />} />} />
  },
  {
    path: '/shared',
    element: <SharedPage />
  },
  {
    path: '/auth',
    element: <WrapComponent component={<AuthPage />} />
  }
]);

const RouterComponent = () => <RouterProvider router={router} />;

export default RouterComponent;