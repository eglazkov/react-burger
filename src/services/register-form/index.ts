import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  setRegisterFormValue
} from './action-creators';


type TSelectors = {
  name: string,
  email: string,
  password: string
};

type TActions = {
  setRegisterFormValue: (field: string, value: string) => void,
};

export type TUseRegisterForm = [TSelectors, TActions];

export const useRegisterForm = (): TUseRegisterForm => (
  [
    useSelector(({registerFormReducer}: RootState) => ({
      name: registerFormReducer.name,
      email: registerFormReducer.email,
      password: registerFormReducer.password
    })),
    {
      setRegisterFormValue
    }
  ]
);