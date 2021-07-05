import {LOGIN_FORM_SET_VALUE} from './action-types';

export interface ISetLoginFormValue {
  type: typeof LOGIN_FORM_SET_VALUE;
  field: string;
  value: string;
}

export type TLoginFormActions = ISetLoginFormValue | any;
