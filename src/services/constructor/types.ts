import {
  ADD_TO_CONSTRUCTOR,
  DROP_CONSTRUCTOR_ITEM,
  HIDE_DROP_LOCATION,
  REMOVE_FROM_CONSTRUCTOR,
  RESET_CONSTRUCTOR,
  SHOW_DROP_LOCATION
} from './action-types';
import {TIngredient} from '../ingredients';

export interface IAddToConstructorAction {
  readonly type: typeof ADD_TO_CONSTRUCTOR;
  readonly payload: {index: number, item: TIngredient}
}

export interface IRemoveFromConstructorAction {
  readonly type: typeof REMOVE_FROM_CONSTRUCTOR;
  readonly payload: {index: number}
}

export interface IDropConstructorItemAction {
  readonly type: typeof DROP_CONSTRUCTOR_ITEM;
  readonly payload: {dragIndex: number, replaceToIndex: number}
}

export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR;
}

export interface IToggleDropLoactionAction {
  readonly type: typeof SHOW_DROP_LOCATION | typeof HIDE_DROP_LOCATION;
}

export type TConstructorActions =
  IAddToConstructorAction |
  IRemoveFromConstructorAction |
  IDropConstructorItemAction |
  IResetConstructorAction |
  IToggleDropLoactionAction |
  any
;
