import React, {useEffect} from 'react';
import {useAuth} from '../../services';
import {useDispatch} from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
import Spinner from '../spinner';

export default function UserProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
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
        ) : <Redirect to="/"/>
      }
    />
  );
} 