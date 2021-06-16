import React from 'react';
import {useDispatch} from "react-redux";
import {
  EmailInput, 
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyles from './login.module.css';
import Link from '../../components/link';
import Spinner from '../../components/spinner';
import {useLoginForm, useAuth} from "../../services";

export default function Login() {
  const dispatch = useDispatch();
  const [
    {email, password},
    {setLoginFormValue},
  ] = useLoginForm();
  const [
    {userActionPending},
    {fetchUserLoginAction}
  ] = useAuth();

  const onFormChange = (e) => {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  }
  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchUserLoginAction({
      email,
      password
    }));
  };

  return (
    userActionPending ?
    <Spinner /> :
    <form onSubmit={formSubmit} className={loginStyles.container}>
      <span className="text text_type_main-medium">Вход</span>
      <div
        className="mt-3">        
        <EmailInput
          name="email"        
          value={email}
          onChange={onFormChange}
        />
      </div>
      <div 
        className="mt-3">
        <PasswordInput
          name="password"      
          value={password}
          onChange={onFormChange}
        />
      </div>
      <div
        className="mt-3 mb-5">
        <Button>Войти</Button>
      </div>
      <div className="mt-5 text text_type_main-default">
        <span className={loginStyles.label}>Вы — новый пользователь? </span>
        <Link to="/register">Зарегистрироваться</Link>
      </div>
      <div className="mt-1 text text_type_main-default">
        <span className={loginStyles.label}>Забыли пароль? </span>
        <Link to="/forgot-password">Восстановить пароль</Link>
      </div>
    </form>
  )
}
