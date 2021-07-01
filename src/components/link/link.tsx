import React, {FC} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import linkStyles from './link.module.css';

interface ILink {
  isHashLink?: boolean,
  to: string,
  active?: boolean,
  isNavLink?: boolean,
  onClick?: (args?: any) => void
};

const Link: FC<ILink> = ({
  isHashLink,
  to,
  children,
  active = false,
  isNavLink = false,
  onClick
}) => {
  const className = active ? linkStyles.active : isNavLink ? linkStyles.navLink : linkStyles.link
  return (
    <div onClick={onClick}>
      {
        isHashLink ?
        <HashLink to={to} className={className}>{children}</HashLink> :
        <RouterLink to={to} className={className}>{children}</RouterLink>
      }
    </div>
  );
}
 
export default Link;
