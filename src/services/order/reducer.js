import {
  INCREASE_TOTALCOST,
  DECREASE_TOTALCOST,
  RESET_TOTALCOST,
  FETCH_DATA_ORDER_FAIL,
  FETCH_DATA_ORDER_PENDING,
  FETCH_DATA_ORDER_SUCCESS,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from './action-types';

const orderInitialState = {
  totalCost: 0,
  isSendingDataOrder: false,
  orderId: null,
  isShowOrderDetails: false,
  errorMessage: null
};

export const orderReducer = (state = orderInitialState, action) => {
  switch (action.type) {    
    case INCREASE_TOTALCOST:
      return {
        ...state,
        totalCost: state.totalCost + action.payload.amount
      };            
    case DECREASE_TOTALCOST:
      return {
        ...state,
        totalCost: state.totalCost - action.payload.amount
      };          
    case RESET_TOTALCOST:
      return {
        ...state,
        totalCost: 0
      };          
    case FETCH_DATA_ORDER_PENDING:
      return {
        ...state,
        isSendingDataOrder: true,
        errorMessage: null
      };          
    case FETCH_DATA_ORDER_SUCCESS:
      return {
        ...state,
        isSendingDataOrder: false,
        orderId: action.payload.orderId
      };          
    case FETCH_DATA_ORDER_FAIL:
      return {
        ...state,
        isSendingDataOrder: false,
        errorMessage: action.payload.errorMessage,
        orderId: null
      };          
    case SHOW_ORDER_DETAILS:
      return {
        ...state,
        isShowOrderDetails: true
      };          
    case CLOSE_ORDER_DETAILS:
      return {
        ...state,
        isShowOrderDetails: false
      };
    default:
      return {...state};
  }
}
