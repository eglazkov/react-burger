import * as ActionTypes from './action-types';
import {TForgotPasswordActions} from './types';

export type TForgotPasswordFormState = {
  email: string;
};

const forgotPasswordFormInitialState: TForgotPasswordFormState = {
  email: ''
};

export const forgotPasswordFormReducer = (
  state = forgotPasswordFormInitialState,
  action: TForgotPasswordActions
) => {
  switch(action.type) {
    case ActionTypes.FORGOT_PASSWORD_FORM_SET_VALUE: {
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
