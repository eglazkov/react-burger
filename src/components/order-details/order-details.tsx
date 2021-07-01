import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import orderDetailsStyles from './order-details.module.css';
import Modal from '../modal/modal';
import done from '../../images/done.svg';

const modalRoot = document.getElementById("modals") as HTMLDivElement;

interface IOrderDetails {
  onClose: () => void,
  orderId: number
};
 
const OrderDetails: FC<IOrderDetails> = ({onClose, orderId}) => {
  return ReactDOM.createPortal(
    (
      <Modal onClose={onClose}>
        <div className={orderDetailsStyles.content}>
          <span className={`text text_type_digits-large mb-4 ${orderDetailsStyles.orderId}`}>{orderId}</span>
          <span className="text text_type_main-medium mb-5">идентификатор заказа</span>
          <img className="mt-5 mb-5" src={done} alt="done"/>
          <span className="mt-5 mb-1 text text_type_main-default">Ваш заказ начали готовить</span>
          <span className={`text text_type_main-default ${orderDetailsStyles.waiting}`}>Дождитесь готовности на орбитальной станции</span>
        </div>
      </Modal>
    ), modalRoot
  );
}
 
export default OrderDetails;
