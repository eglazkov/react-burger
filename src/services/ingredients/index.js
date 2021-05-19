import {useSelector} from 'react-redux';

import {
  fetchIngredientsAction,  
  changeIngredientsAction,
  increaseCountAction,
  decreaseCountAction,
  closeDetailsAction,
  openDetailsAction
} from './action-creators';

export const useIngredeints = () => (
  [
    useSelector(({ingredientsReducer}) => ({
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