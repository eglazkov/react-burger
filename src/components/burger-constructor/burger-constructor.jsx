import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details';
import {useOrder, useConstructor, useIngredeints} from '../../services';
 
/*
  TODO: drag'n'drop
*/
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
            <div 
                key={`${firstIngredient._id}-first`}
                className={`mb-2 text text_type_main-default ${burgerConstructorStyles.ingredientWrapper}`}>
                <div
                  edge="true"
                  className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  price={firstIngredient.price}
                  text={`${firstIngredient.name} (верх)`}
                  thumbnail={firstIngredient["image_mobile"]}/>
            </div>
          }
          <div className={`${burgerConstructorStyles.tableWrapper}`} ref={myRef}>
            {constructorIngredients.filter((item, index, array) => index !== 0 && index !== array.length - 1)
              .map((addedIngredient, index, arr) => {
                return (
                  <div 
                    key={`${addedIngredient._id}-${index}`}
                    className={`mt-2 text text_type_main-default ${burgerConstructorStyles.ingredientWrapper}`}>
                    <div
                      className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>                    
                      <DragIcon />
                    </div>
                    <ConstructorElement
                      handleClose={() => removeIngredient(index + 1)}
                      price={addedIngredient.price}
                      text={addedIngredient.name}
                      thumbnail={addedIngredient["image_mobile"]}/>
                  </div>
                );
              })
            }            
          </div>
          {
            lastIngredient &&
            <div 
                key={`${firstIngredient._id}-last`}
                className={`mt-2 text text_type_main-default ${burgerConstructorStyles.ingredientWrapper}`}>
                <div
                  edge="true"
                  className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>
                  <DragIcon />
                </div>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  price={lastIngredient.price}
                  text={`${lastIngredient.name} (низ)`}
                  thumbnail={lastIngredient["image_mobile"]}/>

            </div>
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