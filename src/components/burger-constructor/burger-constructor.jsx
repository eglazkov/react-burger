import React, {useState, useEffect, useRef, useContext} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details';
import {AppContext} from '../../services/app-context';
import {API_URL} from '../../constants';
 
/*
  TODO: drag'n'drop
*/
const BurgerConstructor = ({removeIngredient}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [orderData, setOrderData] = useState({});
  const myRef = useRef(null);
  const {totalCost, addedIngredients, setIsOrderCreating} = useContext(AppContext);
  
  useEffect(() => {
    myRef.current.scrollTop = myRef.current.scrollHeight;
  });
  
  const firstIngredient = addedIngredients[0];
  let lastIngredient = null;
  if (addedIngredients.length > 1) {
    lastIngredient = addedIngredients[addedIngredients.length - 1];
  }

  const openOrderDetails = () => {
    setIsOrderCreating(true);
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      body: JSON.stringify({
        ingredients: addedIngredients.map(item => item._id)
      })
    }).then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
      .then(resp => {
        setOrderData({orderID: resp.order.number});
        setIsOrderCreating(false);
        setShowDetails(true);
      }).catch(error => {
        setIsOrderCreating(false);        
        alert(`Во время запроса произошла ошибка: ${error}`);
      });
  }

  const closeOrderDetails = () => {
    [...addedIngredients].forEach(() => {      
      removeIngredient(0);
    });
    setShowDetails(false);
  }
  
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
            {addedIngredients.filter((item, index, array) => index !== 0 && index !== array.length - 1)
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
        {addedIngredients.length > 0 && <div>
          <div className={`mt-1 ${burgerConstructorStyles.footer}`}>
            {totalCost}
            <CurrencyIcon/>            
            <div onClick={function() {              
              openOrderDetails();
            }}>
              <Button>Оформить заказ</Button>
            </div>
          </div>
        </div>}
      </section>
      {showDetails &&
      <OrderDetails
        onClose={closeOrderDetails}
        {...orderData}
      />}
    </>
  );
}

BurgerConstructor.propTypes = {
  removeIngredient: PropTypes.func.isRequired
};
 
export default BurgerConstructor;