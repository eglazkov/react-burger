import {
  INCREASE_TOTALCOST,
  DECREASE_TOTALCOST,
  RESET_TOTALCOST,
  FETCH_DATA_ORDER_FAIL,
  FETCH_DATA_ORDER_PENDING,
  FETCH_DATA_ORDER_SUCCESS,
  CLOSE_ORDER_DETAILS,
  SHOW_ORDER_DETAILS
} from './action-types';
import {API_URL} from '../../constants';

export const increaseTotalCostAction = (amount) => dispatch => {
  dispatch({type: INCREASE_TOTALCOST, payload: {amount}});
};

export const decreaseTotalCostAction = (amount) => dispatch => {
  dispatch({type: DECREASE_TOTALCOST, payload: {amount}});
};

export const resetTotalCostAction = () => dispatch => {
  dispatch({type: RESET_TOTALCOST});
};

export const showOrderDetailsAction = () => dispatch => {
  dispatch({type: SHOW_ORDER_DETAILS});
};

export const closeOrderDetailsAction = () => dispatch => {
  dispatch({type: CLOSE_ORDER_DETAILS});
};

export const fetchDataOrderAction = orderlist => dispatch => {
  dispatch({type: FETCH_DATA_ORDER_PENDING});
  fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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
      dispatch({type: FETCH_DATA_ORDER_SUCCESS, payload: {orderId: resp.order.number}});
      dispatch({type: SHOW_ORDER_DETAILS})
    }).catch(errorMessage => {
      dispatch({type: FETCH_DATA_ORDER_FAIL, payload: {errorMessage}});
    });
};
