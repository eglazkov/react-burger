import React from 'react';
import appHeaderStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
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
        <Logo />
      </span>
      <NavigationItem
        className={appHeaderStyles.account}
        icon={<ProfileIcon type="secondary"/>}
        caption="Личный кабинет"/>   
      <div className={appHeaderStyles.menuIcon} onClick={function(e) {
        const menu = e.target.childNodes[0];
        if (menu.style) {          
          e.target.style.position = 'relative';
          menu.style.display = 'flex';
        }
      }}>
        <div className={`pt-2 pb-2 pl-1 pr-1 ${appHeaderStyles.menu}`}>
          <div className={`text text_type_main-medium ${appHeaderStyles.menuHeader}`}>
            Меню
            <CloseIcon/>
          </div>
        </div>  
      </div>
    </header>
   );
}
 
export default AppHeader;