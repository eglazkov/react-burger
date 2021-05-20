import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  DROP_CONSTRUCTOR_ITEM,
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
    case DROP_CONSTRUCTOR_ITEM:
      const {dragIndex, replaceToIndex} = action.payload;  
      if (dragIndex === replaceToIndex) {
        return {
          ...state
        };
      }    
      const replacedArray = [...state.constructorIngredients];            
      const dragItem = [...replacedArray][dragIndex + 1];
      const replaceToItem = [...replacedArray][replaceToIndex + 1];      
      replacedArray[dragIndex + 1] = replaceToItem;
      replacedArray[replaceToIndex + 1] = dragItem;
      return {
        ...state,
        constructorIngredients: replacedArray
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
