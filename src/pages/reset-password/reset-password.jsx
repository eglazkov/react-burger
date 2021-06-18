import React from 'react';
import {useDispatch} from "react-redux";
import {Redirect, useLocation} from 'react-router-dom';
import {
  Input,
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordStyles from './reset-password.module.css';
import {
  Link
} from '../../components';
import {useResetPasswordForm, useAuth, history} from "../../services";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [
    {password, token},
    {setResetPasswordFormValue},
  ] = useResetPasswordForm();
  const [ , {fetchUserResetPasswordAction}] = useAuth();
  const onFormChange = (e) => {
    dispatch(setResetPasswordFormValue(e.target.name, e.target.value));
  }
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserResetPasswordAction({
      password,
      token
    })).then(({success}) => success && history.replace({pathname: `/login`}));
  }; 
  if (!(location.state && location.state.from === '/forgot-password')) {
    return <Redirect to="/forgot-password" />
  }

  return (
    <form onSubmit={formSubmit} className={resetPasswordStyles.container}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <div 
        className="mt-3">
        <PasswordInput
          name="password"      
          value={password}
          placeholder="Введите новый пароль"
          onChange={onFormChange}
        />
      </div>
      <div
        className="mt-3">        
        <Input
          placeholder="Введите код из письма"        
          value={token}
          name="token"
          onChange={onFormChange}
        />
      </div>
      <div
        className="mt-3 mb-5">
        <Button>Сохранить</Button>
      </div>
      <div className="mt-5 text text_type_main-default">
        <span className={resetPasswordStyles.label}>Вспомнили пароль? </span>
        <Link to="/login">Войти</Link>
      </div>
    </form>
  )
}
