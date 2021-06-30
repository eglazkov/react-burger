import {useSelector} from 'react-redux';

const sortByDate = (a, b) => {
  return new Date(b.createdAt) - new Date(a.createdAt);
}

const getTotalForToday = (orders) => {  
  function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }  
  return orders.reduce((acc, cur) => {
    return acc + (isToday(new Date(cur.createdAt)) ? 1 : 0);
  }, 0);
}

export const useWebsocket = () => (
  [
    useSelector(({wsReducer}) => ({
      feedData: {
        ...wsReducer.feedData,
        orders: wsReducer.feedData?.orders.sort(sortByDate) || [],
        totalToday: getTotalForToday(wsReducer.feedData?.orders)
      },
      historyData: {
        ...wsReducer.historyData,
        orders: wsReducer.historyData?.orders.sort(sortByDate) || [],
        totalToday: getTotalForToday(wsReducer.historyData?.orders)
      },
      wsConnected: wsReducer.wsConnected
    }))
  ]
);