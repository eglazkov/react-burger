import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import orderDetailsStyles from './order-details.module.css';
import Modal from '../modal';
import done from '../../images/done.svg';

const modalRoot = document.getElementById("modals");
 
const OrderDetails = ({caption, onClose, orderID}) => {
  return ReactDOM.createPortal(
    (
      <Modal {...{caption, onClose}}>
        <div className={orderDetailsStyles.content}>
          <span className={`text text_type_digits-large mb-4 ${orderDetailsStyles.orderID}`}>{orderID}</span>
          <span className="text text_type_main-medium mb-5">идентификатор заказа</span>
          <img className="mt-5 mb-5" src={done} alt="done"/>
          <span className="mt-5 mb-1 text text_type_main-default">Ваш заказ начали готовить</span>
          <span className={`text text_type_main-default ${orderDetailsStyles.waiting}`}>Дождитесь готовности на орбитальной станции</span>
        </div>
      </Modal>
    ), modalRoot
  );
}

OrderDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
  orderID: PropTypes.number.isRequired
};
 
export default OrderDetails;
