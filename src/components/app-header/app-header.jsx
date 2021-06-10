import React from 'react';
import {useLocation} from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationItem from '../navigation-item';
import Link from '../link';

const AppHeader = () => {
  const {pathname} = useLocation();
  return ( 
    <header className={`${appHeaderStyles.container}`}>      
      <nav>
        <ul className={appHeaderStyles.navigation}>
          <li>
            <Link
              isNavLink
              to="/"              
              active={pathname === '/'}>
              <NavigationItem
                icon={<BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>}
                caption="Конструктор"/>
            </Link>
          </li>
          <li>
            <Link isNavLink to="/feed" active={pathname === '/feed'}>
              <NavigationItem
                icon={<ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'}/>}
                caption="Лента заказов"/>
            </Link>
          </li>
        </ul>
      </nav>      
      <span className={appHeaderStyles.logo}>
        <Logo />
      </span>
      <Link isNavLink to="/profile" active={pathname === '/profile'}>
        <NavigationItem
          className={appHeaderStyles.account}
          icon={<ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'}/>}
          caption="Личный кабинет"/> 
      </Link>  
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