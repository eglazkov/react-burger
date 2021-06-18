import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import linkStyles from './link.module.css';
 
const Link = ({isHashLink, to, children, active = false, isNavLink = false, onClick}) => {
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

Link.propTypes = {
  isHashLink: PropTypes.bool,
  isNavLink: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  active: PropTypes.bool
};
 
export default Link;
