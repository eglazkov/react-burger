import {v4 as uuidv4} from 'uuid';
import {TIngredient} from '../ingredients';
import {
  ADD_TO_CONSTRUCTOR,
  REMOVE_FROM_CONSTRUCTOR,
  DROP_CONSTRUCTOR_ITEM,
  RESET_CONSTRUCTOR,
  HIDE_DROP_LOCATION,
  SHOW_DROP_LOCATION
} from './action-types';

import {
  IAddToConstructorAction,
  IDropConstructorItemAction,
  IRemoveFromConstructorAction,
  IResetConstructorAction,
  IToggleDropLoactionAction
} from './types';


export const addToConstructorAction = (
  index: number,
  item: TIngredient
): IAddToConstructorAction => {
  const constructorId = uuidv4();
  return {
   type: ADD_TO_CONSTRUCTOR,
   payload: {index, item: {constructorId, ...item}}
  };
};

export const removeFromConstructorAction = (
  index: number
): IRemoveFromConstructorAction => {
  return {
    type: REMOVE_FROM_CONSTRUCTOR,
    payload: {index}
  };
};

export const dropConstructorItemAction = (
  {dragIndex, replaceToIndex}: {dragIndex: number, replaceToIndex: number}
): IDropConstructorItemAction => {
  return {
    type: DROP_CONSTRUCTOR_ITEM,
    payload: {dragIndex, replaceToIndex}
  };
};

export const resetConstructorAction = (): IResetConstructorAction => {
  return {type: RESET_CONSTRUCTOR};
};

export const toggleDropLoactionAction = (
  show: boolean
): IToggleDropLoactionAction=> {
  return show ? {type: SHOW_DROP_LOCATION} : 
                {type: HIDE_DROP_LOCATION};
};
