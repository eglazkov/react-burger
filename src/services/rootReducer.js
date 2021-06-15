import { combineReducers } from 'redux';
import {connectRouter} from 'connected-react-router';
import {ingredientsReducer} from './ingredients/reducer';
import {orderReducer} from './order/reducer';
import {constructorReducer} from './constructor/reducer';
import history from './history';

export const rootReducer = combineReducers({
  router: connectRouter(history),
  ingredientsReducer,
  orderReducer,
  constructorReducer
});
