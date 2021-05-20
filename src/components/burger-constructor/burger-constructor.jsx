import React, {useState, useEffect, useRef, useCallback} from 'react';
import {DndProvider, useDrag} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details';
import BurgerConstructorElement from '../burger-constructor-element';
import {useOrder, useConstructor, useIngredeints} from '../../services';
 
const BurgerConstructor = ({removeIngredient}) => {
  const dispatch = useDispatch();
  const myRef = useRef(null);  

  const [{totalCost, orderId, isShowOrderDetails},
    {fetchDataOrderAction, closeOrderDetailsAction}] = useOrder();
  const [{constructorIngredients}, {resetConstructorAction}] = useConstructor();
  const [ , {fetchIngredientsAction}] = useIngredeints();
  
  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
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
  
  return (       
    <>
      <section className={`pl-4 ${burgerConstructorStyles.container}`}>
        <div className={`mb-3 pr-1`}>
          {
            firstIngredient &&
            <BurgerConstructorElement
              className="mb-2"
              isFirst
              price={firstIngredient.price}
              text={`${firstIngredient.name} (верх)`}
              thumbnail={firstIngredient["image_mobile"]}
            />
          }
          {/* drop target */}
          <DndProvider backend={HTML5Backend}>
            <div className={`${burgerConstructorStyles.tableWrapper}`} ref={myRef}>
              {constructorIngredients.filter((item, index, array) => index !== 0 && index !== array.length - 1)
                .map((addedIngredient, index, arr) => {
                  return (
                    // drag item
                    <BurgerConstructorElement
                      draggable
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
          </DndProvider>
          {
            lastIngredient &&
            <BurgerConstructorElement
              className="mt-2"
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
  removeIngredient: PropTypes.func.isRequired
};
 
export default BurgerConstructor;