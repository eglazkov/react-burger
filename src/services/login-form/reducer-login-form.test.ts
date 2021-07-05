import {loginFormReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(loginFormReducer(undefined, {})).toEqual({
      email: '',
      password: ''
    });
  });

  it('should change state by adding property by "field" key with value from "value"', () => {
    expect(loginFormReducer(undefined, {
      type: ActionTypes.LOGIN_FORM_SET_VALUE,
      field: 'email',
      value: 'test@ya.ru'
    })).toEqual({
      email: 'test@ya.ru',
      password: ''
    });
  });

  it('should change state and return with previous added value', () => {
    expect(loginFormReducer({
      email: 'test@ya.ru',
      password: ''
    }, {
      type: ActionTypes.LOGIN_FORM_SET_VALUE,
      field: 'password',
      value: '123'
    })).toEqual({
      password: '123',
      email: 'test@ya.ru'
    });
  });
});
