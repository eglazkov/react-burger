import React, {useState} from 'react';
import {
  EmailInput, 
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyles from './login.module.css';
import Link from '../../components/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formSubmit = () => {
    alert('form action');
  };
  return (
    <form onSubmit={formSubmit} className={loginStyles.container}>
      <span className="text text_type_main-medium">Вход</span>
      <div
        className="mt-3">        
        <EmailInput        
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div 
        className="mt-3">
        <PasswordInput      
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        className="mt-3 mb-5">
        <Button>Войти</Button>
      </div>
      <div className="mt-5 text text_type_main-default">
        <span className={loginStyles.label}>Вы — новый пользователь? </span>
        <Link className={loginStyles.link} to="/register">Зарегистрироваться</Link>
      </div>
      <div className="mt-1 text text_type_main-default">
        <span className={loginStyles.label}>Забыли пароль? </span>
        <Link className={loginStyles.link} to="/forgot-password">Восстановить пароль</Link>
      </div>
    </form>
  )
}
