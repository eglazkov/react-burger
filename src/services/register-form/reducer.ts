import * as ActionTypes from './action-types';
import {TRegisterFormActions} from './types';

export type TRegisterFormInitialState = {
  name: string;
  email: string;
  password: string;
};

const registerFormInitialState: TRegisterFormInitialState = {
  name: '',
  email: '',
  password: ''
};

export type TRegisterFormReducer = TRegisterFormInitialState;

export const registerFormReducer = (
  state = registerFormInitialState,
  action: TRegisterFormActions
): TRegisterFormReducer => {
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
