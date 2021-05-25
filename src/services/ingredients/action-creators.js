import {
  FETCH_INGREDIENTS_PENDING,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL,
  CHANGE_INGREDIENTS,
  INCREASE_INGREDIENT_COUNT,
  DECREASE_INGREDIENT_COUNT,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS
} from './action-types';
import {API_URL} from '../../constants';

export const fetchIngredientsAction = () => dispatch => {
  dispatch({type: FETCH_INGREDIENTS_PENDING});
  fetch(`${API_URL}/ingredients`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch({type: FETCH_INGREDIENTS_SUCCESS, payload: {ingredients: resp.data}});
    }).catch(errorMessage => {
      dispatch({type: FETCH_INGREDIENTS_FAIL, payload: {errorMessage}});
    });
};

export const changeIngredientsAction = ingredients => {
 return {
   type: CHANGE_INGREDIENTS,
    payload: {ingredients}
  };  
};

export const increaseCountAction = (id) => {
  return {
    type: INCREASE_INGREDIENT_COUNT, 
    payload: {id}
  };  
};

export const decreaseCountAction = (id) => {
  return {
    type: DECREASE_INGREDIENT_COUNT, 
    payload: {id}
  };  
};

export const openDetailsAction = details => {
  return {
    type: OPEN_INGREDIENT_DETAILS,
    payload: {details}
  };  
};

export const closeDetailsAction = () => {
  return {type: CLOSE_INGREDIENT_DETAILS};  
};
