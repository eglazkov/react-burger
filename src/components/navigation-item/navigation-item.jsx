import React from 'react';
import PropTypes from 'prop-types';
import navigationItemStyles from './navigation-item.module.css';


const NavigationItem = (props) => {
  const {icon, caption, className} = props;
  return ( 
    <div className={`ml-3 mt-2 mr-3 mb-2 ${navigationItemStyles.container} ${className}`}>
      {icon}
      <span className="text text_type_main-default ml-1">{caption}</span>
    </div>
   );
}

NavigationItem.propTypes = {
  icon: PropTypes.element.isRequired,
  caption: PropTypes.string.isRequired,
  className: PropTypes.string
};
 
export default NavigationItem;