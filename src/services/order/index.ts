import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  increaseTotalCostAction,
  decreaseTotalCostAction,
  resetTotalCostAction,
  fetchDataOrderAction,
  showOrderDetailsAction,
  closeOrderDetailsAction,
  getOrderByIdAction
} from './action-creators';

type TSelectors = {
  totalCost: number,
  isSendingDataOrder: boolean,
  orderId: number,
  isShowOrderDetails: boolean,
  errorMessage: string,
  order: any,
  isOrderLoading: boolean
};

type TActions = {
  increaseTotalCostAction: (amount: number) => void,
  decreaseTotalCostAction: (amount: number) => void,
  resetTotalCostAction: () => void,
  fetchDataOrderAction: (orderlist: Array<string>) => void,
  showOrderDetailsAction: () => void,
  closeOrderDetailsAction: () => void,
  getOrderByIdAction: (id: string) => void
};

export type TUseOrder = [TSelectors, TActions];

export const useOrder = (): TUseOrder => (
  [
    useSelector(({orderReducer}: RootState) => ({
      totalCost: orderReducer.totalCost,
      isSendingDataOrder: orderReducer.isSendingDataOrder,
      orderId: orderReducer.orderId,
      isShowOrderDetails: orderReducer.isShowOrderDetails,
      errorMessage: orderReducer.errorMessage,
      order: orderReducer.order,
      isOrderLoading: orderReducer.isOrderLoading      
    })),
    {
      increaseTotalCostAction,
      decreaseTotalCostAction,
      resetTotalCostAction,
      fetchDataOrderAction,
      showOrderDetailsAction,
      closeOrderDetailsAction,
      getOrderByIdAction
    }
  ]
);