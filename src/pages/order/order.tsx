/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux'; 
import {v4 as uuidv4} from 'uuid';
import {formatRelative} from 'date-fns'
import ruLocale from "date-fns/locale/ru";
import {useParams} from 'react-router-dom';
import orderStyles from './order.module.css';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientIcon, Spinner} from '../../components';
import {useOrder, useIngredeints, getStatusName} from '../../services';
const _ = require('lodash');

const Order: FC = () => {
  const dispatch = useDispatch();
  const {id} = useParams<{id: string}>();
  const [{isOrderLoading, order}, {getOrderByIdAction}] = useOrder();
  const [{ingredients},
    {fetchIngredientsAction}] = useIngredeints();
  const ingredientsMap = useMemo(() => _.keyBy(ingredients, '_id'), [ingredients]);
  const totalCost = useMemo(() => {
    return order && order.ingredients.reduce((acc: number, cur: string) => {
      return acc + (ingredientsMap[cur] ? Number(ingredientsMap[cur].price) : 0);
    }, 0);
  }, [order]);

  useEffect(() => {
    dispatch(fetchIngredientsAction())
    .then(() => {
      dispatch(getOrderByIdAction(id));
    });
  }, []);
  return (
    isOrderLoading || _.isEmpty(ingredientsMap, true) || !order?
    <Spinner isLoading /> :
    <div className={orderStyles.container}>
      <span className={`${orderStyles.orderId} text text_type_digits-default`}>
        #{order.number}
      </span>
      <div className="text text_type_main-medium">
        {order.name}
      </div>
      {
        order.status &&
        <span
        className={
          `mt-2 mb-3 text text_type_main-default
          ${order.status === 'done' ? orderStyles.done : null}`}>
            {getStatusName(order.status)}
        </span>
      }
      <span className={`${orderStyles.orderStatus} text text_type_main-default`}>{order.orderStatus}</span>
      <span className="text text_type_main-medium">Состав:</span>
      <div className={`${orderStyles.contains}`}>
        <ul>
          {
            order.ingredients.map((ingredient: string) => (
              ingredientsMap[ingredient] && <li key={uuidv4()} className="pr-3 pt-1 pb-1">
                <div className={`${orderStyles.ingredientTitle}`}>
                  <IngredientIcon
                    src={ingredientsMap[ingredient].image_mobile}
                    alt={ingredientsMap[ingredient].name}
                  />
                  <span className="text text_type_main-default ml-2">{ingredientsMap[ingredient].name}</span>
                </div>
                <span className={`ml-3 text text_type_digits-default ${orderStyles.cost}`}>
                  {ingredientsMap[ingredient].price}
                  <CurrencyIcon type="primary" />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`text text_type_main-default ${orderStyles.inactive}`}>
          {
            formatRelative(new Date(order.createdAt), new Date(), {locale: ruLocale})
          }
        </div>
        <span className={`ml-3 text text_type_digits-default ${orderStyles.cost}`}>
          {totalCost}
          <CurrencyIcon type="primary"/>
        </span>
     </div>
    </div>
  )
}

export default Order;
