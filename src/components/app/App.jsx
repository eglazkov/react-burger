import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import AppSpinner from '../app-spinner';

import {useIngredeints, useOrder, useConstructor} from '../../services';
 
const App = () => {
  const dispatch = useDispatch();
  const [{errorMessage},
    {fetchIngredientsAction, increaseCountAction, decreaseCountAction}] = useIngredeints();
  const [{isSendingDataOrder}, {increaseTotalCostAction, decreaseTotalCostAction}] = useOrder();  
  const [{constructorIngredients},
    {addToConstructorAction, removeFromConstructorAction}] = useConstructor();  

  const increaseTotalCost = amount => {
    dispatch(increaseTotalCostAction(amount));
  };

  const decreaseTotalCost = amount => {
    dispatch(decreaseTotalCostAction(amount));
  };

  const increaseCount = id => {
    dispatch(increaseCountAction(id));
  };

  const decreaseCount = amount => {
    dispatch(decreaseCountAction(amount));
  };

  const addToConstructor = (index, item) => {
    dispatch(addToConstructorAction(index, item));
  };

  const removeFromConstructor = index => {
    dispatch(removeFromConstructorAction(index));
  };
  
  useEffect(() => {
    dispatch(fetchIngredientsAction());
    errorMessage && alert(`Во время запроса произошла ошибка: ${errorMessage}`);
  }, [errorMessage, fetchIngredientsAction, dispatch]);

  const addIngredient = (ingredient) => {    
    const length = constructorIngredients.length;
    const index = length === 1 ? length : length - 1;
    if (length === 0 || ingredient.type === "bun") {
      if (ingredient.type !== "bun") {
        alert(`Данный ингредиент не может лежать в основе бургера.
Пожалуйста выберите ингрединт из раздела "Булки".`);
        return;
      }

      if (length > 0) {
        removeIngredient(0);
        removeIngredient(length - 2);
      }
      addToConstructor(0, ingredient);
      addToConstructor(length - 1, ingredient);
      increaseCount(ingredient["_id"]);
      increaseCount(ingredient["_id"]);
      increaseTotalCost(ingredient.price * 2);
    } else {
      addToConstructor(index, ingredient);
      increaseCount(ingredient["_id"]);
      increaseTotalCost(ingredient.price);
    }
  }

  const removeIngredient = (index) => {
    const removedIngredient = constructorIngredients[index];
    decreaseCount(removedIngredient["_id"]);
    decreaseTotalCost(removedIngredient.price);
    removeFromConstructor(index);
  }
  
  return (
    <>
      <AppHeader />
      <main className={`mb-5 ${appStyles.mainContainer}`}>          
        <BurgerIngredients
          addIngredient={addIngredient}/>
        <BurgerConstructor
          removeIngredient={removeIngredient}/>
      </main>
      <AppFooter />
      {isSendingDataOrder && <AppSpinner />}
    </>
  );
}
 
export default App;
