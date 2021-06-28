import {useSelector} from 'react-redux';

export const useWebsocket = () => (
  [
    useSelector(({wsReducer}) => ({
      feedData: wsReducer.feedData,
      historyData: wsReducer.historyData,
      wsConnected: wsReducer.wsConnected
    }))
  ]
);