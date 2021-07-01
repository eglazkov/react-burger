import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

export type TOrder = {
  ingredients: string[],
  _id: string,
  status: 'done' | 'pending' | 'created',
  number: number,
  name: string,
  createdAt: string,
  updatedAt: string
};

const sortByDate = (a: TOrder, b: TOrder) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

const getTotalForToday = (orders: TOrder[]) => {  
  function isToday(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }  
  return orders.reduce((acc, cur) => {
    return acc + (isToday(new Date(cur.createdAt)) ? 1 : 0);
  }, 0);
}

type TSelectors = {
  wsConnected: boolean,
  feedData: {
    [name: string]: any,
    orders: TOrder[],
    totalToday: number
  },
  historyData: {
    [name: string]: any,
    orders: TOrder[],
    totalToday: number
  }
};

export type TUseWebsocket = [TSelectors];

export const useWebsocket = (): TUseWebsocket => (
  [
    useSelector(({wsReducer} : RootState) => ({
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