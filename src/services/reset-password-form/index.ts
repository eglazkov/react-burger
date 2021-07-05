import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';
import {setResetPasswordFormValue} from './action-creators';
import {TResetPasswordFormReducer} from './reducer';

type TActions = {
  setResetPasswordFormValue: (field: string, value: string) => void,
};

export type TUseResetPasswordForm = [TResetPasswordFormReducer, TActions];

export const useResetPasswordForm = (): TUseResetPasswordForm => (
  [
    useSelector(({resetPasswordFormReducer}: RootState) => ({
      password: resetPasswordFormReducer.password,
      token: resetPasswordFormReducer.token
    })),
    {
      setResetPasswordFormValue
    }
  ]
);