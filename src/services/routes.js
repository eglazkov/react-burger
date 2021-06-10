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

const RegisterPage = lazy(() => import('../pages/register'));
const RegisterPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <RegisterPage {...props} />
  </Suspense>
);

const ForgotPasswordPage = lazy(() => import('../pages/forgot-password'));
const ForgotPasswordPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <ForgotPasswordPage {...props} />
  </Suspense>
);

const ResetPasswordPage = lazy(() => import('../pages/reset-password'));
const ResetPasswordPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <ResetPasswordPage {...props} />
  </Suspense>
);

const FeedPage = lazy(() => import('../pages/feed'));
const FeedPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <FeedPage {...props} />
  </Suspense>
);

const OrderPage = lazy(() => import('../pages/order'));
const OrderPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <OrderPage {...props} />
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
    path: '/register',
    exact: true,
    component: RegisterPageLazy
  },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPasswordPageLazy
  },
  {
    path: '/reset-password',
    exact: true,
    component: ResetPasswordPageLazy
  },
  {
    path: '/feed',
    exact: true,
    component: FeedPageLazy
  },
  {
    path: '/feed/:id',
    exact: true,
    component: OrderPageLazy
  },
  {
    path: '/',
    exact: false,
    component: NotFoundPageLazy
  }
];
