import {compose, createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import {rootReducer} from './rootReducer';
import history from './history';

const routerMiddle = routerMiddleware(history);

const logger = createLogger({collapsed: true});
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(routerMiddle, thunk, logger));

const store = createStore(
  rootReducer,
  enhancer
);

export default store;