import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
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
import {orderList} from '../feed';
import OrderPage from '../order/order';
import {useAuth, history} from '../../services';

function Profile({
  user,
  fetchUserLogoutAction
}) {
  const dispatch = useDispatch();
  const [{isUserUpdates}, {fetchUserUpdateAction}] = useAuth();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const location = useLocation();
  const {pathname} = location;
  const formSubmit = (e) => {
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
    dispatch(fetchUserLogoutAction());
  };
  const getDescriptionByRoute = (route) => {
    const descriptions = {
      '/profile': 'В этом разделе вы можете изменить свои персональные данные',
      '/profile/orders': 'В этом разделе вы можете просмотреть свою историю заказов'
    };
    return descriptions[route] || '';
  };
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div 
            className="mb-3">
            <PasswordInput      
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
            orderList.map((order) => (
              <OrderCard
                changeLocation={({id}) => {                 
                  history.push({pathname: `${path}/orders/${id}`, state: {background: location}});
                }}
                key={uuidv4()}
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

Profile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string
  }),
  fetchUserLogoutAction: PropTypes.func
};

export default Profile;
