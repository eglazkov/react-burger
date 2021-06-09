import React, {useState} from 'react';
import {
  Input,
  EmailInput, 
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from './register.module.css';
import Link from '../../components/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formSubmit = () => {
    alert('form action');
  };
  return (
    <form onSubmit={formSubmit} className={registerStyles.container}>
      <span className="text text_type_main-medium">Регистрация</span>
      <div
        className="mt-3">        
        <Input
          placeholder="Имя"        
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <Button>Зарегистрироваться</Button>
      </div>
      <div className="mt-5 text text_type_main-default">
        <span className={registerStyles.label}>Уже зарегистрированы? </span>
        <Link to="/login">Войти</Link>
      </div>
    </form>
  )
}
