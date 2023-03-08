import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <div className="techs__content">
        <h2 className="techs__header">Технологии</h2>
        <div className="techs__line"></div>
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__items">
          <li className="techs__item">
            <p className="techs__item-text">HTML</p>
          </li>
          <li className="techs__item">
            <p className="techs__item-text">CSS</p>
            </li>
          <li className="techs__item">
            <p className="techs__item-text">JS</p>
            </li>
          <li className="techs__item">
            <p className="techs__item-text">React</p>
            </li>
          <li className="techs__item">
            <p className="techs__item-text">Git</p>
            </li>
          <li className="techs__item">
            <p className="techs__item-text">Express.js</p>
            </li>
          <li className="techs__item">
            <p className="techs__item-text">mongoDB</p>
            </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;
