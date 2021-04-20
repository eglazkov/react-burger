import React from 'react';
import PropTypes from 'prop-types';
import navigationItemStyles from './navigation-item.module.css';


const NavigationItem = (props) => {
  const {icon, caption} = props;
  return ( 
    <div className={`ml-3 mt-2 mr-3 mb-2 ${navigationItemStyles.container}`}>
      {icon}
      <span className="text text_type_main-default ml-1">{caption}</span>
    </div>
   );
}

NavigationItem.propTypes = {
  icon: PropTypes.element.isRequired,
  caption: PropTypes.string.isRequired
};
 
export default NavigationItem;