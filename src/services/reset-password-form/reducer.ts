import * as ActionTypes from './action-types';
import {TResetPasswordActions} from './types';

export type TResetPasswordFormInitialState = {
  password: string;
  token: string;
};

const resetPasswordFormInitialState: TResetPasswordFormInitialState = {
  password: '',
  token: ''
};

export type TResetPasswordFormReducer = TResetPasswordFormInitialState;

export const resetPasswordFormReducer = (
  state = resetPasswordFormInitialState,
  action: TResetPasswordActions
): TResetPasswordFormReducer => {
  switch(action.type) {
    case ActionTypes.RESET_PASSWORD_FORM_SET_VALUE: {
        return {
            ...state,
            [action.field]: action.value
        }
    }
    default: {
        return state;
    }
}
}
