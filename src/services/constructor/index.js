import {useSelector} from 'react-redux';

import {
  addToConstructorAction,
  removeFromConstructorAction,
  dropConstructorItemAction,
  resetConstructorAction
} from './action-creators';

export const useConstructor = () => (
  [
    useSelector(({constructorReducer}) => ({
      constructorIngredients: constructorReducer.constructorIngredients     
    })),
    {
      addToConstructorAction,
      removeFromConstructorAction,
      dropConstructorItemAction,
      resetConstructorAction
    }
  ]
);