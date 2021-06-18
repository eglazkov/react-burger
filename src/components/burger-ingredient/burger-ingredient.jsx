import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {useDrag} from "react-dnd";
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useConstructor, history} from '../../services';

const BurgerIngredient = ({_id, image, price, name, count=0, addToConstructor, ...details}) => {
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
        ref={dragRef}
        onClick={function(e) {
          if (e.target.tagName !== 'P' &&
          (e.target.children[0] ? e.target.children[0].tagName !== 'P' : true)) {
            history.push({pathname: `/ingredients/${_id}`, state: {background: location}});
          }
        }}
        isdrag={String(isDrag)}
        className={`mb-4 ${burgerIngredientsStyles.ingredient}`}>
        {count >= 0 && <span className={burgerIngredientsStyles.counter} onClick={addToConstructor}>
          <Counter count={count}/>
        </span>}
        <img
          className="pl-2 pr-2 mb-1"
          src={image} alt={image}/>
        <div
          className={`mb-1 ${burgerIngredientsStyles.cost}`}>
            {price}
            <CurrencyIcon/>
        </div>
        <div className="text text_type_main-default pb-3">
          {name}
        </div>
      </div>
    </>
    );
}

BurgerIngredient.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number,
  addToConstructor: PropTypes.func.isRequired
};
 
export default BurgerIngredient;