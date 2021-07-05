import {TIngredient} from "../ingredients";
import {
  CLOSE_ORDER_DETAILS,
  DECREASE_TOTALCOST,
  FETCH_DATA_ORDER_FAIL,
  FETCH_DATA_ORDER_PENDING,
  FETCH_DATA_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAIL,
  GET_ORDER_BY_ID_PENDING,
  GET_ORDER_BY_ID_SUCCESS,
  INCREASE_TOTALCOST,
  RESET_TOTALCOST,
  SHOW_ORDER_DETAILS
} from "./action-types";

export interface IIncreaseTotalCostAction {
  type: typeof INCREASE_TOTALCOST;
  payload: {amount: number}
}

export interface IDecreaseTotalCostAction {
  type: typeof DECREASE_TOTALCOST;
  payload: {amount: number}
}

export interface IResetTotalCostAction {
  type: typeof RESET_TOTALCOST;
}

export interface IShowOrderDetailsAction {
  type: typeof SHOW_ORDER_DETAILS;
}

export interface ICloseOrderDetailsAction {
  type: typeof CLOSE_ORDER_DETAILS;
}

export interface IFetchDataOrderPendingAction {
  type: typeof FETCH_DATA_ORDER_PENDING;
}

export interface IFetchDataOrderSuccessAction {
  type: typeof FETCH_DATA_ORDER_SUCCESS;
  payload: {orderId: number};
}

export interface IFetchDataOrderFailAction {
  type: typeof FETCH_DATA_ORDER_FAIL;
  payload: {errorMessage: string};
}

export interface IGetOrderByIdPendingAction {
  type: typeof GET_ORDER_BY_ID_PENDING;
}

export interface IGetOrderByIdSuccessAction {
  type: typeof GET_ORDER_BY_ID_SUCCESS;
  payload: any;
}

export interface IGetOrderByIdFailAction {
  type: typeof GET_ORDER_BY_ID_FAIL;
  payload: {errorMessage: string};
}

export type TOrderAction = 
  IIncreaseTotalCostAction |
  IDecreaseTotalCostAction |
  IResetTotalCostAction |
  IShowOrderDetailsAction |
  ICloseOrderDetailsAction |
  IGetOrderByIdPendingAction |
  IGetOrderByIdSuccessAction |
  IGetOrderByIdFailAction |
  any
;
