import React, {Component} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
 
/*
  TODO: drag'n'drop
*/
class BurgerConstructor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.myRef = React.createRef();
  }

  componentDidUpdate() {    
    this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
  }

  render() { 
    const {addedIngredients, removeIngredient, total} = this.props;
    const firstIngredient = addedIngredients[0];
    let lastIngredient = null;
    if (addedIngredients.length > 1) {
      lastIngredient = addedIngredients[addedIngredients.length - 1];
    }
    return (       
      <section className={`pl-4 ${burgerConstructorStyles.container}`}>
        <div className={`mb-3 pr-1`}>
          {
            firstIngredient &&
            <div 
                key={`${firstIngredient._id}-first`}
                className={`mb-2 text text_type_main-default ${burgerConstructorStyles.ingredientWrapper}`}>
                <div
                  style={{visibility: 'hidden'}}
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
          <div className={`${burgerConstructorStyles.tableWrapper}`} ref={this.myRef}>
            {addedIngredients.filter((item, index, array) => index !== 0 && index !== array.length - 1)
              .map((addedIngredient, index, arr) => {
                return (
                  <div 
                    key={`${addedIngredient._id}-${index}`}
                    className={`mt-2 text text_type_main-default ${burgerConstructorStyles.ingredientWrapper}`}>
                    <div
                      style={{visibility: `${arr.length <= 1 ? 'hidden' : 'visible'}`}}
                      className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>                    
                      <DragIcon />
                    </div>
                    <ConstructorElement
                      handleClose={() => removeIngredient(index)}
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
                  style={{visibility: 'hidden'}}
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
            {total}
            <CurrencyIcon/>            
            <Button>Оформить заказ</Button>
          </div>
        </div>}
      </section>
     );
  }
}

BurgerConstructor.propTypes = {
  addedIngredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    count: PropTypes.number
  })),
  removeIngredient: PropTypes.func.isRequired,
  total: PropTypes.number
};
 
export default BurgerConstructor;