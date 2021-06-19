import {resetPasswordFormReducer} from './reducer';
import * as ActionTypes from './action-types';

describe('reset-password reducer', () => {
  it('should return the initial state', () => {
    expect(resetPasswordFormReducer(undefined, {})).toEqual({
      password: '',
      token: ''
    });
  });

  it('should change state by adding property by "field" key with value from "value"', () => {
    expect(resetPasswordFormReducer(undefined, {
      type: ActionTypes.RESET_PASSWORD_FORM_SET_VALUE,
      field: 'password',
      value: '13133'
    })).toEqual({
      password: '13133',
      token: ''
    });
  });

  it('should change state by adding property and merge with inital state', () => {
    expect(resetPasswordFormReducer({
      password: '13133',
      token: ''
    }, {
      type: ActionTypes.RESET_PASSWORD_FORM_SET_VALUE,
      field: 'token',
      value: '324324345-34546-234423t-fer2-234'
    })).toEqual({
      password: '13133',
      token: '324324345-34546-234423t-fer2-234'
    });
  });
});
