import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_FEED_ORDERS,
  WS_SEND_MESSAGE
} from './action-types';
import {
  IWsConnectionClosed,
  IWsConnectionError,
  IWsConnectionSuccess,
  IWsGetFeedOrders,
  IWsSendMessage
} from './types';

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IWsConnectionError => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetFeedOrders = (message: any): IWsGetFeedOrders => {
  return {
    type: WS_GET_FEED_ORDERS,
    payload: message
  };
};

export const wsSendMessage = (message: any): IWsSendMessage => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};
