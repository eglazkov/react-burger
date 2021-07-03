import {useSelector} from 'react-redux';
import {RootState} from '../rootReducer';

import {
  setForgotPasswordFormValue
} from './action-creators';

type TSelectors = {
  email: string
};

type TActions = {
  setForgotPasswordFormValue: (field: string, value: string) => void,
};

export type TUseForgotPasswordForm = [TSelectors, TActions];

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