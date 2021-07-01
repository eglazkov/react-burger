import React, {FC} from 'react'; 
import ReactDOM from 'react-dom';
import {Modal} from '../../components';
import Order from '../order/order';
import orderModalStyles from './order-modal.module.css';

const modalRoot = document.getElementById("modals") as HTMLDivElement;

interface IOrderModal {
  onClose: () => void
};

const OrderModal: FC<IOrderModal> = ({onClose}) => {
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
 
export default OrderModal;
