export {useIngredeints} from './ingredients';
export {useOrder} from './order';
export {useConstructor} from './constructor';
export {useRegisterForm} from './register-form';
export {useLoginForm} from './login-form';
export {useForgotPasswordForm} from './forgot-password-form';
export {useResetPasswordForm} from './reset-password-form';
export {useAuth} from './user';
export {default as history} from './history';
export {MainRouter} from './routes';

export function setCookie(name, value, props) {  
  props = {
    // path: '/',
    ...props
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    // eslint-disable-next-line no-useless-escape
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
} 
