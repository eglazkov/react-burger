import React from 'react';
import ReactDOM from 'react-dom';
import appSpinnerStyles from './app-spinner.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Spinner from '../spinner/spinner';

const modalRoot = document.getElementById("modals");
 
const AppSpinner = () => {
  return ReactDOM.createPortal(
    (
      <>
        <Spinner className={appSpinnerStyles.spinner} isLoading={true}/>
        <ModalOverlay onClick={function(){}}/>
      </>
    ), modalRoot
  );
}
 
export default AppSpinner;
