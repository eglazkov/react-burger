import React from 'react'; 
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Modal} from '../../components';
import Order from '../order/order';
import orderModalStyles from './order-modal.module.css';

const modalRoot = document.getElementById("modals");

const OrderModal = ({onClose}) => {
  return ReactDOM.createPortal(
    (
      <Modal onClose={onClose}>
        <div className={orderModalStyles.container}>
          <Order />
        </div>        
      </Modal>
    ), modalRoot
  );
}

OrderModal.propTypes = {
  onClose: PropTypes.func.isRequired
};
 
export default OrderModal;
