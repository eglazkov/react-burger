import {useSelector} from 'react-redux';

import {
  addToConstructorAction,
  removeFromConstructorAction,
  dropConstructorItemAction,
  resetConstructorAction,
  toggleDropLoactionAction
} from './action-creators';

export const useConstructor = () => (
  [
    useSelector(({constructorReducer}) => ({
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