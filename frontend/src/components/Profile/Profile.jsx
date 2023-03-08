import './Profile.css';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useContext } from 'react';


function Profile({ onUpdateUser, onLogOut, isOpen, onMenuOpen, onMenuClose, statusRequest, loggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [messageStatus, setMessageStatus] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormUpdated, setIsFormUpdated] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email)
  }, [currentUser])

  const handleProfileStatus = () => {
    if (statusRequest === 200) {
      setMessageStatus('Данные успешно обновлены');
      setIsFormUpdated(true);
      setIsFormValid(false)
    } else if (statusRequest === 409) {
      setMessageStatus('Пользователь с такие email уже существует.')
      setIsFormValid(false)
    } else if (statusRequest === 500) {
      setMessageStatus('На сервере произошла ошибка, попробуйте позже.')
      setIsFormValid(false)
    } else if (statusRequest === 400) {
      setMessageStatus('Некорректное имя или email.')
      setIsFormValid(false)
    }
  }

  useEffect(() => {
    handleProfileStatus()
  }, [statusRequest, isFormUpdated])

  const compareUserInfo = (currentName, newName) => {
    if(currentName === newName) {
      setButtonDisabled(true)
    } else {
      setButtonDisabled(false)
    }
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
    setMessageStatus('');
    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;

    compareUserInfo(currentUser.email, evt.target.value)

    if (evt.target.value.length < 1 ) {
      setMessageStatus('Поле email не может быть пустым')
      setIsEmailValid(false)
    } else if (!emailRegex.test(String(evt.target.value).toLowerCase())) {
      setMessageStatus('Некорректный email')
      setIsEmailValid(false)
    } else {
      setMessageStatus('')
      setIsEmailValid(true)
    }
  }

  const handleName = (evt) => {
    setName(evt.target.value);
    setMessageStatus('');
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g;

    compareUserInfo(currentUser.name, evt.target.value)

    if (evt.target.value.length < 2 || evt.target.value.length > 30) {
      setMessageStatus('Имя должно содержать от 2 до 30 символов')
      setIsNameValid(false)
    } else if (!nameRegex.test(String(evt.target.value).toLowerCase())) {
      setMessageStatus('Некорректное имя')
      setIsNameValid(false)
    } else {
      setMessageStatus('')
      setIsNameValid(true)
    }
  }

  const handleIsFormValid = () => {
    if (!isNameValid && !isEmailValid) {
      setIsFormValid(false)
      return
    } else {
      setIsFormValid(true)
    }
  }

  useEffect(() => {
    handleIsFormValid()
  }, [name, email])

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setIsFormUpdated(false)
    onUpdateUser({
      name,
      email,
    });
  }

  return (
    <>
      <Header isOpen={isOpen} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} loggedIn={loggedIn} />
      <section className="profile">
        <div className="profile__content">
          <h2 className="profile__header">Привет, {name}!</h2>
          <form className="profile-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="profile-form__input-container">
              <label htmlFor="name" className="profile-form__label">
                <span className="profile-form__text">Имя</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="profile-form__input"
                  minLength="2"
                  maxLength="30"
                  value={name}
                  onChange={handleName}
                  required
                />
              </label>
              <div className="profile__line"></div>
              <label htmlFor="email" className="profile-form__label">
                <span className="profile-form__text">E-mail</span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="profile-form__input"
                  value={email}
                  onChange={handleEmail}
                  required
                />
              </label>
            </fieldset>
            <div className="profile__button-section">
            <span className={`profile__error-message profile__error-message_visible ${statusRequest === 200 ? "profile__error-message_success" : ""}`}>{messageStatus}</span>
            <button type="submit" disabled={!isFormValid || buttonDisabled} className={`profile__edit-button ${!isFormValid || buttonDisabled ? "profile__edit-button_disabled" : ""}`}>Редактировать</button>
            </div>
          </form>
        </div>
        <div className="profile__buttons">
          <Link to="/">
            <button type="button" onClick={onLogOut} className="profile__log-out-button">Выйти из аккаунта</button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Profile;
