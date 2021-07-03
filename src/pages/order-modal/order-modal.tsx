import React, {FC} from 'react';
import {Modal} from '../../components';
import Order from '../order/order';
import orderModalStyles from './order-modal.module.css';

interface IOrderModal {
  onClose: () => void
};

const OrderModal: FC<IOrderModal> = ({onClose}) => {
  return (
    <Modal onClose={onClose}>
      <div className={orderModalStyles.container}>
        <Order />
      </div>        
    </Modal>
  );
}
 
export default OrderModal;
