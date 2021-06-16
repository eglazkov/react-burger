import React from 'react';
import {useDispatch} from "react-redux";
import {
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordStyles from './forgot-password.module.css';
import Link from '../../components/link';
import {useForgotPasswordForm, useAuth, history} from "../../services";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [
    {email},
    {setForgotPasswordFormValue},
  ] = useForgotPasswordForm();
  const [ , {fetchUserResetPasswordRequestAction}] = useAuth();
  const onFormChange = (e) => {
    dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
  }
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserResetPasswordRequestAction({
      email
    })).then(({success}) => success && history.replace({pathname: `/reset-password`}));
  };
  return (
    <form onSubmit={formSubmit} className={forgotPasswordStyles.container}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <div
        className="mt-3">        
        <EmailInput        
          value={email}
          name="email"
          onChange={onFormChange}
        />
      </div>
      <div
        className="mt-3 mb-5">
        <Button>Восстановить</Button>
      </div>
      <div className="mt-5 text text_type_main-default">
        <span className={forgotPasswordStyles.label}>Вспомнили пароль? </span>
        <Link to="/login">Войти</Link>
      </div>
    </form>
  )
}
