import React, {ChangeEvent, FC, FormEvent} from 'react';
import {useDispatch} from "react-redux";
import {
  Input,
  EmailInput, 
  PasswordInput, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import registerStyles from './register.module.css';
import {
  AppSpinner,
  Link
} from '../../components';
import {useRegisterForm, useAuth, history} from "../../services";

const Register: FC = () => {
  const dispatch = useDispatch();
  const [
    {name, email, password},
    {setRegisterFormValue},
  ] = useRegisterForm();
  const [
    {userActionPending},
    {fetchUserRegisterAction}
  ] = useAuth();

  const onFormChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(setRegisterFormValue(target.name, target.value));
  }
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchUserRegisterAction({
      email,
      password,
      name
    })).then(({success, errorMessage}: {success: boolean, errorMessage: string}) => {
      if (success) {
        history.replace({pathname: `/login`});
      } else {
        errorMessage && alert(`Во время запроса произошла ошибка: ${errorMessage}`);
      }
    });
  };
  return (
    !userActionPending ?
    <form onSubmit={formSubmit} className={registerStyles.container}>
      <span className="text text_type_main-medium">Регистрация</span>
      <div
        className="mt-3">        
        <Input
          placeholder="Имя"
          name="name"        
          value={name}
          onChange={onFormChange}
        />
      </div>
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
        <Button>Зарегистрироваться</Button>
      </div>
      <div className="mt-5 text text_type_main-default">
        <span className={registerStyles.label}>Уже зарегистрированы? </span>
        <Link to="/login">Войти</Link>
      </div>
    </form> :
    <AppSpinner />
  )
}


export default Register;
