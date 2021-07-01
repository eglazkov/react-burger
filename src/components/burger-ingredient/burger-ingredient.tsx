import React, {FC, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDrag} from "react-dnd";
import {useDispatch} from 'react-redux';
import burgerIngredientsStyles from './burger-ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useConstructor, history, TIngredient} from '../../services';

export type TBurgerIngredient = TIngredient & {
  addToConstructor?: () => void
};

const BurgerIngredient: FC<TBurgerIngredient> = ({
  _id,
  image,
  price,
  name,
  count=0,
  addToConstructor,
  ...details
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [,{toggleDropLoactionAction}] = useConstructor();

  const [{isDrag, didDrop}, dragRef] = useDrag({
    type: "ingredient-constructor",
    item: {ingredient: {
      _id, image, price, name, count,
      ...details
    }},    
    collect: monitor => ({
        isDrag: monitor.isDragging(),
        didDrop: monitor.didDrop()
    })
  });

  useEffect(() => {
    (isDrag || (!didDrop && !isDrag)) && dispatch(toggleDropLoactionAction(isDrag));
  }, [toggleDropLoactionAction, isDrag, didDrop, dispatch]);
  

  return ( 
    <>
      <div
        data-testid={`ingredient-${_id}`}
        ref={dragRef}
        onClick={function(e) {
          const target = e.target as HTMLDivElement;
          if (target.tagName !== 'P' &&
          (target.children[0] ? target.children[0].tagName !== 'P' : true)) {
            history.push({pathname: `/ingredients/${_id}`, state: {background: location}});
          }
        }}
        className={`mb-4 ${burgerIngredientsStyles.ingredient}`}>
        {count >= 0 && <span
          data-testid="counter"
          className={burgerIngredientsStyles.counter}
          onClick={() => addToConstructor && addToConstructor()}>
            <Counter count={count}/>
        </span>}
        <img
          className="pl-2 pr-2 mb-1"
          src={image} alt={image}/>
        <div
          className={`mb-1 ${burgerIngredientsStyles.cost}`}>
            {price}
            <CurrencyIcon type="primary"/>
        </div>
        <div className="text text_type_main-default pb-3">
          {name}
        </div>
      </div>
    </>
    );
}
 
export default BurgerIngredient;