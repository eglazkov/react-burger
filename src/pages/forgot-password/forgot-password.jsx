import React, {useState} from 'react';
import {
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordStyles from './forgot-password.module.css';
import Link from '../../components/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const formSubmit = () => {
    alert('form action');
  };
  return (
    <form onSubmit={formSubmit} className={forgotPasswordStyles.container}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <div
        className="mt-3">        
        <EmailInput        
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
