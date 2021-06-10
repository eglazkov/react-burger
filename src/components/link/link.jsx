import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import linkStyles from './link.module.css';
 
const Link = ({isHashLink, to, children, active = false, isNavLink = false}) => {
  const className = active ? linkStyles.active : isNavLink ? linkStyles.navLink : linkStyles.link
  return (
    <>
      {
        isHashLink ?
        <HashLink to={to} className={className}>{children}</HashLink> :
        <RouterLink to={to} className={className}>{children}</RouterLink>
      }
    </>
  );
}

Link.propTypes = {
  isHashLink: PropTypes.bool,
  isNavLink: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.any,
  active: PropTypes.bool
};
 
export default Link;
