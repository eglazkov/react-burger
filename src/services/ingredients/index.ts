import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  fetchIngredientsAction,  
  changeIngredientsAction,
  increaseCountAction,
  decreaseCountAction,
  closeDetailsAction,
  openDetailsAction
} from './action-creators';
import {TIngredientsReducer} from './reducer';

export type TIngredient = {
  type: "bun" | "main" | "sauce",
  _id: string,
  image_mobile: string,
  image_large: string,
  price: number,
  name: string,
  description: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number,
  constructorId?: string
  image?: string,
  count?: number
};

export type TIngredientDetails = Omit<TIngredient, 'type' | '_id' | 'price' | 'image_mobile'>;

export type TUseIngredients = [TIngredientsReducer, any];

export const useIngredeints = (): TUseIngredients => (
  [
    useSelector(({ingredientsReducer}: RootState) => ({
      ingredients: ingredientsReducer.ingredients,
      isIngredientsLoading: ingredientsReducer.isIngredientsLoading,
      errorMessage: ingredientsReducer.errorMessage,
      showIngredientDetails: ingredientsReducer.showIngredientDetails,
      ingredientDetails: ingredientsReducer.ingredientDetails
    })),
    {
      fetchIngredientsAction,
      changeIngredientsAction,
      increaseCountAction,
      decreaseCountAction,
      closeDetailsAction,
      openDetailsAction
    }
  ]
);