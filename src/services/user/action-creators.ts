import * as ActionTypes from './action-types';
import {API_URL} from '../../constants';
// eslint-disable-next-line no-unused-vars
// import {setCookie, getCookie} from '../index';
import {AppDispatch, AppThunk} from '../store';
import {
  IFetchUserLoginFailAction,
  IFetchUserLoginPendingAction,
  IFetchUserLoginSuccessAction,
  IFetchUserRegisterFailAction,
  IFetchUserRegisterPendingAction,
  IFetchUserRegisterSuccessAction
} from './types';

export const fetchUserLoginPendingAction = (): IFetchUserLoginPendingAction => ({
  type: ActionTypes.USER_LOGIN_PENDING
});

export const fetchUserLoginSuccessAction = (data: {
  [name: string]: any;
  token: string;
}): IFetchUserLoginSuccessAction => ({
  type: ActionTypes.USER_LOGIN_SUCCESS,
  payload: data
});

export const fetchUserLoginFailAction = (errorMessage: string): IFetchUserLoginFailAction => ({
  type: ActionTypes.USER_LOGIN_FAIL,
  payload: {errorMessage}
});

export const fetchUserLoginAction: AppThunk = ({
  email,
  password
}: {
  email: string;
  password: string;
}) => async (dispatch: AppDispatch) => {
  dispatch(fetchUserLoginPendingAction());
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch(fetchUserLoginSuccessAction({
        ...resp,
        token: resp.accessToken ? resp.accessToken.split('Bearer ')[1] : null
      }));
      if (resp.accessToken) {
        // TODO: почему то в куках происходит дубликация данных, поэтому localStorage
        // setCookie('token', resp.accessToken.split('Bearer ')[1]);
        // setCookie('refreshToken', resp.refreshToken);
        localStorage.setItem('token', resp.accessToken.split('Bearer ')[1]);        
        localStorage.setItem('refreshToken', resp.refreshToken);
      }
    }).catch(errorMessage => {
      dispatch(fetchUserLoginFailAction(errorMessage));
    });
};

export const fetchUserRegisterPendingAction = (): IFetchUserRegisterPendingAction => ({
  type: ActionTypes.USER_REGISTER_PENDING
});

export const fetchUserRegisterSuccessAction = (data: {
  [name: string]: any;
  token: string | null;
}): IFetchUserRegisterSuccessAction => ({
  type: ActionTypes.USER_REGISTER_SUCCESS,
  payload: data
});

export const fetchUserRegisterFailAction = (errorMessage: string): IFetchUserRegisterFailAction => ({
  type: ActionTypes.USER_REGISTER_FAIL,
  payload: {errorMessage}
});

export const fetchUserRegisterAction: AppThunk = ({
  email,
  password,
  name
}: {
  email: string;
  password: string;
  name: string;
}) => async (dispatch: AppDispatch) => {
  dispatch(fetchUserRegisterPendingAction());
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    });
    
    if (!response.ok) {      
      throw new Error(String(response.status));
    } else {
      const resp:any = response.json();
      dispatch(fetchUserRegisterSuccessAction({
        ...resp,
        token: resp.accessToken ? resp.accessToken.split('Bearer ')[1] : null
      }));
      return resp;      
    }
  } catch (error) {
    dispatch(fetchUserRegisterFailAction(error));
    return {success: false, errorMessage: 'Пользователь с такими данными уже существует!'};
  }
};

export const fetchUserUpdateAction: AppThunk = ({
  email,
  password,
  name
}) => (dispatch: AppDispatch) => {
  dispatch({type: ActionTypes.USER_UPDATE_PENDING});
  fetch(`${API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch({type: ActionTypes.USER_UPDATE_SUCCESS, payload: resp.data});
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.USER_UPDATE_FAIL, payload: {errorMessage}});
    });
};

export const fetchGetUserAction: AppThunk | any = () => (dispatch: AppDispatch) => {
  dispatch({type: ActionTypes.GET_USER_PENDING});
  fetch(`${API_URL}/auth/user `, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(async res => {
      if (!res.ok && res.status !== 401) {
        dispatch(fetchUserRefreshTokenAction())
        .then(() => {
          dispatch(fetchGetUserAction());
        });
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch({type: ActionTypes.GET_USER_SUCCESS, payload: {...resp, token: localStorage.getItem('token')}});
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.GET_USER_FAIL, payload: {errorMessage}});
    });
};

export const fetchUserRefreshTokenAction: AppThunk | any = () => (dispatch: AppDispatch) => {
  dispatch({type: ActionTypes.USER_REFRESH_TOKEN_PENDING});
  return fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch({type: ActionTypes.USER_REFRESH_TOKEN_SUCCESS, payload: {
        ...resp,
        token: resp.accessToken ? resp.accessToken.split('Bearer ')[1] : null
      }});
      localStorage.setItem('token', resp.accessToken.split('Bearer ')[1]);        
      localStorage.setItem('refreshToken', resp.refreshToken);
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.USER_REFRESH_TOKEN_FAIL, payload: {errorMessage}});
    });
};

export const fetchUserLogoutAction: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch({type: ActionTypes.USER_LOGOUT_PENDING});
  fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'      
    },
    body: JSON.stringify({
      token: `${localStorage.getItem('refreshToken')}`
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch({type: ActionTypes.USER_LOGOUT_SUCCESS, payload: resp.data});
      // setCookie('token', '', {'max-age': 0});
      // setCookie('refreshToken', '', {'max-age': 0});
      localStorage.setItem('token', '');        
      localStorage.setItem('refreshToken', '');
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.USER_LOGOUT_FAIL, payload: {errorMessage}});
    });
};

export const fetchUserResetPasswordRequestAction: AppThunk = ({
  email
}) => async (dispatch: AppDispatch) => {
  dispatch({type: ActionTypes.USER_RESET_PASSWOD_REQUEST_PENDING});
  try {
    const response = await fetch(`${API_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'      
      },
      body: JSON.stringify({
        email
      })
    });
    if (!response.ok) {      
      throw new Error(String(response.status));
    } else {
      const resp: any = response.json();
      dispatch({type: ActionTypes.USER_RESET_PASSWOD_REQUEST_SUCCESS, payload: resp.data});
      return resp;      
    }
  } catch (error) {
    dispatch({type: ActionTypes.USER_RESET_PASSWOD_REQUEST_FAIL, payload: {errorMessage: error}});
  }
};

export const fetchUserResetPasswordAction: AppThunk = ({
  password,
  token
}) => async (dispatch: AppDispatch) => {
  dispatch({type: ActionTypes.USER_RESET_PASSWOD_PENDING});
  try {
    const response = await fetch(`${API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'      
      },
      body: JSON.stringify({
        password,
        token
      })
    });
    if (!response.ok) {      
      throw new Error(String(response.status));
    } else {
      const resp: any = response.json();
      dispatch({type: ActionTypes.USER_RESET_PASSWOD_SUCCESS, payload: resp.data});
      return resp;      
    }
  } catch (error) {
    dispatch({type: ActionTypes.USER_RESET_PASSWOD_FAIL, payload: {errorMessage: error}});
  }
};
