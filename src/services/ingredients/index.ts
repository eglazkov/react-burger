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
  constructorId?: number
  image?: string,
  count?: number
};

export type TIngredientDetails = Omit<TIngredient, 'type' | '_id' | 'price' | 'image_mobile'>;

type TSelectors = {
  ingredients: TIngredient[],
  isIngredientsLoading: boolean,
  errorMessage: string,
  showIngredientDetails: boolean,
  ingredientDetails: TIngredientDetails
};

export type TUseIngredients = [TSelectors, any];

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