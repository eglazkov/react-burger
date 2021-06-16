import React, {useEffect} from 'react';
import {useAuth} from '../../services';
import {useDispatch} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import Spinner from '../spinner';

export default function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const [
    {user, isUserLoaded},
    {fetchGetUserAction, fetchUserLogoutAction}
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
        user ? (
          React.cloneElement(children, {user, fetchUserLogoutAction})
        ) : <Redirect to="/login" />
      }
    />
  );
} 