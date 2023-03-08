import '../Register/Register.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login({ onLogin, statusRequest }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [messageStatus, setMessageStatus] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  // const [statusRequest, setStatusRequest] = useState(null);

  const handleLoginStatus = () => {
    if(statusRequest === 401) {
      setMessageStatus('Такого пользователя не существует. Зарегистрируйтесь')
    } else if (statusRequest === 400) {
      setMessageStatus('Неправильный логин или пароль.')
    } else if (statusRequest === 500) {
      setMessageStatus('На сервере произошла ошибка, попробуйте позже.')
    }
  }

  useEffect(() => {
    handleLoginStatus()
  }, [statusRequest])


  const handleEmail = (evt) => {
    setEmail(evt.target.value);
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if(evt.target.value.length === 0) {
      setEmailError('Поле не может быть пустым');
      setIsEmailValid(false)
    } if (!emailRegex.test(String(evt.target.value).toLowerCase())) {
      setEmailError('Некорректный email');
      setIsEmailValid(false)
    } else {
      setEmailError('')
      setIsEmailValid(true)
    }
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value)

    if(evt.target.value.length < 2) {
      setPasswordError('Пароль должен содержать от 2 до 30 символов')
      setIsPasswordValid(false)
    } else {
      setPasswordError('')
      setIsPasswordValid(true)
    }
  }

  const handleIsFormValid = () => {
    if(!isEmailValid || !isPasswordValid) {
      setIsFormValid(false)
      return
    } else {
      setIsFormValid(true)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({ email, password })
  }

  useEffect(() => {
    handleIsFormValid()
  }, [email, password])

  return (
    <section className="auth">
      <Link to="/">
        <img src={logo} alt="Лого" className="auth__logo" />
      </Link>
      <h2 className="auth__header">Рады видеть!</h2>
      <form name="login" onSubmit={handleSubmit} className="auth-form" noValidate>
        <fieldset className="auth-form__input-container">
          <label htmlFor="email" className="auth-form__label">E-mail</label>
          <input
            type="text"
            name="name"
            id="email"
            className={`auth-form__input auth-form__input_type_email ${isEmailValid ? "" : "auth-form__input_error"}`}
            minLength="2"
            maxLength="30"
            required
            value={email}
            onChange={handleEmail}
          />
          <span className="email-input-error auth-form__input-error">{emailError}</span>
          <label htmlFor="password" className="auth-form__label">Пароль</label>
          <input
            type="password"
            name="password"
            id="password"
            className={`auth-form__input auth-form__input_type_password ${isPasswordValid ? "" : "auth-form__input_error"}`}
            minLength="2"
            maxLength="30"
            required
            value={password}
            onChange={handlePassword}
          />
          <span className="password-input-error auth-form__input-error">{passwordError}</span>
        </fieldset>
        <span className="profile__error-message profile__error-message_visible">{messageStatus}</span>
        <button type="submit" disabled={!isFormValid} className={`auth-form__save-button ${isFormValid ? '' : "auth-form__save-button_disabled"}`}>Войти</button>
      </form>
      <div className="auth__link-element">
        <p className="auth__log-in-text">Еще не зарегистрированы?</p>
        <Link to="/signup" className="auth__log-in-link">Регистрация</Link>
      </div>
    </section>
  )
}

export default Login;
