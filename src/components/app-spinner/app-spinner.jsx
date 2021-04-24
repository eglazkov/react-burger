import React from 'react';
import ReactDOM from 'react-dom';
import appSpinnerStyles from './app-spinner.module.css';
import ModalOverlay from '../modal-overlay';
import Spinner from '../spinner';

const modalRoot = document.getElementById("modals");
 
const ApppSpinner = ({caption, onClose, orderID}) => {
  return ReactDOM.createPortal(
    (
      <>
        <Spinner className={appSpinnerStyles.spinner} isLoading={true}/>
        <ModalOverlay onClick={()=>{}}/>
      </>
    ), modalRoot
  );
}
 
export default ApppSpinner;
