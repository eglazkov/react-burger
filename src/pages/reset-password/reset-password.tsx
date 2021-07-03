import React, {ChangeEvent, FC, FormEvent} from 'react';
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

type TLocation = {
  state?: {
    from?: string
  }
};

const ResetPassword: FC = () => {
  const dispatch = useDispatch();
  const location: TLocation = useLocation();
  const [
    {password, token},
    {setResetPasswordFormValue},
  ] = useResetPasswordForm();
  const [ , {fetchUserResetPasswordAction}] = useAuth();
  const onFormChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(setResetPasswordFormValue(target.name, target.value));
  }
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchUserResetPasswordAction({
      password,
      token
    })).then(({success}: {success: boolean}) => success && history.replace({pathname: `/login`}));
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

export default ResetPassword;
