import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
 
const Modal = ({caption, children, onClose}) => {
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        onClose();
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
  },[onClose])

  return (
    <>
      <div
        onClick={function(e) {
          e.stopPropagation();
        }}
        className={modalStyles.container}>
        <div className={`pl-10 pt-10 pr-10 pb-10 ${modalStyles.modal}`}>
          <div className={modalStyles.modalHeader}>
            <span className="text text_type_main-large">{caption}</span>
            <button className={modalStyles.closeButton} onClick={function(e) {
              e.stopPropagation();
              onClose && onClose();
            }}>
              <CloseIcon/>
            </button>          
          </div>
          <div className={modalStyles.modalContent}>
            {children}
          </div>
        </div>
      </div>
    <ModalOverlay onClick={onClose}/>
    </>
  );
}

Modal.propTypes = {
  caption: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
 
export default Modal;
