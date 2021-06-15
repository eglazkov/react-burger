import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useHistory} from 'react-router-dom';
import * as moment from 'moment';
import 'moment/locale/ru';
import feedStyles from './feed.module.css';
import OrderCard from '../../components/order-card';
const ingredeintsData = require('../../utils/data.json').data;

export const orderList = [
  {
    id: '034535',
    orderDate:  moment(),
    orderName: 'Death Star Starship Main бургер',
    orderCost: 480,
    orderIngredients: ingredeintsData.filter((item, i) => i < 5),
    orderStatus: 'Выполнен'
  },  
  {
    id: '034534',
    orderDate: moment().add(-1,'days'),
    orderName: 'Interstellar бургер',
    orderCost: 560,
    orderIngredients: ingredeintsData.filter((item, i) => i < 8),
    orderStatus: 'Выполнен'
  },  
  {
    id: '034533',
    orderDate: moment().add(-8, 'days'),
    orderName: 'Black Hole Singularity острый бургер',
    orderCost: 510,
    orderIngredients: ingredeintsData.filter((item, i) => i < 5),
    orderStatus: 'В обработке'
  }
];

export const getOrderById = (id) => {
  return orderList.filter(order => order.id === id)[0];
}

const readyOrders = [
  {id: '034533'},
  {id: '034532'},
  {id: '034530'},
  {id: '034527'},
  {id: '034525'}
];

const currentOrders = [
  {id: '034538'},
  {id: '034541'},
  {id: '034542'}  
];

const totalComletedOrders = 28752;
const todayCompletedOrders = 138;

export default function Feed() {
  const formatAmount = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0      
  }).format;
  const history = useHistory();
  return (
    <div className={feedStyles.container}>
      <div>
        <div className="mb-4 text text_type_main-large">Лента заказов</div>
        <div className={`${feedStyles.feedList}`}>
          {
            orderList.map((order) => (
              <OrderCard
                changeLocation={({id}) => {                  
                  history.push({pathname: `/feed/${id}`});
                }}
                key={uuidv4()}
                {...order} 
              />
            ))
          }
        </div>
      </div>
      <div className={`${feedStyles.stats} ml-5`}>
        <div className={`${feedStyles.table}`}>
          <div className="mr-4">
            <div className="text text_type_main-medium mt-3 mr-4">Готовы:</div>
            <ul className={`${feedStyles.readyOrders}`}>
              {
                readyOrders.map(({id}) => (
                  <li key={uuidv4()} className="text text_type_digits-default mt-2">{id}</li>
                ))
              }
            </ul>
          </div>
          <div className="ml-4">
            <div className="text text_type_main-medium mt-3">В работе:</div>
            <ul className={`${feedStyles.currentOrders}`}>
              {
                currentOrders.map(({id}) => (
                  <li key={uuidv4()} className="text text_type_digits-default mt-2">{id}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={`${feedStyles.tableNum}`}>
          <div className="text text_type_main-medium">Выполнено за все время:</div>
          <div className={`text text_type_digits-large`}>{formatAmount(totalComletedOrders)}</div>
        </div>
        <div className={`${feedStyles.tableNum}`}>
          <div className="text text_type_main-medium">Выполнено за сегодня:</div>
          <div className={`text text_type_digits-large`}>{formatAmount(todayCompletedOrders)}</div>
        </div>
      </div>
    </div>
  )
}
