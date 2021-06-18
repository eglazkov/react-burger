import React, {useEffect, useState} from 'react'; 
import {v4 as uuidv4} from 'uuid';
import {formatRelative} from 'date-fns'
import ruLocale from "date-fns/locale/ru";
import {useParams} from 'react-router-dom';
import orderStyles from './order.module.css';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {getOrderById} from '../feed';
import {IngredientIcon} from '../../components';

export default function Order() {
  const {id} = useParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    setOrderData(getOrderById(id));
  }, [id])
  return (
    orderData && <div className={orderStyles.container}>
      <span className={`${orderStyles.orderId} text text_type_digits-default`}>
        #{orderData.id}
      </span>
      <div className="text text_type_main-medium">
        {orderData.orderName}
      </div>
      <span className={`${orderStyles.orderStatus} text text_type_main-default`}>{orderData.orderStatus}</span>
      <span className="text text_type_main-medium">Состав:</span>
      <div className={`${orderStyles.contains}`}>
        <ul>
          {
            orderData.orderIngredients.map((ingredient) => (
              <li key={uuidv4()} className="pr-3 pt-1 pb-1">
                <div className={`${orderStyles.ingredientTitle}`}>
                  <IngredientIcon
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                  <span className="text text_type_main-default ml-2">{ingredient.name}</span>
                </div>
                <span className={`ml-3 text text_type_digits-default ${orderStyles.cost}`}>
                  {ingredient.price}
                  <CurrencyIcon />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
      <div className={`text text_type_main-default ${orderStyles.inactive}`}>
        {
          formatRelative(new Date(orderData.orderDate), new Date(), { addSuffix: true, locale: ruLocale})
        }
      </div>
    </div>
  )
}
