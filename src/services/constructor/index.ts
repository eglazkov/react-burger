import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  addToConstructorAction,
  removeFromConstructorAction,
  dropConstructorItemAction,
  resetConstructorAction,
  toggleDropLoactionAction
} from './action-creators';
import {TConstructorReducer} from './reducer';


export type TUseConstructor = [TConstructorReducer, any];

export const useConstructor = (): TUseConstructor => (
  [
    useSelector(({constructorReducer}: RootState) => ({
      constructorIngredients: constructorReducer.constructorIngredients,
      showDropLocation: constructorReducer.showDropLocation
    })),
    {
      addToConstructorAction,
      removeFromConstructorAction,
      dropConstructorItemAction,
      resetConstructorAction,
      toggleDropLoactionAction
    }
  ]
);