import './Register.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register({ onRegister, statusRequest }) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // установка сообщений об ошибке для каждого инпута
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // статус валидации полей
  const [isNameValid, setIsNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [messageStatus, setMessageStatus] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  // const [statusRequest, setStatusRequest] = useState(null)

  const handleRegisterStatus = () => {
    if(statusRequest === 409) {
      setMessageStatus('Пользователь с таким email уже существует.')
    } else if (statusRequest === 400) {
      setMessageStatus('Некорректные данные пользователя.')
    } else if (statusRequest === 500) {
      setMessageStatus('На сервере произошла ошибка, попробуйте позже.')
    }
  }

  useEffect(() => {
    handleRegisterStatus()
  }, [statusRequest])

  const handleName = (evt) => {
    setName(evt.target.value);
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g;

    if(evt.target.value.length < 2 || evt.target.value.length > 30) {
      setNameError('Имя должно быть от 2 до 30 символов')
      setIsNameValid(false)
    } else if(!nameRegex.test(String(evt.target.value).toLowerCase())) {
      setNameError('Некорректное имя')
      setIsNameValid(false)
    } else {
      setNameError('')
      setIsNameValid(true)
    }
  }

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
    setPassword(evt.target.value);

    if(evt.target.value.length < 2) {
      setPasswordError('Пароль должен содержать от 2 до 30 символов')
      setIsPasswordValid(false)
    } else {
      setPasswordError('')
      setIsPasswordValid(true)
    }
  }

  const handleIsFormValid = () => {
    if(!isNameValid || !isEmailValid || !isPasswordValid) {
      setIsFormValid(false)
      return
    } else {
      setIsFormValid(true)
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ name, email, password })
  }

  useEffect(() => {
    handleIsFormValid()
  }, [name, email, password])



  return (
    <section className="auth">
      <Link to="/">
      <img src={logo} alt="Лого" className="auth__logo" />
      </Link>
      <h2 className="auth__header">Добро пожаловать!</h2>
      <form name="register" onSubmit={handleSubmit} className="auth-form" noValidate>
        <fieldset className="auth-form__input-container">
          <label htmlFor="name" className="auth-form__label">Имя</label>
          <input
            type="text"
            name="name"
            id="name"
            className={`auth-form__input auth-form__input_type_name ${isNameValid ? "" : "auth-form__input_error"}`}
            minLength="2"
            maxLength="30"
            required
            value={name}
            onChange={handleName}
            />
          <span className="name-input-error auth-form__input-error">{nameError}</span>
          <label htmlFor="email" className="auth-form__label">E-mail</label>
          <input
            type="text"
            name="email"
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
        <button type="submit" disabled={!isFormValid} className={`auth-form__save-button ${isFormValid ? '' : "auth-form__save-button_disabled"}`}>Зарегистрироваться</button>
      </form>
      <div className="auth__link-element">
        <p className="auth__log-in-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="auth__log-in-link">Войти</Link>
      </div>
    </section>
  )
}

export default Register;
