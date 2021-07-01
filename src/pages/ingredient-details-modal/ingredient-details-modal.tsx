import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import {Modal} from '../../components';
import IngredientDetails from '../ingredient-details/ingredient-details';

const modalRoot = document.getElementById("modals") as HTMLDivElement;

interface IIngredientDetailsModal {
  caption: string,
  onClose: () => void
};

const IngredientDetailsModal: FC<IIngredientDetailsModal> = ({caption, onClose}) => {
  
  return ReactDOM.createPortal(
    (
      <Modal {...{caption, onClose}}>
        <IngredientDetails />
      </Modal>
    ), modalRoot
  );
}
 
export default IngredientDetailsModal;
