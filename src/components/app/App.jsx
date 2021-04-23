import React, {useState, useEffect} from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header';
import AppFooter from '../app-footer';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import {API_URL} from '../../constants';
 
const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [addedIngredients, setAddedIngredients] = useState([]);
  
  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL)
      .then(resp => resp.json())
      .then(resp => {
        setIngredients(resp.data);
        setIsLoading(false);
      }).catch(error => {
        setIsLoading(false);
        setIsError(true);
        alert(`Во время запроса произошла ошибка:
        ${error}`);
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
  }

  const removeIngredient = (index) => {
    const removedIngredient = addedIngredients.splice(index, 1);
    changeCount(ingredients, removedIngredient[0]["_id"], true);
    setIngredients([...ingredients]);
    setAddedIngredients([...addedIngredients]);
  }
  
  const total = addedIngredients.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <>
      <AppHeader/>
      <main className={`mb-5 ${appStyles.mainContainer}`}>          
        <BurgerIngredients
          isLoading={isLoading}
          addIngredient={addIngredient}
          ingredients={ingredients}/>
        <BurgerConstructor
          total={total}
          removeIngredient={removeIngredient}
          addedIngredients={addedIngredients}/>
      </main>
      <AppFooter total={total}/>
    </>
  );
}
 
export default App;
