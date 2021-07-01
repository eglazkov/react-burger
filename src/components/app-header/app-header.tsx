import React, {FC} from 'react';
import {useLocation} from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import NavigationItem from '../navigation-item/navigation-item';
import Link from '../link/link';

const AppHeader: FC = () => {
  const {pathname} = useLocation();
  return ( 
    <header className={`${appHeaderStyles.container}`}>      
      <nav>
        <ul className={appHeaderStyles.navigation}>
          <li>
            <Link
              isNavLink
              to="/"              
              active={pathname === '/' || pathname.indexOf('/ingredients/') >= 0}>
              <NavigationItem
                icon={<BurgerIcon type={pathname === '/'|| pathname.indexOf('/ingredients/') >= 0
                ? 'primary' : 'secondary'}/>}
                caption="Конструктор"/>
            </Link>
          </li>
          <li>
            <Link isNavLink to="/feed" active={pathname.indexOf('/feed') >= 0}>
              <NavigationItem
                icon={<ListIcon type={pathname.indexOf('/feed') >= 0 ? 'primary' : 'secondary'}/>}
                caption="Лента заказов"/>
            </Link>
          </li>
        </ul>
      </nav>      
      <span className={appHeaderStyles.logo}>
        <Logo />
      </span>
      <Link isNavLink to="/profile" active={pathname.indexOf('/profile') >= 0}>
        <NavigationItem
          className={appHeaderStyles.account}
          icon={<ProfileIcon type={pathname.indexOf('/profile') >= 0 ? 'primary' : 'secondary'}/>}
          caption="Личный кабинет"/> 
      </Link>  
      <div className={appHeaderStyles.menuIcon} onClick={function(e) {
        const target = e.target as HTMLDivElement;
        const menu = target.childNodes[0] as HTMLDivElement;
        if (menu.style) {          
          target.style.position = 'relative';
          menu.style.display = 'flex';
        }
      }}>
        <div className={`pt-2 pb-2 pl-1 pr-1 ${appHeaderStyles.menu}`}>
          <div className={`text text_type_main-medium ${appHeaderStyles.menuHeader}`}>
            Меню
            <CloseIcon type="primary" />
          </div>
        </div>  
      </div>
    </header>
   );
}
 
export default AppHeader;