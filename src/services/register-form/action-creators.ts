import * as ActionTypes from './action-types';
import {ISetRegisterFormValue} from './types';

export const setRegisterFormValue = (
  field: string,
  value: string
): ISetRegisterFormValue => ({
  type: ActionTypes.REGISTER_FORM_SET_VALUE,
  field,
  value
}) 
