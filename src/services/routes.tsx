import React, {useEffect} from 'react';
import {  
  Switch,
  Route,
  useLocation
} from 'react-router-dom';
import {
  ProtectedRoute,
  UserProtectedRoute
} from '../components';
import {history} from '../services';
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  FeedPage,
  IngredientPage,
  IngredientModalPage,
  OrderPage,
  OrderModalPage,
  ProfilePage,
  NotFoundPage
} from '../pages';

type TLocation = {
  state: {
    background: any
  }
};

export function MainRouter() {
  const location: TLocation = useLocation();
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
            <MainPage />
          )}
        />
        <Route
          exact
          path="/ingredients/:id"
          render={() => (
            <IngredientPage />
          )}
        />
        <UserProtectedRoute
          exact
          path="/login" 
        >
          <LoginPage />
        </UserProtectedRoute>
        <UserProtectedRoute
          exact
          path="/register" 
        >
          <RegisterPage />
        </UserProtectedRoute>
        <UserProtectedRoute
          exact
          path="/forgot-password" 
        >
          <ForgotPasswordPage />
        </UserProtectedRoute>
        <UserProtectedRoute
          exact
          path="/reset-password" 
        >
          <ResetPasswordPage />
        </UserProtectedRoute>
        <Route
          exact
          path="/feed"
          render={() => (
            <FeedPage />
          )}
        />
        <Route
          exact
          path="/feed/:id"
          render={() => (
            <OrderPage />
          )}
        />
        <ProtectedRoute
          path="/profile"                        
        >
          <ProfilePage />
        </ProtectedRoute>
        <Route
          path="/"
          render={() => (
            <NotFoundPage />
          )}
        />
      </Switch>
      {
        background &&      
        <Route
          exact
          path="/feed/:id"
          render={() => (
            <OrderModalPage onClose={history.goBack} />
          )}
        />
      }
      {
        background &&
        <Route
          exact
          path="/profile/orders/:id">
            <OrderModalPage onClose={history.goBack} />
        </Route>
      }
      {
        background &&
        <Route
          exact
          path="/ingredients/:id">
            <IngredientModalPage caption="Детали ингредиента" onClose={history.goBack} />
        </Route>
      }  
    </>
  )
}

