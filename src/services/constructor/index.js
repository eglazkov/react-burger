import {useSelector} from 'react-redux';

import {
  addToConstructorAction,
  removeFromConstructorAction,
  dragConstructorItemAction,
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
      dragConstructorItemAction,
      resetConstructorAction
    }
  ]
);