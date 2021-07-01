import React, {ChangeEvent, FormEvent, FC} from 'react';
import {useDispatch} from "react-redux";
import {useLocation} from 'react-router-dom';
import {
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import forgotPasswordStyles from './forgot-password.module.css';
import {Link} from '../../components';
import {useForgotPasswordForm, useAuth, history} from "../../services";


const ForgotPassword: FC = () => {
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  const [
    {email},
    {setForgotPasswordFormValue},
  ] = useForgotPasswordForm();
  const [ , {fetchUserResetPasswordRequestAction}] = useAuth();
  const onFormChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    dispatch(setForgotPasswordFormValue(target.name, target.value));
  }
  const formSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchUserResetPasswordRequestAction({
      email
    })).then(({success}: {success: boolean}) => success &&
    history.replace({
      pathname: `/reset-password`,
      state: {from: pathname}
    }));
  };
  return (
    <form onSubmit={(e) => formSubmit(e)} className={forgotPasswordStyles.container}>
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

export default ForgotPassword;
