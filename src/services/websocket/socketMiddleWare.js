export const socketMiddleware = (wsUrl, wsActions, withAuth) => {
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsInitUser, wsSendMessage, onOpen, onClose, onError, onGetFeedOrders, onGetHistoryOrders } = wsActions;
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
      }

      next(action);
    };
  };
};
