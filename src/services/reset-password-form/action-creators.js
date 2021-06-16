import * as ActionTypes from './action-types';

export const setResetPasswordFormValue = (field, value) => ({
  type: ActionTypes.RESET_PASSWORD_FORM_SET_VALUE,
  field,
  value
}) 
