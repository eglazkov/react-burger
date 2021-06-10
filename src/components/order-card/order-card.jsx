import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom'; 
import * as moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import orderCardStyles from './order-card.module.css';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from '../ingredient-icon';
 
const OrderCard = ({
  orderDate,
  orderName,
  orderCost,
  orderIngredients,
  id
}) => {
  const history = useHistory();
  const goToOrder = useCallback(
    () => {
      history.push({pathname: `/feed/${id}`});
    },
    [id, history]
  );
  return (
    <div className={`mb-4 p-3 ${orderCardStyles.wrapper}`} onClick={goToOrder}>
      <div className={`${orderCardStyles.orderTitle}`}>        
        <span className={`text text_type_digits-default`}>{`#${id}`}</span>
        <span className={`text text_type_main-default ${orderCardStyles.inactive}`}>
          {moment().calendar((orderDate), {
              sameDay: '[Сегодня], HH:mm Z',
              nextDay: '[Вчера], HH:mm Z',
              nextWeek: 'dddd, HH:mm Z',
              lastDay: '[Yesterday]',
              lastWeek: '[Last] dddd',
              sameElse: 'DD.MM.YYYY, HH:mm Z'
          })}
        </span>
      </div>
      <span className={`mt-3 text text_type_main-medium`}>{orderName}</span>
      <div className={`mt-3 ${orderCardStyles.ingredients}`}>
        <div>
          {orderIngredients.map((ingredient, i) => (
            i <= 5 ? <IngredientIcon
              key={i}
              count={i === 5 ? `+${orderIngredients.length - 5}` : null}
              src={ingredient.image_mobile} alt={ingredient.name}
            /> : null
          ))}
        </div>
        <span className={`ml-3 text text_type_digits-default ${orderCardStyles.cost}`}>
          {orderCost}
          <CurrencyIcon />
        </span>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  orderDate: PropTypes.instanceOf(moment).isRequired,
  orderName: PropTypes.string.isRequired,
  orderCost: PropTypes.number.isRequired,
  orderIngredients: PropTypes.arrayOf(PropTypes.shape({
    image_mobile: PropTypes.string
  })).isRequired,
  id: PropTypes.string.isRequired
};
 
export default OrderCard;
