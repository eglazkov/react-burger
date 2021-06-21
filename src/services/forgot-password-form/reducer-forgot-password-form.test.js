import {forgotPasswordFormReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('forgot-password reducer', () => {
  it('should return the initial state', () => {
    expect(forgotPasswordFormReducer(undefined, {})).toEqual({
      email: ''
    });
  });

  it('should change state by adding property by "field" key with value from "value"', () => {
    expect(forgotPasswordFormReducer(undefined, {
      type: ActionTypes.FORGOT_PASSWORD_FORM_SET_VALUE,
      field: 'email',
      value: 'test@ya.ru'
    })).toEqual({
      email: 'test@ya.ru'
    });
  });

  it('should change state by adding property not only stored in initial state', () => {
    expect(forgotPasswordFormReducer(undefined, {
      type: ActionTypes.FORGOT_PASSWORD_FORM_SET_VALUE,
      field: 'foo',
      value: 'bar'
    })).toEqual({
      foo: 'bar',
      email: ''
    });
  });
});
