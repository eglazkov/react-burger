import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';
import {TIngredient} from '../ingredients';

import {
  addToConstructorAction,
  removeFromConstructorAction,
  dropConstructorItemAction,
  resetConstructorAction,
  toggleDropLoactionAction
} from './action-creators';

type TSelectors = {
  constructorIngredients: TIngredient[],
  showDropLocation: boolean
};

export type TUseConstructor = [TSelectors, any];

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