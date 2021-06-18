import {useSelector} from 'react-redux';

import {
  setResetPasswordFormValue
} from './action-creators';

export const useResetPasswordForm = () => (
  [
    useSelector(({resetPasswordFormReducer}) => ({
      password: resetPasswordFormReducer.password,
      token: resetPasswordFormReducer.token
    })),
    {
      setResetPasswordFormValue
    }
  ]
);