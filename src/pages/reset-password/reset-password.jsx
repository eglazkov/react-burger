import React, {useState} from 'react';
import {
  Input,
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import resetPasswordStyles from './reset-password.module.css';
import Link from '../../components/link';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const formSubmit = () => {
    alert('form action');
  };
  return (
    <form onSubmit={formSubmit} className={resetPasswordStyles.container}>
      <span className="text text_type_main-medium">Восстановление пароля</span>
      <div
        className="mt-3">        
        <EmailInput        
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div
        className="mt-3">        
        <Input
          placeholder="Введите код из письма"        
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
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
