/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useMemo} from 'react';
import {useDispatch} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {useLocation} from 'react-router-dom';
import feedStyles from './feed.module.css';
import {AppSpinner, OrderCard} from '../../components';
import {history} from '../../services';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_END,
  WS_SEND_PONG_MESSAGE
} from '../../services/websocket/action-types';
import {useWebsocket, useIngredeints} from '../../services';
const _ = require('lodash');

export default function Feed() {
  const dispatch = useDispatch();
  const formatAmount = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0      
  }).format;
  const location = useLocation(); 
  const [{ingredients},
    {fetchIngredientsAction}] = useIngredeints();
  const [{feedData, wsConnected = false}] = useWebsocket();
  const {orders, total, totalToday} = feedData;
  const ingredientsMap = useMemo(() => _.keyBy(ingredients, '_id'), [ingredients]);
  const completedOrders = useMemo(() => {
    return orders.filter(order => order.status === 'done');
  }, [orders]);
  const inProgressOrders = useMemo(() => {
    return orders.filter(order => order.status === 'pending');
  }, [orders]);

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START});
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAction());
    }
    const pingPong = setInterval(() => {
      dispatch({type: WS_SEND_PONG_MESSAGE})
    }, 10000);
    return () => {
      clearInterval(pingPong);
      dispatch({type: WS_CONNECTION_END});
    };
  }, []);
  return (
    wsConnected ? <div className={feedStyles.container}>
      <div className={feedStyles.feedContainer}>
        <div className="mb-4 text text_type_main-large">Лента заказов</div>
        <div className={`${feedStyles.feedList}`}>
          {
            orders.map((order) => (
              ingredientsMap && <OrderCard
                changeLocation={({number: id}) => {                
                  history.push({pathname: `/feed/${id}`, state: {background: location}});
                }}
                key={uuidv4()}
                ingredientsMap={ingredientsMap}
                {...order}
              />
            ))
          }
        </div>
      </div>
      <div className={`${feedStyles.stats} ml-5`}>
        <div className={`${feedStyles.table}`}>
          <div className="pr-5">
            <div className="text text_type_main-medium mt-3">Готовы:</div>
            <ul className={`${feedStyles.readyOrders}`}>
              {
                completedOrders
                .map(({number}) => (
                  <li key={uuidv4()} className="text text_type_digits-default mb-2">{number}</li>
                ))
              }
            </ul>
          </div>
          <div>
            <div className="text text_type_main-medium mt-3">В работе:</div>
            <ul className={`${feedStyles.currentOrders}`}>
              {
                inProgressOrders
                .map(({number}) => (
                  <li key={uuidv4()} className="text text_type_digits-default mb-2">{number}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={`${feedStyles.tableNum}`}>
          <div className="text text_type_main-medium">Выполнено за все время:</div>
          <div className={`text text_type_digits-large`}>{formatAmount(total)}</div>
        </div>
        <div className={`${feedStyles.tableNum}`}>
          <div className="text text_type_main-medium">Выполнено за сегодня:</div>
          <div className={`text text_type_digits-large`}>{formatAmount(totalToday)}</div>
        </div>
      </div>
    </div> : <AppSpinner />
  )
}
