import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';
import {setRegisterFormValue} from './action-creators';
import {TRegisterFormReducer} from './reducer';

type TActions = {
  setRegisterFormValue: (field: string, value: string) => void,
};

export type TUseRegisterForm = [TRegisterFormReducer, TActions];

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