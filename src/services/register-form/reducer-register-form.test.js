import {registerFormReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(registerFormReducer(undefined, {})).toEqual({
      name: '',
      email: '',
      password: ''
    });
  });

  it('should change state by adding property by "field" key with value from "value"', () => {
    expect(registerFormReducer(undefined, {
      type: ActionTypes.REGISTER_FORM_SET_VALUE,
      field: 'email',
      value: 'test@ya.ru'
    })).toEqual({
      name: '',
      email: 'test@ya.ru',
      password: ''
    });
  });

  it('should change state and return with previous added value', () => {
    expect(registerFormReducer({
      name: '',
      email: 'test@ya.ru',
      password: ''
    }, {
      type: ActionTypes.REGISTER_FORM_SET_VALUE,
      field: 'name',
      value: 'userName'
    })).toEqual({
      name: 'userName',
      email: 'test@ya.ru',
      password: ''
    });
  });
});
