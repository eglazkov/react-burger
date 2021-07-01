import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  fetchUserLoginAction,
  fetchUserRegisterAction,
  fetchGetUserAction,
  fetchUserLogoutAction,
  fetchUserUpdateAction,
  fetchUserResetPasswordRequestAction,
  fetchUserResetPasswordAction
} from './action-creators';

type TSelectors = {
  user: {
    email: string,
    name: string
  },
  userActionPending: boolean,
  accessToken: string,
  refreshToken: string,
  isUserLoaded: boolean,
  isUserUpdates: boolean
};

export type TUseAuth = [TSelectors, any];

export const useAuth = (): TUseAuth => (
  [
    useSelector(({userReducer}: RootState) => ({
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