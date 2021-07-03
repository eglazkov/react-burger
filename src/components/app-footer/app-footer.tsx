import React, {FC} from 'react';
import appFooterStyles from './app-footer.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useOrder} from '../../services';

const AppFooter: FC = () => {
  const [{totalCost}] = useOrder();
  return ( 
    <footer>
      <div className={`text text_type_main-default mb-2 mt-2 ${appFooterStyles.container}`}>
        <div
          className={`${appFooterStyles.footer}`}
          data-testid="price">
          {totalCost}
          <CurrencyIcon type="primary" />
        </div>           
        <Button size="small">
          <div className="text text_type_main-default">Смотреть заказ</div>
        </Button>   
      </div>
    </footer>
   );
}
 
export default AppFooter;