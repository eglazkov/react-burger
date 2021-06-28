import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED_ORDERS,
  WS_GET_HISTORY_ORDERS
} from './action-types';

const initialState = {
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

export const wsReducer = (state = initialState, action) => {
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
