import {useSelector} from 'react-redux';

import {
  increaseTotalCostAction,
  decreaseTotalCostAction,
  resetTotalCostAction,
  fetchDataOrderAction,
  showOrderDetailsAction,
  closeOrderDetailsAction
} from './action-creators';

export const useOrder = () => (
  [
    useSelector(({orderReducer}) => ({
      totalCost: orderReducer.totalCost,
      isSendingDataOrder: orderReducer.isSendingDataOrder,
      orderId: orderReducer.orderId,
      isShowOrderDetails: orderReducer.isShowOrderDetails,
      errorMessage: orderReducer.errorMessage    
    })),
    {
      increaseTotalCostAction,
      decreaseTotalCostAction,
      resetTotalCostAction,
      fetchDataOrderAction,
      showOrderDetailsAction,
      closeOrderDetailsAction
    }
  ]
);