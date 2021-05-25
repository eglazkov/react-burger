import React, {useState, useCallback, useEffect} from 'react';
import {useDrag} from "react-dnd";
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details';

import {useIngredeints, useConstructor} from '../../services';

const BurgerIngredient = ({_id, image, price, name, count=0, addToConstructor, ...details}) => {
  const dispatch = useDispatch();
  const [{showIngredientDetails, ingredientDetails},
    {openDetailsAction, closeDetailsAction}] = useIngredeints();
    const [,{toggleDropLoactionAction}] = useConstructor();
  const [renderDetails, setRenderDetails] = useState(false);

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
  }, [toggleDropLoactionAction, isDrag, dispatch]);
  
  const openDetails = useCallback(() => {
    dispatch(openDetailsAction(details));
    setRenderDetails(true);
  }, [dispatch, openDetailsAction, details]);

  const closeDetails = useCallback(() => {
    dispatch(closeDetailsAction());
    setRenderDetails(false);
  }, [closeDetailsAction, dispatch]);

  return ( 
    <>
      <div
        ref={dragRef}
        onClick={function(e) {
          if (e.target.tagName !== 'P' &&
          (e.target.children[0] ? e.target.children[0].tagName !== 'P' : true)) {
            openDetails();
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
      {
        showIngredientDetails && renderDetails &&
        <IngredientDetails
          caption="Детали ингредиента"
          onClose={closeDetails}
          name={name}
          description={`API не возвращает описание ингредиента`}
          {...ingredientDetails}
        />     
      }
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