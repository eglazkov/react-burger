import {RESET_PASSWORD_FORM_SET_VALUE} from "./action-types";

export interface ISetResetPasswordFormValue {
  type: typeof RESET_PASSWORD_FORM_SET_VALUE;
  field: string;
  value: string
};

export type TResetPasswordActions = ISetResetPasswordFormValue | any;
