import {useSelector} from 'react-redux';

import {
  increaseTotalCostAction,
  decreaseTotalCostAction,
  resetTotalCostAction,
  fetchDataOrderAction,
  showOrderDetailsAction,
  closeOrderDetailsAction,
  getOrderByIdAction
} from './action-creators';

export const useOrder = () => (
  [
    useSelector(({orderReducer}) => ({
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