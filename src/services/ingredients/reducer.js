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

const ingredientsInitialState = {
  ingredients: [],
  isIngredientsLoading: false,
  errorMessage: null,
  showIngredientDetails: false,
  ingredientDetails: {}
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_PENDING:
      return {
        ...state,
        isIngredientsLoading: true,
        ingredients: [],
        errorMessage: null
      };  
    case FETCH_INGREDIENTS_SUCCESS:
    case CHANGE_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload.ingredients || [],
        isIngredientsLoading: false
      };        
    case FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        isIngredientsLoading: false,
        errorMessage: action.payload.errorMessage,
        ingredients: []
      };        
    case INCREASE_INGREDIENT_COUNT:
      return {
        ...state,        
        ingredients: [...state.ingredients.map(
          ingredient => {
            if (ingredient._id === action.payload.id) {
              ingredient.count = Number(ingredient.count || 0) + 1
            }
            return ingredient;
          }
        )]
      };        
    case DECREASE_INGREDIENT_COUNT:
      return {
        ...state,        
        ingredients: [...state.ingredients.map(
          ingredient => {
            if (ingredient._id === action.payload.id) {
              ingredient.count = Number(ingredient.count || 0) - 1
            }
            return ingredient;
          }
        )]
      };        
    case OPEN_INGREDIENT_DETAILS:
      return {
        ...state,
        showIngredientDetails: true,
        ingredientDetails: action.payload.details
      };        
    case CLOSE_INGREDIENT_DETAILS:
      return {
        ...state,        
        showIngredientDetails: false,
        ingredientDetails: {}
      };
    default:
      return {...state};
  }
}
