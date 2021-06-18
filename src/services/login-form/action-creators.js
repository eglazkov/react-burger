import * as ActionTypes from './action-types';

export const setLoginFormValue = (field, value) => ({
  type: ActionTypes.LOGIN_FORM_SET_VALUE,
  field,
  value
}) 
