import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  DROP_CONSTRUCTOR_ITEM,
  RESET_CONSTRUCTOR
} from './action-types';

export const addToConstructorAction = (index, item) => dispatch => {
  dispatch({type: ADD_TO_CONSTRUCTOR, payload: {index, item}})
};

export const removeFromConstructorAction = (index) => dispatch => {
  dispatch({type: REMOVE_FROM_CONSTRUCTOR, payload: {index}})
};

export const dropConstructorItemAction = ({dragIndex, replaceToIndex}) => dispatch => {
  dispatch({type: DROP_CONSTRUCTOR_ITEM, payload: {dragIndex, replaceToIndex}})
};

export const resetConstructorAction = () => dispatch => {
  dispatch({type: RESET_CONSTRUCTOR})
};
