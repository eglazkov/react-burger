import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor-element.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
 
const BurgerConstructorElement = ({
  handleClose,
  price,
  text,
  thumbnail,
  isFirst = false,
  isLast = false,
  draggable = false,
  key,
  className
}) => {
  
  return (       
    <div 
      key={`${key}`}
      className={`text text_type_main-default ${burgerConstructorStyles.ingredientWrapper} ${className}`}>
      <div
        edge={String(!draggable)}
        className={`mr-2 ${burgerConstructorStyles.dragHandle}`}>
        <DragIcon />
      </div>
      <ConstructorElement
        type={isFirst ? 'top' : isLast ? 'bottom' : null}
        isLocked={isFirst || isLast}
        handleClose={handleClose}
        price={price}
        text={text}
        thumbnail={thumbnail}/>
    </div>
  );
}

BurgerConstructorElement.propTypes = {
  handleClose: PropTypes.func,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  draggable: PropTypes.bool,
  className: PropTypes.string
};
 
export default BurgerConstructorElement;