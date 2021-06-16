import {useSelector} from 'react-redux';

import {
  setForgotPasswordFormValue
} from './action-creators';

export const useForgotPasswordForm = () => (
  [
    useSelector(({forgotPasswordFormReducer}) => ({
      email: forgotPasswordFormReducer.email
    })),
    {
      setForgotPasswordFormValue
    }
  ]
);