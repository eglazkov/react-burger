import React, {useState, useEffect, useReducer} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import AppSpinner from '../app-spinner';
import {API_URL} from '../../constants';

import {AppContext} from '../../services/app-context';

function totalCostReducer (state, action) {
  switch (action.type) {
    case 'increase':
      return state + action.payload      
    case 'decrease':
      return state - action.payload
    case 'reset':
      return 0;  
    default:
      return state;
  }
}
 
const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderCreating, setIsOrderCreating] = useState(false);
  const [isError, setIsError] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [totalCost, dispatchTotalCost] = useReducer(totalCostReducer, 0) 
  
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/ingredients`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
      .then(resp => {
        setIngredients(resp.data);
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
        setIsError(true);
        alert(`Во время запроса произошла ошибка: ${error}`);
      });    
  }, []);
  
  const changeCount = (ingredients, id, decrease) => {
    ingredients.forEach(item => {
      if (item["_id"] === id) {
        item.count = decrease ?
        Number(item.count || 0) - 1 :
        Number(item.count || 0) + 1;
      }
    });
  }

  const addIngredient = (ingredient) => {    
    const length = addedIngredients.length;
    const index = length === 1 ? length : length - 1;
    if (
      ingredient.type !== "bun" &&
      (length === 0 || length === 1)
      ) {
      alert(`Данный ингредиент не может лежать в основе бургера.
Пожалуйста выберите ингрединт из раздела "Булки".`);
      return;
    }
    addedIngredients.splice(index, 0, ingredient);
    changeCount(ingredients, ingredient["_id"]);    
    setIngredients([...ingredients]);
    setAddedIngredients([...addedIngredients]);
    dispatchTotalCost({type: 'increase', payload: ingredient.price});
  }

  const removeIngredient = (index) => {
    const removedIngredient = addedIngredients.splice(index, 1);
    changeCount(ingredients, removedIngredient[0]["_id"], true);
    setIngredients([...ingredients]);
    setAddedIngredients([...addedIngredients]);
    dispatchTotalCost({type: 'decrease', payload: removedIngredient[0].price});
  }
  
  return (
    <AppContext.Provider value={{
      ingredients,
      addedIngredients,
      totalCost,
      dispatchTotalCost,
      setIsOrderCreating
    }}>
      <AppHeader />
      <main className={`mb-5 ${appStyles.mainContainer}`}>          
        <BurgerIngredients
          isLoading={isLoading}
          addIngredient={addIngredient}/>
        <BurgerConstructor
          removeIngredient={removeIngredient}/>
      </main>
      <AppFooter />
      {isOrderCreating && <AppSpinner />}
    </AppContext.Provider>
  );
}
 
export default App;
