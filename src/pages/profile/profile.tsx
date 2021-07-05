import React, {FC, useState, useEffect, useMemo, FormEvent} from 'react';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {
  Route,
  useRouteMatch
} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {
  Input,
  EmailInput, 
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import {
  AppSpinner,
  Link,
  OrderCard
} from '../../components';
import OrderPage from '../order/order';
import {useAuth, useWebsocket, useIngredeints, history} from '../../services';
import {
  WS_CONNECTION_USER_START,
  WS_CONNECTION_USER_END,
  WS_SEND_PONG_MESSAGE
} from '../../services/websocket/action-types';
import {TOrder} from '../../services/websocket';
const _ = require('lodash');

interface IProfile {
  user?: {
    email: string,
    name: string
  },
  fetchUserLogoutAction?: () => void
};

const Profile: FC<IProfile> = ({
  user = {
    email: '',
    name: ''
  },
  fetchUserLogoutAction
}) => {
  const dispatch = useDispatch();
  const [{isUserUpdates}, {fetchUserUpdateAction}] = useAuth();
  const [{historyData, wsConnected}] = useWebsocket();
  const {orders}: {orders: TOrder[]} = historyData;
  const [{ingredients},
    {fetchIngredientsAction}] = useIngredeints();
  const ingredientsMap = useMemo(() => _.keyBy(ingredients, '_id'), [ingredients]);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const location = useLocation();
  const {pathname} = location;
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchUserUpdateAction({
      name,
      email,
      password
    }));
    setPassword('');
  };
  const {path} = useRouteMatch();
  const logOut = () => {
    fetchUserLogoutAction && dispatch(fetchUserLogoutAction());
  };
  const getDescriptionByRoute = (route: string) => {
    const descriptions: {[name: string]: string} = {
      '/profile': 'В этом разделе вы можете изменить свои персональные данные',
      '/profile/orders': 'В этом разделе вы можете просмотреть свою историю заказов'
    };
    return descriptions[route] || '';
  };
  useEffect(() => {
    dispatch({type: WS_CONNECTION_USER_START});
    if (ingredients.length === 0) {
      dispatch(fetchIngredientsAction());
    }
    const pingPong = setInterval(() => {
      dispatch({type: WS_SEND_PONG_MESSAGE})
    }, 10000);
    return () => {
      clearInterval(pingPong);
      dispatch({type: WS_CONNECTION_USER_END});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    isUserUpdates ?
    <AppSpinner /> :    
    <div className={`${profileStyles.container} ${pathname.indexOf(`${path}/orders/`) >= 0 ?
      profileStyles.noMargin : null}`}>
      <nav className={`${profileStyles.navigation} ${pathname.indexOf(`${path}/orders/`) >= 0 ?
        profileStyles.hide : null}`}>
        <ul>
          <li className="text text_type_main-medium">
            <Link
              isNavLink
              to="/profile"              
              active={pathname === '/profile'}>
                Профиль
            </Link>
          </li>
          <li className="text text_type_main-medium">
            <Link
              isNavLink
              to="/profile/orders"
              active={pathname === '/profile/orders'}>
                История заказов
            </Link>
          </li>
          <li className="text text_type_main-medium">
            <Link
              isNavLink
              to="/"
              onClick={logOut}>
                Выход
            </Link>
          </li>
        </ul>      
        <div className={`${profileStyles.description} text text_type_main-default`}>
          {getDescriptionByRoute(pathname)}
        </div>
      </nav>
      <Route
        exact        
        path={path}
        render={() => (            
        <form onSubmit={formSubmit}>
          <div
            className="mb-3">
            <Input
              placeholder="Имя"        
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            className="mb-3">        
            <EmailInput
              name="email"        
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div 
            className="mb-3">
            <PasswordInput
              name="password"      
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            className="mb-5">
            <Button>Сохранить</Button>
          </div>
        </form>)}
      />
      <Route
        exact        
        path={`${path}/orders`}>
          <div className={`${profileStyles.orderList} pr-1`}>
          {
            wsConnected && orders && orders.map((order: TOrder) => (
              ingredientsMap && <OrderCard
                changeLocation={({number: id}) => {                 
                  history.push({pathname: `${path}/orders/${id}`, state: {background: location}});
                }}
                showStatus
                key={uuidv4()}
                ingredientsMap={ingredientsMap}
                {...order}
              />
            ))
          }
          </div>
      </Route>
      <Route
        exact
        path={`${path}/orders/:id`}>
          <OrderPage />
      </Route>          
    </div>
  )
}

export default Profile;
