import {useSelector} from 'react-redux';

import {
  fetchUserLoginAction,
  fetchUserRegisterAction,
  fetchGetUserAction,
  fetchUserLogoutAction,
  fetchUserUpdateAction,
  fetchUserResetPasswordRequestAction,
  fetchUserResetPasswordAction
} from './action-creators';

export const useAuth = () => (
  [
    useSelector(({userReducer}) => ({
      user: userReducer.user,
      userActionPending: userReducer.userActionPending,
      accessToken: userReducer.accessToken,
      refreshToken: userReducer.refreshToken,
      isUserLoaded: userReducer.isUserLoaded,
      isUserUpdates: userReducer.isUserUpdates
    })),
    {
      fetchUserLoginAction,
      fetchUserRegisterAction,
      fetchGetUserAction,
      fetchUserLogoutAction,
      fetchUserUpdateAction,
      fetchUserResetPasswordRequestAction,
      fetchUserResetPasswordAction
    }
  ]
);