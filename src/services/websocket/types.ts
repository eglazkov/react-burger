import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_FEED_ORDERS,
  WS_SEND_MESSAGE
} from './action-types';
import {TOrder} from './index';

export interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
};

export interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
};

export interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED;
};

export interface IWsGetFeedOrders {
  type: typeof WS_GET_FEED_ORDERS;
  payload: {
    [name: string]: any,
    orders: TOrder[],
    totalToday: number
  }
};

export interface IWsSendMessage {
  type: typeof WS_SEND_MESSAGE;
  payload: any;
};

export type TWebsocketActions =
  IWsConnectionSuccess |
  IWsConnectionError |
  IWsConnectionClosed |
  IWsGetFeedOrders |
  IWsSendMessage |
  any
;
