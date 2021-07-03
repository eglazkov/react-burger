import React, {FC, useEffect} from 'react';
import {useAuth} from '../../services';
import {useDispatch} from 'react-redux';
import {Redirect, Route, useLocation} from 'react-router-dom';
import Spinner from '../spinner/spinner';

interface IUserProtectedRoute {
  [name: string]: any,
  children: JSX.Element
};

type TLocation = {
  state?: {
    from?: {
      pathname: string
    }
  }
};

const UserProtectedRoute: FC<IUserProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const location: TLocation = useLocation();
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
    return <Spinner isLoading />;
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

export default UserProtectedRoute;
