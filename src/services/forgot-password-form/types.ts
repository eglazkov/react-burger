import {FORGOT_PASSWORD_FORM_SET_VALUE} from './action-types';

export interface ISetForgotPasswordFormValue {
  readonly type: typeof FORGOT_PASSWORD_FORM_SET_VALUE;
  readonly field: string;
  readonly value: string;
}

export type TForgotPasswordActions = ISetForgotPasswordFormValue | any;