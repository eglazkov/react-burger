import * as ActionTypes from './action-types';
import {ISetForgotPasswordFormValue} from './types';

export const setForgotPasswordFormValue = (
  field: string,
  value: string
): ISetForgotPasswordFormValue => ({
  type: ActionTypes.FORGOT_PASSWORD_FORM_SET_VALUE,
  field,
  value
}) 
