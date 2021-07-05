import {
  INCREASE_TOTALCOST,
  DECREASE_TOTALCOST,
  RESET_TOTALCOST,
  FETCH_DATA_ORDER_FAIL,
  FETCH_DATA_ORDER_PENDING,
  FETCH_DATA_ORDER_SUCCESS,
  CLOSE_ORDER_DETAILS,
  SHOW_ORDER_DETAILS,
  GET_ORDER_BY_ID_PENDING,
  GET_ORDER_BY_ID_SUCCESS,
  GET_ORDER_BY_ID_FAIL
} from './action-types';
import {API_URL} from '../../constants';
import {AppDispatch, AppThunk} from '../store';
import {
  ICloseOrderDetailsAction,
  IDecreaseTotalCostAction,
  IFetchDataOrderFailAction,
  IFetchDataOrderPendingAction,
  IFetchDataOrderSuccessAction,
  IGetOrderByIdFailAction,
  IGetOrderByIdPendingAction,
  IGetOrderByIdSuccessAction,
  IIncreaseTotalCostAction,
  IResetTotalCostAction,
  IShowOrderDetailsAction
} from './types';

export const increaseTotalCostAction = (
  amount: number
): IIncreaseTotalCostAction => {
  return {
    type: INCREASE_TOTALCOST, 
    payload: {amount}
  };
};

export const decreaseTotalCostAction = (
  amount: number
): IDecreaseTotalCostAction => {
  return {
    type: DECREASE_TOTALCOST, 
    payload: {amount}
  };
};

export const resetTotalCostAction = (): IResetTotalCostAction => {
  return {type: RESET_TOTALCOST};
};

export const showOrderDetailsAction = (): IShowOrderDetailsAction => {
  return {type: SHOW_ORDER_DETAILS};
};

export const closeOrderDetailsAction = (): ICloseOrderDetailsAction => {
  return {type: CLOSE_ORDER_DETAILS};
};

export const fetchDataOrderPendingAction = (): IFetchDataOrderPendingAction => ({
  type: FETCH_DATA_ORDER_PENDING
});

export const fetchDataOrderSuccessAction = (orderId: number): IFetchDataOrderSuccessAction => ({
  type: FETCH_DATA_ORDER_SUCCESS,
  payload: {orderId}
});

export const fetchIngredientsFailAction = (errorMessage: string): IFetchDataOrderFailAction => ({
  type: FETCH_DATA_ORDER_FAIL,
  payload: {errorMessage}
});

export const fetchDataOrderAction: AppThunk = orderlist => (dispatch: AppDispatch) => {
  dispatch(fetchDataOrderPendingAction());
  fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      ingredients: orderlist
    })
  }).then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch(fetchDataOrderSuccessAction(resp.order.number));
      dispatch({type: SHOW_ORDER_DETAILS})
    }).catch(errorMessage => {
      dispatch(fetchIngredientsFailAction(errorMessage));
    });
};

export const getOrderByIdPendingAction = (): IGetOrderByIdPendingAction => ({
  type: GET_ORDER_BY_ID_PENDING
});

export const getOrderByIdSuccessAction = (data: any): IGetOrderByIdSuccessAction => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  payload: data
});

export const getOrderByIdFailAction = (errorMessage: string): IGetOrderByIdFailAction => ({
  type: GET_ORDER_BY_ID_FAIL,
  payload: {errorMessage}
});

export const getOrderByIdAction: AppThunk = (id: string) => (dispatch: AppDispatch) => {
  dispatch(getOrderByIdPendingAction());
  fetch(`${API_URL}/orders/${id}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch(getOrderByIdSuccessAction(resp.orders && resp.orders.length > 0 ? resp.orders[0] : null));
    }).catch(errorMessage => {
      dispatch(getOrderByIdFailAction(errorMessage));
    });
};
