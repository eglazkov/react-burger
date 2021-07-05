import {TOrder} from './index';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED_ORDERS,
  WS_GET_HISTORY_ORDERS
} from './action-types';
import {TWebsocketActions} from './types';

export type TWsInitialState = {
  wsConnected: boolean;
  feedData: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  },
  historyData: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  }  
} | any;

const initialState: TWsInitialState = {
  wsConnected: false,
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  historyData: {
    orders: [],
    total: 0,
    totalToday: 0
  } 
};

export type TWsReducer = TWsInitialState;

export const wsReducer = (
  state = initialState,
  action: TWebsocketActions
): TWsReducer => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };
    case WS_GET_FEED_ORDERS:
      return {
        ...state,
        feedData: action.payload
      };
    case WS_GET_HISTORY_ORDERS:
      return {
        ...state,
        historyData: action.payload
      };
    default:
      return state;
  }
};
