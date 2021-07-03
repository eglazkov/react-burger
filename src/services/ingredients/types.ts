import {TIngredient} from "../ingredients";
import {
  CHANGE_INGREDIENTS,
  CLOSE_INGREDIENT_DETAILS,
  DECREASE_INGREDIENT_COUNT,
  FETCH_INGREDIENTS_FAIL,
  FETCH_INGREDIENTS_PENDING,
  FETCH_INGREDIENTS_SUCCESS,
  INCREASE_INGREDIENT_COUNT,
  OPEN_INGREDIENT_DETAILS
} from "./action-types";

export interface IFetchIngredientsPendingAction {
  type: typeof FETCH_INGREDIENTS_PENDING;
}

export interface IFetchIngredientsSuccessAction {
  type: typeof FETCH_INGREDIENTS_SUCCESS;
  payload: {ingredients: Array<TIngredient>}
}

export interface IFetchIngredientsFailAction {
  type: typeof FETCH_INGREDIENTS_FAIL;
  payload: {errorMessage: string}
}

export interface IChangeIngredientsAction {
  type: typeof CHANGE_INGREDIENTS;
  payload: {
    ingredients: Array<TIngredient>
  }
}

export interface IIncreaseCountAction {
  type: typeof INCREASE_INGREDIENT_COUNT;
  payload: {
    id: string
  }
}

export interface IDecreaseCountAction {
  type: typeof DECREASE_INGREDIENT_COUNT;
  payload: {
    id: string
  }
}

export interface IOpenDetailsAction {
  type: typeof OPEN_INGREDIENT_DETAILS;
  payload: {
    details: TIngredient
  }
}

export interface ICloseDetailsAction {
  type: typeof CLOSE_INGREDIENT_DETAILS;
}

export type TIngredientsAction = 
  IFetchIngredientsPendingAction |
  IFetchIngredientsSuccessAction |
  IFetchIngredientsFailAction |  
  IChangeIngredientsAction |
  IIncreaseCountAction |
  IDecreaseCountAction |
  IOpenDetailsAction |
  ICloseDetailsAction | any
;
