import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';
import {setForgotPasswordFormValue} from './action-creators';
import {TForgotPasswordFormReducer} from './reducer';

type TActions = {
  setForgotPasswordFormValue: (field: string, value: string) => void,
};

export type TUseForgotPasswordForm = [TForgotPasswordFormReducer, TActions];

export const useForgotPasswordForm = (): TUseForgotPasswordForm => (
  [
    useSelector(({forgotPasswordFormReducer}: RootState) => ({
      email: forgotPasswordFormReducer.email
    })),
    {
      setForgotPasswordFormValue
    }
  ]
);