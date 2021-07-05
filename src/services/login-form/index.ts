import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';
import {setLoginFormValue} from './action-creators';
import {TLoginFormReducer} from './reducer';

type TActions = {
  setLoginFormValue: (field: string, value: string) => void,
};

export type TUseLoginForm = [TLoginFormReducer, TActions];

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