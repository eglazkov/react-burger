import {
  USER_LOGIN_FAIL,
  USER_LOGIN_PENDING,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_PENDING,
  USER_REGISTER_SUCCESS
} from './action-types';

export interface IFetchUserLoginPendingAction {
  type: typeof USER_LOGIN_PENDING;
};

export interface IFetchUserLoginSuccessAction {
  type: typeof USER_LOGIN_SUCCESS;
  payload: {
    [name: string]: any;
    token: string;
  }
};

export interface IFetchUserLoginFailAction {
  type: typeof USER_LOGIN_FAIL;
  payload: {errorMessage: string};
};

export interface IFetchUserRegisterPendingAction {
  type: typeof USER_REGISTER_PENDING;
};

export interface IFetchUserRegisterSuccessAction {
  type: typeof USER_REGISTER_SUCCESS;
  payload: {
    [name: string]: any;
    token: string | null;
  };
};

export interface IFetchUserRegisterFailAction {
  type: typeof USER_REGISTER_FAIL;
  payload: {errorMessage: string};
};

export type TUserActions =
  IFetchUserLoginPendingAction |
  IFetchUserLoginSuccessAction |
  IFetchUserLoginFailAction |
  IFetchUserRegisterPendingAction |
  IFetchUserRegisterSuccessAction |
  IFetchUserRegisterFailAction |
  any
;
