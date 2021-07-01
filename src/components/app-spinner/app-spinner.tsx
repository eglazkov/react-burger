import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import appSpinnerStyles from './app-spinner.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Spinner from '../spinner/spinner';

const modalRoot = document.getElementById("modals") as HTMLDivElement;
 
const AppSpinner: FC = () => {
  return ReactDOM.createPortal(
    (
      <div className={appSpinnerStyles.spinner}>
        <Spinner isLoading={true}/>
        <ModalOverlay onClick={function(){}}/>
      </div>
    ), modalRoot
  );
}
 
export default AppSpinner;
