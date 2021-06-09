import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';
import linkStyles from './link.module.css';
 
const Link = ({isHashLink, to, children}) => {
  return (
    <>
      {
        isHashLink ?
        <HashLink to={to} className={linkStyles.link}>{children}</HashLink> :
        <RouterLink to={to} className={linkStyles.link}>{children}</RouterLink>
      }
    </>
  );
}

Link.propTypes = {
  isHashLink: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.any
};
 
export default Link;
