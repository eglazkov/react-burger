import React, {lazy, Suspense} from 'react';
import AppSpinner from '../components/app-spinner';

const MainPage = lazy(() => import('../pages/main'));
const MainPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <MainPage {...props} />
  </Suspense>
);

const LoginPage = lazy(() => import('../pages/login'));
const LoginPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <LoginPage {...props} />
  </Suspense>
);

const NotFoundPage = lazy(() => import('../pages/not-found'));
const NotFoundPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <NotFoundPage {...props} />
  </Suspense>
);

export const routes = [
  {
    path: '/',
    exact: true,
    component: MainPageLazy
  },
  {
    path: '/login',
    exact: true,
    component: LoginPageLazy
  },
  {
    path: '/',
    exact: false,
    component: NotFoundPageLazy
  }
];
