import React, {useCallback, useMemo} from 'react';
import {v4 as uuidv4} from 'uuid';
import {formatRelative} from 'date-fns'
import ruLocale from "date-fns/locale/ru";
import PropTypes from 'prop-types';
import orderCardStyles from './order-card.module.css';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import {getStatusName} from '../../services';
 
const OrderCard = ({
  createdAt,
  name,
  status,
  showStatus = true,  
  ingredients,
  changeLocation,
  ingredientsMap = {},
  number,
  _id
}) => {
  const goToOrder = useCallback(
    () => {
      changeLocation({number});
    },
    [changeLocation, number]
  );
  const totalCost = useMemo(() => {
    return ingredients.reduce((acc, cur) => {
      return acc + (ingredientsMap[cur] ? Number(ingredientsMap[cur].price) : 0);
    }, 0);
  }, [ingredientsMap, ingredients]);

  return (
    <div className={`mb-4 p-6 ${orderCardStyles.wrapper}`} onClick={goToOrder}>
      <div className={`${orderCardStyles.orderTitle}`}>        
        <span className={`text text_type_digits-default`}>{`#${number}`}</span>
        <span className={`text text_type_main-default ${orderCardStyles.inactive}`}>
          {
            formatRelative(new Date(createdAt), new Date(), { addSuffix: true, locale: ruLocale})
          }
        </span>
      </div>
      <span className={`mt-3 text text_type_main-medium`}>{name}</span>
      {
        showStatus && status &&
        <span
        className={
          `mt-2 mb-3 text text_type_main-default
          ${status === 'done' ? orderCardStyles.done : null}`}>
            {getStatusName(status)}
        </span>
      }
      <div className={`mt-3 ${orderCardStyles.ingredients}`}>
        <div>
          {ingredients.map((ingredient, i) => (
            i <= 5 ? <IngredientIcon
              key={uuidv4()}
              count={i === 5 ? `+${ingredients.length - 5}` : null}
              src={ingredientsMap[ingredient] && ingredientsMap[ingredient].image_mobile} alt={ingredient}
            /> : null
          ))}
        </div>
        <span className={`ml-3 text text_type_digits-default ${orderCardStyles.cost}`}>
          {totalCost}
          <CurrencyIcon />
        </span>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  _id: PropTypes.string.isRequired,
  changeLocation: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  showStatus: PropTypes.bool
};
 
export default OrderCard;
