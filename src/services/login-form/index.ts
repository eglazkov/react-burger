import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  setLoginFormValue
} from './action-creators';

type TSelectors = {
  email: string,
  password: string
};

type TActions = {
  setLoginFormValue: (field: string, value: string) => void,
};

export type TUseLoginForm = [TSelectors, TActions];

export const useLoginForm = (): TUseLoginForm => (
  [
    useSelector(({loginFormReducer}: RootState) => ({
      email: loginFormReducer.email,
      password: loginFormReducer.password
    })),
    {
      setLoginFormValue
    }
  ]
);