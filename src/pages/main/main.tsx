import React, {FC, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {
  BurgerConstructor,
  BurgerIngredients
} from '../../components';
import {useIngredeints, useOrder, useConstructor, TIngredient} from '../../services';

export type TRemoveIngredient = (index: number) => void;
export type TAddIngredient = (ingredient: TIngredient) => void;

const MainPage: FC = () => {
  const dispatch = useDispatch();
  const [{errorMessage},
    {fetchIngredientsAction, increaseCountAction, decreaseCountAction}] = useIngredeints();
  const [, {increaseTotalCostAction, decreaseTotalCostAction}] = useOrder();  
  const [{constructorIngredients},
    {addToConstructorAction, removeFromConstructorAction}] = useConstructor();  

  const increaseTotalCost = (amount: number) => {
    dispatch(increaseTotalCostAction(amount));
  };

  const decreaseTotalCost = (amount: number) => {
    dispatch(decreaseTotalCostAction(amount));
  };

  const increaseCount = (id: string) => {
    dispatch(increaseCountAction(id));
  };

  const decreaseCount = (id: string) => {
    dispatch(decreaseCountAction(id));
  };

  const addToConstructor = (index: number, item: TIngredient) => {
    dispatch(addToConstructorAction(index, item));
  };

  const removeFromConstructor = (index: number) => {
    dispatch(removeFromConstructorAction(index));
  };
  
  useEffect(() => {
    dispatch(fetchIngredientsAction());
    errorMessage && alert(`Во время запроса произошла ошибка: ${errorMessage}`);
  }, [errorMessage, fetchIngredientsAction, dispatch]);

  const addIngredient: TAddIngredient = (ingredient) => {    
    const length = constructorIngredients.length;
    const index = length === 1 ? length : length - 1;
    if (length === 0 || ingredient.type === "bun") {
      if (ingredient.type !== "bun") {
        alert(`Данный ингредиент не может лежать в основе бургера.
Пожалуйста выберите ингрединт из раздела "Булки".`);
        return;
      }

      if (length === 2) { 
        removeIngredient(length-2);     
        removeIngredient(0);
      } else if (length > 2) { 
        removeIngredient(length-1);     
        removeIngredient(0);
      }
      addToConstructor(0, ingredient);
      addToConstructor(length, ingredient);
      increaseCount(ingredient["_id"]);
      increaseCount(ingredient["_id"]);
      increaseTotalCost(ingredient.price * 2);
    } else {
      addToConstructor(index, ingredient);
      increaseCount(ingredient["_id"]);
      increaseTotalCost(ingredient.price);
    }
  }

  const removeIngredient: TRemoveIngredient = (index) => {
    const removedIngredient = constructorIngredients[index];
    decreaseCount(removedIngredient["_id"]);
    decreaseTotalCost(removedIngredient.price);
    removeFromConstructor(index);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngredients
        addIngredient={addIngredient}/>
      <BurgerConstructor
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}/>
    </DndProvider>
  )
};

export default MainPage;
