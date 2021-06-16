import * as ActionTypes from './action-types';

const resetPasswordFormInitialState = {
  password: '',
  token: ''
};

export const resetPasswordFormReducer = (state = resetPasswordFormInitialState, action) => {
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
