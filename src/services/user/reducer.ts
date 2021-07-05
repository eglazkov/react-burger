import * as ActionTypes from './action-types';
import {TUserActions} from './types';

export type TUserInitialState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    email: string;
    name: string;
  } | null;
  userActionPending: boolean;
  isUserLoaded: boolean;
  isUserUpdates: boolean;
} | any;

const userInitialState: TUserInitialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  userActionPending: false,
  isUserLoaded: false,
  isUserUpdates: false
};

export type TUserReducer = TUserInitialState;

export const userReducer = (
  state = userInitialState,
  action: TUserActions
): TUserReducer => {
  switch (action.type) {    
    case ActionTypes.USER_LOGIN_PENDING:
    case ActionTypes.USER_REGISTER_PENDING:
      return {
        ...state,
        userActionPending: true
      };
    case ActionTypes.USER_LOGIN_SUCCESS:
    case ActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        userActionPending: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,  
        token: action.payload.token,
        user: action.payload.user
      }
    case ActionTypes.USER_REFRESH_TOKEN_SUCCESS:
      return {
        ...state,       
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,  
        token: action.payload.token
      }
    case ActionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,       
        accessToken: null,
        refreshToken: null,
        user: null
      }
    case ActionTypes.USER_LOGIN_FAIL:
    case ActionTypes.USER_REGISTER_FAIL:
    case ActionTypes.USER_REFRESH_TOKEN_FAIL:
      return {
        ...state,
        userActionPending: false,
        errorMessage: action.payload.errorMessage
      }
    case ActionTypes.USER_UPDATE_PENDING:
      return {
        ...state,
        isUserUpdates: true
      }
    case ActionTypes.USER_UPDATE_FAIL:
      return {
        ...state,
        isUserUpdates: false
      }
    case ActionTypes.USER_UPDATE_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isUserUpdates: false
      }
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isUserLoaded: true
      }
    case ActionTypes.GET_USER_FAIL:
      return {
        ...state,        
        isUserLoaded: true
      }  
    default:
      return {...state};
  }
}
