import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ isOpen, onMenuOpen, onMenuClose, loggedIn }) {

  return (
    <nav className="navigation">
      {loggedIn && (
        <>
        <div className={`navbar navbar_type_loggedin ${isOpen ? 'navbar_opened' : ''}`}>
          <ul className="navbar__items navbar__items_type_movie">
            <li className="navbar__item navbar__item_hidden">
              <Link to="/" className="navbar__link navbar__link_size_big">
                Главная
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/movies" className="navbar__link navbar__link_size_big">
                Фильмы
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/saved-movies" className="navbar__link navbar__link_size_big">
                Сохраненные фильмы
              </Link>
            </li>
          </ul>
          <ul className="navbar__items navbar__items_type_accaunt">
            <li className="navbar__item">
              <Link to="/profile" className="navbar__link navbar__link_size_middle">
                Аккаунт
              </Link>
            </li>
            <li className="navbar__item">
              <div className="navbar__icon"></div>
            </li>
          </ul>
          <button type="button" onClick={onMenuClose} className="navbar__close-button"></button>
        </div>
        <div>
          <button onClick={onMenuOpen} type="button" className="burger-menu"></button>
        </div>
      </>
      )}
      {!loggedIn && (
                <>
                <ul className="navbar">
                  <li className="navbar__item">
                    <Link to="/signup" className="navbar__link">
                      Регистрация
                    </Link>
                  </li>
                  <li className="navbar__item">
                    <Link to="/signin" className="navbar__button">
                      Войти
                    </Link>
                  </li>
                </ul>
              </>
      )}
    </nav >
  )
}

export default Navigation;
