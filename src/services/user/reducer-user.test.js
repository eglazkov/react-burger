import {userReducer} from './reducer';
import * as ActionTypes from './action-types';

const successResult = {
  isUserLoaded: true,
  user: {name: 'userName'}
};
const accessToken = '215423t6345r35';
const refreshToken = 'adf23gf4g4g';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual({
      accessToken: null,
      refreshToken: null,
      user: null,
      userActionPending: false,
      isUserLoaded: false,
      isUserUpdates: false
    });
  });

  it('should set userActionPending to true', () => {
    expect(
      userReducer({
        userActionPending: false
      }, {
        type: ActionTypes.USER_LOGIN_PENDING
      }) ||
      userReducer({
        userActionPending: false
      }, {
        type: ActionTypes.USER_REGISTER_PENDING
      })
    ).toEqual({
      userActionPending: true
    });
  });

  it(`should return accessToken, refreshToken, user from payload 
      and change userActionPending to false`, () => {
    expect(
      userReducer({
        userActionPending: true
      }, {
        type: ActionTypes.USER_LOGIN_SUCCESS,
        payload: {
          accessToken,
          refreshToken,
          user: {name: 'userName'}
        }
      }) ||
      userReducer({
        userActionPending: true
      }, {
        type: ActionTypes.USER_REGISTER_SUCCESS,
        payload: {
          accessToken,
          refreshToken,
          user: {name: 'userName'}
        }
      })
    ).toEqual({
      userActionPending: false,
      accessToken,
      refreshToken,
      user: {name: 'userName'}
    });
  });

  it(`should return accessToken and refreshToken from payload`, () => {
    expect(userReducer(undefined, {
      type: ActionTypes.USER_REFRESH_TOKEN_SUCCESS,
      payload: {
        accessToken,
        refreshToken
      }
    })).toEqual({
      accessToken,
      refreshToken,
      user: null,
      userActionPending: false,
      isUserLoaded: false,
      isUserUpdates: false
    });
  });
  
  it(`should change accessToken, refreshTokent and user to null`, () => {
    expect(userReducer({
      accessToken,
      refreshToken,
      user: {name: 'userName'}
    }, {
      type: ActionTypes.USER_LOGOUT_SUCCESS
    })).toEqual({
      accessToken: null,
      refreshToken: null,
      user: null
    });
  });

  it('should set userActionPending to false and return errorMessage from payload', () => {
    expect(
      userReducer({
        userActionPending: true
      }, {
        type: ActionTypes.USER_LOGIN_FAIL,
        payload: {errorMessage: 'errorMessage'}
      }) ||
      userReducer({
        userActionPending: true
      }, {
        type: ActionTypes.USER_REGISTER_FAIL,
        payload: {errorMessage: 'errorMessage'}
      }) ||
      userReducer({
        userActionPending: true
      }, {
        type: ActionTypes.USER_REFRESH_TOKEN_FAIL,
        payload: {errorMessage: 'errorMessage'}
      })
    ).toEqual({
      userActionPending: false,
      errorMessage: 'errorMessage'
    });
  });

  it('should set isUserUpdates to true', () => {
    expect(
      userReducer({
        isUserUpdates: false
      }, {
        type: ActionTypes.USER_UPDATE_PENDING
      })
    ).toEqual({
      isUserUpdates: true
    });
  });

  it('should set isUserUpdates to false', () => {
    expect(
      userReducer({
        isUserUpdates: true
      }, {
        type: ActionTypes.USER_UPDATE_FAIL
      })
    ).toEqual({
      isUserUpdates: false
    });
  });

  it('should set isUserUpdates to false and return user from payload', () => {
    expect(
      userReducer({
        isUserUpdates: true
      }, {
        type: ActionTypes.USER_UPDATE_SUCCESS,
        payload: {user: {name: 'userName'}}
      })
    ).toEqual({
      isUserUpdates: false,
      user: {name: 'userName'}
    });
  });

  it('should set isUserLoaded to true and return user from payload', () => {
    expect(
      userReducer({
        isUserLoaded: false
      }, {
        type: ActionTypes.GET_USER_SUCCESS,
        payload: {user: {name: 'userName'}}
      })
    ).toEqual(successResult);
  });

  it('should set isUserLoaded to true', () => {
    expect(
      userReducer({
        isUserLoaded: false,
        user: {name: 'userName'}
      }, {
        type: ActionTypes.GET_USER_FAIL
      })
    ).toEqual(successResult);
  });
});
