import {
  INCREASE_TOTALCOST,
  DECREASE_TOTALCOST,
  RESET_TOTALCOST,
  FETCH_DATA_ORDER_FAIL,
  FETCH_DATA_ORDER_PENDING,
  FETCH_DATA_ORDER_SUCCESS,
  SHOW_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS,
  GET_ORDER_BY_ID_PENDING,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL
} from './action-types';
import {TOrderAction} from './types';

type TOrderInitialState = {
  totalCost: number;
  isSendingDataOrder: boolean;
  orderId: number | null;
  isShowOrderDetails: boolean;
  errorMessage: string | null;
  order: any;
  isOrderLoading: boolean;
};

const orderInitialState: TOrderInitialState | any = {
  totalCost: 0,
  isSendingDataOrder: false,
  orderId: null,
  isShowOrderDetails: false,
  errorMessage: null,
  order: null,
  isOrderLoading: true
};

export const orderReducer = (state = orderInitialState, action: TOrderAction) => {
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
    case GET_ORDER_BY_ID_PENDING:
      return {
        ...state,        
        isOrderLoading: true
      };          
    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isOrderLoading: false
      };          
    case GET_ORDER_BY_ID_FAIL:
      return {
        ...state,
        order: null,
        isOrderLoading: false
      };
    default:
      return {...state};
  }
}
