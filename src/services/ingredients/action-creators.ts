
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
import {TIngredient} from '../ingredients';
import {AppDispatch, AppThunk} from '../store';
import {
  IChangeIngredientsAction,
  ICloseDetailsAction,
  IDecreaseCountAction,
  IFetchIngredientsFailAction,
  IFetchIngredientsPendingAction,
  IFetchIngredientsSuccessAction,
  IIncreaseCountAction,
  IOpenDetailsAction
} from './types';

export const fetchIngredientsPendingAction = (): IFetchIngredientsPendingAction => ({
  type: FETCH_INGREDIENTS_PENDING
});

export const fetchIngredientsSuccessAction = (data: TIngredient[]): IFetchIngredientsSuccessAction => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  payload: {ingredients: data}
});

export const fetchIngredientsFailAction = (errorMessage: string): IFetchIngredientsFailAction => ({
  type: FETCH_INGREDIENTS_FAIL,
  payload: {errorMessage}
});

export const fetchIngredientsAction: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch(fetchIngredientsPendingAction());
  fetch(`${API_URL}/ingredients`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch(fetchIngredientsSuccessAction(resp.data));
    }).catch(errorMessage => {
      dispatch(fetchIngredientsFailAction(errorMessage));
    });
};

export const changeIngredientsAction = (
  ingredients: Array<TIngredient>
): IChangeIngredientsAction => {
 return {
    type: CHANGE_INGREDIENTS,
    payload: {ingredients}
  };  
};

export const increaseCountAction = (id: string): IIncreaseCountAction => {
  return {
    type: INCREASE_INGREDIENT_COUNT, 
    payload: {id}
  };  
};

export const decreaseCountAction = (id: string): IDecreaseCountAction => {
  return {
    type: DECREASE_INGREDIENT_COUNT, 
    payload: {id}
  };  
};

export const openDetailsAction = (details: TIngredient): IOpenDetailsAction => {
  return {
    type: OPEN_INGREDIENT_DETAILS,
    payload: {details}
  };  
};

export const closeDetailsAction = (): ICloseDetailsAction => {
  return {type: CLOSE_INGREDIENT_DETAILS};  
};
