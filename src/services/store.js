import {compose, createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {rootReducer} from './rootReducer';
import history from './history';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_USER_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
  WS_GET_HISTORY_ORDERS,
  WS_SEND_MESSAGE
} from './websocket/action-types';
import {socketMiddleware} from './websocket/socketMiddleWare';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlHistory = 'wss://norma.nomoreparties.space/orders';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsInitUser: WS_CONNECTION_USER_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onGetFeedOrders: WS_GET_FEED_ORDERS,
  onGetHistoryOrders: WS_GET_HISTORY_ORDERS
};

const socketAllOrdersMiddlware = socketMiddleware(wsUrl, wsActions);
const socketHistoryOrdersMiddlware = socketMiddleware(wsUrlHistory, wsActions, true);

const routerMiddle = routerMiddleware(history);

const logger = createLogger({collapsed: true});
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
  routerMiddle,
  thunk,
  socketAllOrdersMiddlware,
  socketHistoryOrdersMiddlware,
  logger
));

const store = createStore(
  rootReducer,
  enhancer
);

export default store;