import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {  
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {
  Input,
  EmailInput, 
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import Link from '../../components/link';
import OrderCard from '../../components/order-card';
import {orderList} from '../feed';
import OrderPage from '../order';

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {pathname} = useLocation();
  const formSubmit = () => {
    alert('form action');
  };
  const {path} = useRouteMatch();
  const history = useHistory();
  return (
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
              to="/logout">
                Выход
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
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
                    history.push({pathname: `${path}/orders/${id}`});
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
      </Switch>
    </div>
  )
}

export default Profile;
