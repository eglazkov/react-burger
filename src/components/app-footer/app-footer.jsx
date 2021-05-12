import React, {useContext} from 'react';
import appFooterStyles from './app-footer.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {AppContext} from '../../services/app-context';


// TODO: add route to page of order

const AppFooter = (props) => {
  const {totalCost} = useContext(AppContext);
  return ( 
    <footer>
      <div className={`text text_type_main-default mb-2 mt-2 ${appFooterStyles.container}`}>
        <div className={`${appFooterStyles.footer}`}>
          {totalCost}
          <CurrencyIcon/> 
        </div>           
        <Button size="small">
          <div className="text text_type_main-default">Смотреть заказ</div>
        </Button>   
      </div>
    </footer>
   );
}
 
export default AppFooter;