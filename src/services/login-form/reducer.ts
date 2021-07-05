import * as ActionTypes from './action-types';
import {TLoginFormActions} from './types';

export type TLoginFormInitialState = {
  email: string;
  password: string
}

const loginFormInitialState: TLoginFormInitialState = {
  email: '',
  password: ''
};

export type TLoginFormReducer = TLoginFormInitialState;

export const loginFormReducer = (
  state = loginFormInitialState,
  action: TLoginFormActions
):TLoginFormReducer => {
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
