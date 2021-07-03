import React, {FC} from 'react';
import appSpinnerStyles from './app-spinner.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Spinner from '../spinner/spinner';
 
const AppSpinner: FC = () => {
  return (
    <div className={appSpinnerStyles.spinner}>
      <Spinner isLoading={true}/>
      <ModalOverlay onClick={function(){}}/>
    </div>
  );
}
 
export default AppSpinner;
