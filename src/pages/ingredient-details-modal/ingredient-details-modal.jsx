import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from '../../components/modal';
import IngredientDetails from '../ingredient-details';

const modalRoot = document.getElementById("modals");
 
const IngredientDetailsModal = ({caption, onClose}) => {
  
  return ReactDOM.createPortal(
    (
      <Modal {...{caption, onClose}}>
        <IngredientDetails />
      </Modal>
    ), modalRoot
  );
}

IngredientDetailsModal.propTypes = {
  caption: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired  
}
 
export default IngredientDetailsModal;
