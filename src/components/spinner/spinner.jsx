import React from 'react';
import PropTypes from 'prop-types';
import spinnerStyles from './spinner.module.css';
 
const Spinner = ({isLoading = false, className, ...props}) => {
  return (
    isLoading && <div className={`${className ? className : ''} ${spinnerStyles.loader}`} {...props}>
    </div>
  );
}

Spinner.propTypes = {
  isLoading: PropTypes.bool
};
 
export default Spinner;
