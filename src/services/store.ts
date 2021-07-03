
import {ThunkAction} from 'redux-thunk';
import {compose, createStore, applyMiddleware, Action, ActionCreator} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {rootReducer} from './rootReducer';
import history from './history';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_USER_START,
  WS_CONNECTION_END,
  WS_CONNECTION_USER_END,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
  WS_GET_HISTORY_ORDERS,
  WS_SEND_MESSAGE,
  WS_SEND_PONG_MESSAGE
} from './websocket/action-types';
import {socketMiddleware} from './websocket/socketMiddleWare';
import {composeWithDevTools} from 'redux-devtools-extension';
import {TConstructorActions} from './constructor/types';
import {TForgotPasswordActions} from './forgot-password-form/types';
import {TIngredientsAction} from './ingredients/types';
import {TLoginFormActions} from './login-form/types';
import {TRegisterFormActions} from './register-form/types';
import {TResetPasswordActions} from './reset-password-form/types';
import {TOrderAction} from './order/types';
import {TUserActions} from './user/types';

const createLogger = require('redux-logger').createLogger;

const isDev = process.env.NODE_ENV === 'development';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlHistory = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitUser: WS_CONNECTION_USER_START,
  wsEnd: WS_CONNECTION_END,
  wsEndUser: WS_CONNECTION_USER_END,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onGetFeedOrders: WS_GET_FEED_ORDERS,
  onGetHistoryOrders: WS_GET_HISTORY_ORDERS,
  wsPing: WS_SEND_PONG_MESSAGE
};

const socketAllOrdersMiddlware = socketMiddleware(wsUrl, wsActions);
const socketHistoryOrdersMiddlware = socketMiddleware(wsUrlHistory, wsActions, true);
const routerMiddle = routerMiddleware(history);
const logger = createLogger({collapsed: true});

const getMiddleWares = () => {
  return isDev ?
  [routerMiddle, thunk, logger, socketAllOrdersMiddlware, socketHistoryOrdersMiddlware] :
  [routerMiddle, thunk, socketAllOrdersMiddlware, socketHistoryOrdersMiddlware];
};

const enhancer = isDev ?
  composeWithDevTools(applyMiddleware(...getMiddleWares())) :
  compose(applyMiddleware(...getMiddleWares()))
;

const store = createStore(
  rootReducer,
  enhancer
);

export default store;

type TApplicationActions =
  TConstructorActions |
  TForgotPasswordActions |
  TIngredientsAction |
  TLoginFormActions |
  TRegisterFormActions |
  TResetPasswordActions |
  TOrderAction |
  TUserActions
;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;