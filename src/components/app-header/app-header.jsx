import React from 'react';
import appHeaderStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationItem from '../navigation-item';

const AppHeader = () => {
  return ( 
    <header className={`mb-5 ${appHeaderStyles.container}`}>      
      <nav>
        <ul className={appHeaderStyles.navigation}>
          <li>
            <NavigationItem
              icon={<BurgerIcon type="primary"/>}
              caption="Конструктор"/>
          </li>
          <li>
            <NavigationItem
              icon={<ListIcon type="secondary"/>}
              caption="Лента заказов"/>
          </li>
        </ul>
      </nav>      
      <span className={appHeaderStyles.logo}>
        <Logo/>
      </span>
      <NavigationItem
        icon={<ProfileIcon type="secondary"/>}
        caption="Личный кабинет"/>
    </header>
   );
}
 
export default AppHeader;