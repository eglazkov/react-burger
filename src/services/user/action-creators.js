import * as ActionTypes from './action-types';
import {API_URL} from '../../constants';
// eslint-disable-next-line no-unused-vars
import {setCookie, getCookie} from '../index';

export const fetchUserLoginAction = ({
  email,
  password
}) => async dispatch => {
  dispatch({type: ActionTypes.USER_LOGIN_PENDING});
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
      dispatch({type: ActionTypes.USER_LOGIN_SUCCESS, payload: resp});
      if (resp.accessToken) {
        // TODO: почему то в куках происходит дубликация данных, поэтому localStorage
        // setCookie('token', resp.accessToken.split('Bearer ')[1]);
        // setCookie('refreshToken', resp.refreshToken);
        localStorage.setItem('token', resp.accessToken.split('Bearer ')[1]);        
        localStorage.setItem('refreshToken', resp.refreshToken);
      }
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.USER_LOGIN_FAIL, payload: {errorMessage}});
    });
};

export const fetchUserRegisterAction = ({
  email,
  password,
  name
}) => async (dispatch) => {
  dispatch({type: ActionTypes.USER_REGISTER_PENDING});
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
      throw new Error(response.status);
    } else {
      const resp = response.json();
      dispatch({type: ActionTypes.USER_REGISTER_SUCCESS, payload: resp.data});
      return resp;      
    }
  } catch (error) {
    dispatch({type: ActionTypes.USER_REGISTER_FAIL, payload: {errorMessage: error}});
    return {success: false, errorMessage: 'Пользователь с такими данными уже существует!'};
  }
};

export const fetchUserUpdateAction = ({
  email,
  password,
  name
}) => dispatch => {
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

export const fetchGetUserAction = () => dispatch => {
  dispatch({type: ActionTypes.GET_USER_PENDING});
  fetch(`${API_URL}/auth/user `, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      if (!res.ok) {
        dispatch(fetchUserRefreshTokenAction());
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
    .then(resp => {
      dispatch({type: ActionTypes.GET_USER_SUCCESS, payload: resp});
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.GET_USER_FAIL, payload: {errorMessage}});
    });
};

export const fetchUserRefreshTokenAction = () => dispatch => {
  dispatch({type: ActionTypes.USER_REFRESH_TOKEN_PENDING});
  fetch(`${API_URL}/auth/token`, {
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
      dispatch({type: ActionTypes.USER_REFRESH_TOKEN_SUCCESS, payload: resp.data});
      localStorage.setItem('token', resp.accessToken.split('Bearer ')[1]);        
      localStorage.setItem('refreshToken', resp.refreshToken);
    }).catch(errorMessage => {
      dispatch({type: ActionTypes.USER_REFRESH_TOKEN_FAIL, payload: {errorMessage}});
    });
};

export const fetchUserLogoutAction = () => async dispatch => {
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

export const fetchUserResetPasswordRequestAction = ({
  email
}) => async (dispatch) => {
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
      throw new Error(response.status);
    } else {
      const resp = response.json();
      dispatch({type: ActionTypes.USER_RESET_PASSWOD_REQUEST_SUCCESS, payload: resp.data});
      return resp;      
    }
  } catch (error) {
    dispatch({type: ActionTypes.USER_RESET_PASSWOD_REQUEST_FAIL, payload: {errorMessage: error}});
  }
};

export const fetchUserResetPasswordAction = ({
  password,
  token
}) => async (dispatch) => {
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
      throw new Error(response.status);
    } else {
      const resp = response.json();
      dispatch({type: ActionTypes.USER_RESET_PASSWOD_SUCCESS, payload: resp.data});
      return resp;      
    }
  } catch (error) {
    dispatch({type: ActionTypes.USER_RESET_PASSWOD_FAIL, payload: {errorMessage: error}});
  }
};
