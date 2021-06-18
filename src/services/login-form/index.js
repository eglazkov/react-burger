import {useSelector} from 'react-redux';

import {
  setLoginFormValue
} from './action-creators';

export const useLoginForm = () => (
  [
    useSelector(({loginFormReducer}) => ({
      email: loginFormReducer.email,
      password: loginFormReducer.password
    })),
    {
      setLoginFormValue
    }
  ]
);