/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useMemo} from 'react';
import {useDispatch} from 'react-redux'; 
import {v4 as uuidv4} from 'uuid';
import {formatRelative} from 'date-fns'
import ruLocale from "date-fns/locale/ru";
import {useParams, useLocation} from 'react-router-dom';
import orderStyles from './order.module.css';
import {
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Spinner, IngredientIcon} from '../../components';
import {useWebsocket, useIngredeints, getStatusName} from '../../services';
import {WS_CONNECTION_START} from '../../services/websocket/action-types';
const _ = require('lodash');

export default function Order() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {id} = useParams();
  const [orderData, setOrderData] = useState(null);
  const [{ingredients},
    {fetchIngredientsAction}] = useIngredeints();
  const [{feedData, historyData}] = useWebsocket();
  const orders = historyData.orders && historyData.orders.length > 0 ?
  historyData.orders : feedData.orders || [];
  const order = useMemo(() => _.keyBy(orders, '_id'), [orders]);
  const ingredientsMap = useMemo(() => _.keyBy(ingredients, '_id'), [ingredients]);
  const totalCost = useMemo(() => {
    return orderData && orderData.ingredients.reduce((acc, cur) => {
      return acc + (ingredientsMap[cur] ? Number(ingredientsMap[cur].price) : 0);
    }, 0);
  }, [orderData]);

  useEffect(() => {
    setOrderData(order[id]);
  }, [id, order, ingredients, ingredientsMap]);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAction());
    }
    if (!location.state || !location.state.background) {
      dispatch({type: WS_CONNECTION_START});
    }
  }, []);
  return (
    orderData ? <div className={orderStyles.container}>
      <span className={`${orderStyles.orderId} text text_type_digits-default`}>
        #{orderData.number}
      </span>
      <div className="text text_type_main-medium">
        {orderData.name}
      </div>
      {
        orderData.status &&
        <span
        className={
          `mt-2 mb-3 text text_type_main-default
          ${orderData.status === 'done' ? orderStyles.done : null}`}>
            {getStatusName(orderData.status)}
        </span>
      }
      <span className={`${orderStyles.orderStatus} text text_type_main-default`}>{orderData.orderStatus}</span>
      <span className="text text_type_main-medium">Состав:</span>
      <div className={`${orderStyles.contains}`}>
        <ul>
          {
            orderData.ingredients.map((ingredient) => (
              <li key={uuidv4()} className="pr-3 pt-1 pb-1">
                <div className={`${orderStyles.ingredientTitle}`}>
                  <IngredientIcon
                    src={ingredientsMap[ingredient].image_mobile}
                    alt={ingredientsMap[ingredient].name}
                  />
                  <span className="text text_type_main-default ml-2">{ingredientsMap[ingredient].name}</span>
                </div>
                <span className={`ml-3 text text_type_digits-default ${orderStyles.cost}`}>
                  {ingredientsMap[ingredient].price}
                  <CurrencyIcon />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
     <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={`text text_type_main-default ${orderStyles.inactive}`}>
          {
            formatRelative(new Date(orderData.createdAt), new Date(), { addSuffix: true, locale: ruLocale})
          }
        </div>
        <span className={`ml-3 text text_type_digits-default ${orderStyles.cost}`}>
          {totalCost}
          <CurrencyIcon />
        </span>
     </div>
    </div> : <Spinner />
  )
}
