import React, {useRef, useCallback, useEffect} from 'react';
import {useDrop} from "react-dnd";
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details';
import BurgerConstructorElement from '../burger-constructor-element';
import {useOrder, useConstructor, useIngredeints} from '../../services';
 
const BurgerConstructor = ({removeIngredient, addIngredient}) => {
  const dispatch = useDispatch();
  const myRef = useRef(null);  

  const [{totalCost, orderId, isShowOrderDetails, errorMessage},
    {fetchDataOrderAction, closeOrderDetailsAction}] = useOrder();
  const [{constructorIngredients, showDropLocation},{resetConstructorAction}] = useConstructor();
  const [ , {fetchIngredientsAction}] = useIngredeints();

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient-constructor",
    drop({ingredient}) {
      addIngredient(ingredient);
    },
    collect: monitor => ({
        isHover: monitor.isOver(),
    })
  });
  
  const firstIngredient = constructorIngredients[0];
  let lastIngredient = null;
  if (constructorIngredients.length > 1) {
    lastIngredient = constructorIngredients[constructorIngredients.length - 1];
  }

  const closeOrderDetails = useCallback(() => {
    dispatch(resetConstructorAction())
    dispatch(closeOrderDetailsAction());
    dispatch(fetchIngredientsAction());
  }, [closeOrderDetailsAction, resetConstructorAction, fetchIngredientsAction, dispatch]);

  const sendOrder = () => {
    dispatch(fetchDataOrderAction(constructorIngredients.map(item => item._id)))
  };
  
  useEffect(() => {
    errorMessage && alert(`Во время запроса произошла ошибка: ${errorMessage}`);
  }, [errorMessage]);
  
  return (       
    <>
    <section
    ishover={String(isHover || showDropLocation)}    
    className={`pl-4 text text_type_main-medium text_color_inactive ${burgerConstructorStyles.container}`}
    ref={dropTarget}>
        <div className={`mb-3 pr-1`}>
          {
            firstIngredient &&
            <BurgerConstructorElement
              className="mb-2"
              isFirst
              id={firstIngredient._id}
              price={firstIngredient.price}
              text={`${firstIngredient.name} (верх)`}
              thumbnail={firstIngredient["image_mobile"]}
            />
          }
          <div className={`${burgerConstructorStyles.tableWrapper}`} ref={myRef}>
            {constructorIngredients.filter((item, index, array) => index !== 0 && index !== array.length - 1)
              .map((addedIngredient, index, arr) => {
                return (
                  <BurgerConstructorElement
                    draggable
                    index={index}
                    id={addedIngredient._id}
                    key={`${addedIngredient._id}-${index}`}
                    className={arr.length - 1 !== index ? 'mb-2' : null}
                    handleClose={() => removeIngredient(index + 1)}
                    price={addedIngredient.price}
                    text={`${addedIngredient.name} (верх)`}
                    thumbnail={addedIngredient["image_mobile"]}
                  />
                );
              })
            }            
          </div>
          {
            lastIngredient &&
            <BurgerConstructorElement
              className="mt-2"
              id={lastIngredient._id}
              isLast
              price={lastIngredient.price}
              text={`${lastIngredient.name} (низ)`}
              thumbnail={lastIngredient["image_mobile"]}
            />
          }
        </div>
        {constructorIngredients.length > 0 && <div>
          <div className={`mt-1 ${burgerConstructorStyles.footer}`}>
            {totalCost}
            <CurrencyIcon/>            
            <div onClick={sendOrder}>
              <Button>Оформить заказ</Button>
            </div>
          </div>
        </div>}
      </section>
      {isShowOrderDetails &&
      <OrderDetails
        onClose={closeOrderDetails}
        orderId={orderId}
      />}    
    </>
  );
}

BurgerConstructor.propTypes = {
  removeIngredient: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired
};
 
export default BurgerConstructor;