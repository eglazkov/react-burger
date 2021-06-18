import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  DROP_CONSTRUCTOR_ITEM,
  RESET_CONSTRUCTOR,
  HIDE_DROP_LOCATION,
  SHOW_DROP_LOCATION
} from './action-types';

const constructorInitialState = {
  constructorIngredients: [],
  showDropLocation: false
};

const array_move = function(arr, old_index, new_index) {
  if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
          arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
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
      return {
        ...state,
        constructorIngredients: array_move(
          [...state.constructorIngredients],
          dragIndex + 1,
          replaceToIndex + 1
        )
      };         
    case RESET_CONSTRUCTOR:
      return {
        ...state ,
        constructorIngredients: constructorInitialState.constructorIngredients       
      };         
    case SHOW_DROP_LOCATION:
      return {
        ...state ,
        showDropLocation: true       
      };         
    case HIDE_DROP_LOCATION:
      return {
        ...state ,
        showDropLocation: false  
      };
    default:
      return {...state};
  }
}
