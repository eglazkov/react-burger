import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  DRAG_CONSTRUCTOR_ITEM,
  RESET_CONSTRUCTOR
} from './action-types';

const constructorInitialState = {
  constructorIngredients: []
};

export const constructorReducer = (state = constructorInitialState, action) => {
  const constructorIngredients = [...state.constructorIngredients];
  switch (action.type) {    
    case ADD_TO_CONSTRUCTOR:
      constructorIngredients.splice(action.payload.index, 0, action.payload.item);
      return {
        ...state,
        constructorIngredients
      };            
    case REMOVE_FROM_CONSTRUCTOR:
      constructorIngredients.splice(action.payload.index, 1);
      return {
        ...state,
        constructorIngredients
      };          
    case DRAG_CONSTRUCTOR_ITEM:
      return {
        ...state        
      };         
    case RESET_CONSTRUCTOR:
      return {
        ...state ,
        constructorIngredients: constructorInitialState.constructorIngredients       
      };
    default:
      return {...state};
  }
}
