import React, {useEffect} from 'react';
import {useAuth, history} from '../../services';
import {useDispatch} from 'react-redux';
import {Redirect, Route, useLocation} from 'react-router-dom';
import Spinner from '../spinner/spinner';

export default function UserProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [
    {user, isUserLoaded},
    {fetchGetUserAction}
  ] = useAuth();

  const init = () => {
    dispatch(fetchGetUserAction());
  };

  useEffect(() => {        
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isUserLoaded) {
    return <Spinner />;
  }
  return (
    <Route
      {...rest}
      render={() =>                
        !user ? (
          children
        ) : <Redirect to={{
          pathname: location.state?.from?.pathname ?
            location.state?.from?.pathname :
            '/'
        }}/>
      }
    />
  );
} 