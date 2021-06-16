import * as ActionTypes from './action-types';

const loginFormInitialState = {
  email: '',
  password: ''
};

export const loginFormReducer = (state = loginFormInitialState, action) => {
  switch(action.type) {
    case ActionTypes.LOGIN_FORM_SET_VALUE: {
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
