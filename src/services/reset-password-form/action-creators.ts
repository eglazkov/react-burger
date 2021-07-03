import * as ActionTypes from './action-types';
import {ISetResetPasswordFormValue} from './types';

export const setResetPasswordFormValue = (
  field: string, 
  value: string
): ISetResetPasswordFormValue => ({
  type: ActionTypes.RESET_PASSWORD_FORM_SET_VALUE,
  field,
  value
}) 
