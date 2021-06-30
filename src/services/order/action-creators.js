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

export const increaseTotalCostAction = (amount) => {
  return {
    type: INCREASE_TOTALCOST, 
    payload: {amount}
  };
};

export const decreaseTotalCostAction = (amount) => {
  return {
    type: DECREASE_TOTALCOST, 
    payload: {amount}
  };
};

export const resetTotalCostAction = () => {
  return {type: RESET_TOTALCOST};
};

export const showOrderDetailsAction = () => {
  return {type: SHOW_ORDER_DETAILS};
};

export const closeOrderDetailsAction = () => {
  return {type: CLOSE_ORDER_DETAILS};
};

export const fetchDataOrderAction = orderlist => dispatch => {
  dispatch({type: FETCH_DATA_ORDER_PENDING});
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
      dispatch({type: FETCH_DATA_ORDER_SUCCESS, payload: {orderId: resp.order.number}});
      dispatch({type: SHOW_ORDER_DETAILS})
    }).catch(errorMessage => {
      dispatch({type: FETCH_DATA_ORDER_FAIL, payload: {errorMessage}});
    });
};

export const getOrderByIdAction = id => dispatch => {
  dispatch({type: GET_ORDER_BY_ID_PENDING});
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
      dispatch({type: GET_ORDER_BY_ID_SUCCESS, payload: resp.orders && resp.orders.length > 0 ? resp.orders[0] : null});
    }).catch(errorMessage => {
      dispatch({type: GET_ORDER_BY_ID_FAIL, payload: {errorMessage}});
    });
};
