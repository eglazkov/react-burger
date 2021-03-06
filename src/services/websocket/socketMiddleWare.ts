import {Store} from "redux";

type TAction = {type: string, payload?: any};
type TDispatchAction = (action: TAction) => void;

export const socketMiddleware = (
  wsUrl: string, 
  wsActions: {
    [name: string]: string
  },
  withAuth?: boolean
) => {
  return (store: Store) => {
    let socket: WebSocket | null = null;

    return (next: TDispatchAction) => (action: TAction) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsInitUser, wsSendMessage, onOpen, onClose,
        onError, onGetFeedOrders, onGetHistoryOrders, wsEnd, wsEndUser, wsPing } = wsActions;
      const { token } = getState().userReducer;
      if (type === wsInit && !withAuth) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (type === wsInitUser && token && withAuth) {
        socket = new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          if (withAuth) {
            dispatch({ type: onGetHistoryOrders, payload: restParsedData });
          } else {
            dispatch({ type: onGetFeedOrders, payload: restParsedData });
          }
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage && token) {
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }
        if (type === wsPing) {          
          socket.send('pong');
        }
        if (type === wsEnd || type === wsEndUser) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
