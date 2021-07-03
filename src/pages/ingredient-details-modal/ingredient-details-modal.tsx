import React, {FC} from 'react';
import {Modal} from '../../components';
import IngredientDetails from '../ingredient-details/ingredient-details';


interface IIngredientDetailsModal {
  caption: string,
  onClose: () => void
};

const IngredientDetailsModal: FC<IIngredientDetailsModal> = ({caption, onClose}) => {
  
  return (
    <Modal {...{caption, onClose}}>
      <IngredientDetails />
    </Modal>
  );
}
 
export default IngredientDetailsModal;
