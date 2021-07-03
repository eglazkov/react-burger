import React, {FC} from 'react';
import navigationItemStyles from './navigation-item.module.css';

interface INavigationItem {
  icon: JSX.Element,
  caption: string,
  className?: string
}

const NavigationItem: FC<INavigationItem> = ({icon, caption, className}) => {
  return ( 
    <div className={`ml-3 mt-2 mr-3 mb-2 ${navigationItemStyles.container} ${className}`}>
      {icon}
      <span className="text text_type_main-default ml-1">{caption}</span>
    </div>
   );
}
 
export default NavigationItem;