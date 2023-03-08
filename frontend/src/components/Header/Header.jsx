import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isOpen, onMenuOpen, onMenuClose, loggedIn }) {

  return (
    <header className="header header_inner">
      <div className="header__content">
        <Link to="/">
          <img src={logo} alt="Лого" className="logo" />
        </Link>
        <Navigation loggedIn={loggedIn} isOpen={isOpen} onMenuClose={onMenuClose} onMenuOpen={onMenuOpen} />
      </div>
    </header>
  )
}

export default Header;
