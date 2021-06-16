import { combineReducers } from 'redux';
import {connectRouter} from 'connected-react-router';
import {ingredientsReducer} from './ingredients/reducer';
import {orderReducer} from './order/reducer';
import {constructorReducer} from './constructor/reducer';
import {registerFormReducer} from './register-form/reducer';
import {loginFormReducer} from './login-form/reducer';
import {forgotPasswordFormReducer} from './forgot-password-form/reducer';
import {resetPasswordFormReducer} from './reset-password-form/reducer';
import {userReducer} from './user/reducer';
import history from './history';

export const rootReducer = combineReducers({
  router: connectRouter(history),
  ingredientsReducer,
  orderReducer,
  constructorReducer,
  registerFormReducer,
  loginFormReducer,
  forgotPasswordFormReducer,
  resetPasswordFormReducer,
  userReducer
});
