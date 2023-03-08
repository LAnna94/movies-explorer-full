import './NavTab.css';

function NavTab() {
  return (
    <div className="menu">
      <a href="#about-project" className="menu__button">
        <p className="menu__button-text">О проекте</p>
      </a>
      <a href="#techs" className="menu__button">
        <p className="menu__button-text">Технологии</p>
      </a>
      <a href="#student" className="menu__button">
        <p className="menu__button-text">Студент</p>
      </a>
    </div>
  )
}

export default NavTab;
