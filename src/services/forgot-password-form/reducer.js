import * as ActionTypes from './action-types';

const forgotPasswordFormInitialState = {
  email: ''
};

export const forgotPasswordFormReducer = (state = forgotPasswordFormInitialState, action) => {
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
