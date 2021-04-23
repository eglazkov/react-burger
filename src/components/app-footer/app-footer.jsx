import React from 'react';
import PropTypes from 'prop-types';
import appFooterStyles from './app-footer.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';

// TODO: add route to page of order

const AppFooter = (props) => {
  const {total} = props;
  return ( 
    <footer>
      <div className={`text text_type_main-default mb-2 mt-2 ${appFooterStyles.container}`}>
        <div className={`${appFooterStyles.footer}`}>
          {total}
          <CurrencyIcon/> 
        </div>           
        <Button size="small">
          <div className="text text_type_main-default">Смотреть заказ</div>
        </Button>   
      </div>
    </footer>
   );
}

AppFooter.prototype = {
  total: PropTypes.number.isRequired
};
 
export default AppFooter;