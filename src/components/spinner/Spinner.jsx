import React from 'react';
import PropTypes from 'prop-types';
import spinnerStyles from './spinner.module.css';
 
const Spinner = ({isLoading = false}) => {
  return (
    isLoading && <div className={spinnerStyles.loader}>
    </div>
  );
}

Spinner.propTypes = {
  isLoading: PropTypes.bool
};
 
export default Spinner;
