import * as ActionTypes from './action-types';

export const setRegisterFormValue = (field, value) => ({
  type: ActionTypes.REGISTER_FORM_SET_VALUE,
  field,
  value
}) 
