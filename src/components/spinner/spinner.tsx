import React, {FC} from 'react';
import spinnerStyles from './spinner.module.css';

interface ISpinner {
  isLoading: boolean,
  className?: string
}

const Spinner: FC<ISpinner> = ({isLoading = false, className, ...props}) => {
  return (
    isLoading ? <div className={`${className ? className : ''} ${spinnerStyles.loader}`} {...props}>
    </div> : null
  );
}
 
export default Spinner;
