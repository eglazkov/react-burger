import React, {lazy, Suspense, useEffect} from 'react';
import {  
  Switch,
  Route,
  useLocation
} from 'react-router-dom';
import ProtectedRoute from '../components/protected-route';
import UserProtectedRoute from '../components/user-protected-route';
import {history} from '../services';
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

const IngredientPage = lazy(() => import('../pages/ingredient-details'));
const IngredientPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <IngredientPage {...props} />
  </Suspense>
);

const IngredientModalPage = lazy(() => import('../pages/ingredient-details-modal'));
const IngredientModalPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <IngredientModalPage {...props} />
  </Suspense>
);

const OrderPage = lazy(() => import('../pages/order'));
const OrderPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <OrderPage {...props} />
  </Suspense>
);

const OrderModalPage = lazy(() => import('../pages/order-modal'));
const OrderModalPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <OrderModalPage {...props} />
  </Suspense>
);

const ProfilePage = lazy(() => import('../pages/profile'));
const ProfilePageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <ProfilePage {...props} />
  </Suspense>
);

const NotFoundPage = lazy(() => import('../pages/not-found'));
const NotFoundPageLazy = (props) => (
  <Suspense fallback={<AppSpinner />}>
    <NotFoundPage {...props} />
  </Suspense>
);

export function MainRouter() {
  const location = useLocation();
  const background = location.state && location.state.background;
  useEffect(() => {
    history.replace({...history.location, state: null})
  }, []);
  return (
    <>
      <Switch location={background || location}>
        <Route
          exact
          path="/"
          render={() => (
            <MainPageLazy />
          )}
        />
        <Route
          exact
          path="/ingredients/:id"
          render={() => (
            <IngredientPageLazy />
          )}
        />
        <UserProtectedRoute
          exact
          path="/login" 
        >
          <LoginPageLazy />
        </UserProtectedRoute>
        <UserProtectedRoute
          exact
          path="/register" 
        >
          <RegisterPageLazy />
        </UserProtectedRoute>
        <UserProtectedRoute
          exact
          path="/forgot-password" 
        >
          <ForgotPasswordPageLazy />
        </UserProtectedRoute>
        <UserProtectedRoute
          exact
          path="/reset-password" 
        >
          <ResetPasswordPageLazy />
        </UserProtectedRoute>
        <Route
          exact
          path="/feed"
          render={() => (
            <FeedPageLazy />
          )}
        />
        <Route
          exact
          path="/feed/:id"
          render={() => (
            <OrderPageLazy />
          )}
        />
        <ProtectedRoute
          path="/profile"                        
        >
          <ProfilePageLazy />
        </ProtectedRoute>
        <Route
          path="/"
          render={() => (
            <NotFoundPageLazy />
          )}
        />
      </Switch>
      {
        background &&      
        <Route
          exact
          path="/feed/:id"
          render={() => (
            <OrderModalPageLazy onClose={history.goBack} />
          )}
        />
      }
      {
        background &&
        <Route
          exact
          path="/profile/orders/:id">
            <OrderModalPageLazy onClose={history.goBack} />
        </Route>
      }
      {
        background &&
        <Route
          exact
          path="/ingredients/:id">
            <IngredientModalPageLazy caption="Детали ингредиента" onClose={history.goBack} />
        </Route>
      }  
    </>
  )
}

