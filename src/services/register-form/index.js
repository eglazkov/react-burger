import {useSelector} from 'react-redux';

import {
  setRegisterFormValue
} from './action-creators';

export const useRegisterForm = () => (
  [
    useSelector(({registerFormReducer}) => ({
      name: registerFormReducer.name,
      email: registerFormReducer.email,
      password: registerFormReducer.password
    })),
    {
      setRegisterFormValue
    }
  ]
);