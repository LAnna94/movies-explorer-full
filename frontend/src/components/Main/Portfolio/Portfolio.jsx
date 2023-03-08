import './Portfolio.css';

function Portfolio () {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a href='https://github.com/LAnna94/how-to-learn' className="portfolio__link-text" target="_blank" rel="noreferrer">Статичный сайт</a>
        </li>
        <li className="portfolio__link">
          <a href='https://github.com/LAnna94/russian-travel' className="portfolio__link-text" target="_blank" rel="noreferrer">Адаптивный сайт</a>
        </li>
        <li className="portfolio__link">
          <a href='https://github.com/LAnna94/react-mesto-api-full' className="portfolio__link-text" target="_blank" rel="noreferrer">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
