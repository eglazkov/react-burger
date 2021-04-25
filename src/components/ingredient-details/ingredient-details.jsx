import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';
import Modal from '../modal';

const modalRoot = document.getElementById("modals");
 
const IngredientDetails = ({caption, onClose, ...details}) => {
  return ReactDOM.createPortal(
    (
      <Modal {...{caption, onClose}}>
        <div className={ingredientDetailsStyles.content}>
          <img className="mb-2" src={details.image_large} alt={details.name}/>
          <span className="text text_type_main-medium mb-4">{details.name}</span>
          <span className="text text_type_main-default mb-5">{details.description}</span>
          <div className={`mt-5 mb-5 ${ingredientDetailsStyles.energy}`}>
            <div className={ingredientDetailsStyles.energyItem}>
              <span className={`text text_type_main-default
              ${ingredientDetailsStyles.energyItem__caption}`}>Калории, ккал</span>
              <span className={`text text_type_digits-default mt-1
              ${ingredientDetailsStyles.energyItem__value}`}>{details.calories}</span>
            </div>
            <div className={ingredientDetailsStyles.energyItem}>
              <span className={`text text_type_main-default
              ${ingredientDetailsStyles.energyItem__caption}`}>Белки, г</span>
              <span className={`text text_type_digits-default mt-1
              ${ingredientDetailsStyles.energyItem__value}`}>{details.proteins}</span>
            </div>
            <div className={ingredientDetailsStyles.energyItem}>
              <span className={`text text_type_main-default
              ${ingredientDetailsStyles.energyItem__caption}`}>Жиры, г</span>
              <span className={`text text_type_digits-default mt-1
              ${ingredientDetailsStyles.energyItem__value}`}>{details.fat}</span>
            </div>
            <div className={ingredientDetailsStyles.energyItem}>
              <span className={`text text_type_main-default
              ${ingredientDetailsStyles.energyItem__caption}`}>Углеводы, г</span>
              <span className={`text text_type_digits-default mt-1
              ${ingredientDetailsStyles.energyItem__value}`}>{details.carbohydrates}</span>
            </div>
          </div>
        </div>
      </Modal>
    ), modalRoot
  );
}

IngredientDetails.propTypes = {
  caption: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  image_large: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
}
 
export default IngredientDetails;
