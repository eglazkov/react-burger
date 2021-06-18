import * as ActionTypes from './action-types';

export const setForgotPasswordFormValue = (field, value) => ({
  type: ActionTypes.FORGOT_PASSWORD_FORM_SET_VALUE,
  field,
  value
}) 
