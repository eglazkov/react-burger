import React from 'react';
import PropTypes from 'prop-types';
import orderCardStyles from './ingredient-icon.module.css';
 
const IngredientIcon = ({
  src,
  alt,
  count
}) => {
  
  return (
    <div
      count={count}
      className={`text text_type_digits-default ${orderCardStyles.ingredientIconBorder}`}>
        <img className={orderCardStyles.ingredientIcon} src={src} alt={alt} />        
    </div>
  );
}

IngredientIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  count: PropTypes.string
};
 
export default IngredientIcon;
