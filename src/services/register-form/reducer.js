import * as ActionTypes from './action-types';

const registerFormInitialState = {
  name: '',
  email: '',
  password: ''
};

export const registerFormReducer = (state = registerFormInitialState, action) => {
  switch(action.type) {
    case ActionTypes.REGISTER_FORM_SET_VALUE: {
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
