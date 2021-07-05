import {REGISTER_FORM_SET_VALUE} from './action-types';

export interface ISetRegisterFormValue {
  type: typeof REGISTER_FORM_SET_VALUE;
  field: string;
  value: string;
};

export type TRegisterFormActions = ISetRegisterFormValue | any;
