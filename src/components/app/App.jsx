import React, {useState, useEffect, useCallback} from 'react';
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
  
  const getIngredientsFromServer = useCallback(() => {
    dispatch(fetchIngredientsAction());
  }, [fetchIngredientsAction, dispatch]);

  const increaseTotalCost = useCallback(amount => {
    dispatch(increaseTotalCostAction(amount));
  }, [increaseTotalCostAction, dispatch]);

  const decreaseTotalCost = useCallback(amount => {
    dispatch(decreaseTotalCostAction(amount));
  }, [decreaseTotalCostAction, dispatch]);

  const increaseCount = useCallback(id => {
    dispatch(increaseCountAction(id));
  }, [increaseCountAction, dispatch]);

  const decreaseCount = useCallback(amount => {
    dispatch(decreaseCountAction(amount));
  }, [decreaseCountAction, dispatch]);

  const addToConstructor = useCallback((index, item) => {
    dispatch(addToConstructorAction(index, item));
  }, [addToConstructorAction, dispatch]);

  const removeFromConstructor = useCallback(index => {
    dispatch(removeFromConstructorAction(index));
  }, [removeFromConstructorAction, dispatch]);
  
  useEffect(() => {
    getIngredientsFromServer();
    errorMessage && alert(`Во время запроса произошла ошибка: ${errorMessage}`);
  }, [errorMessage, getIngredientsFromServer]);

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
