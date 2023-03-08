import './PageNotFound.css';

function PageNotFound() {
  return (
      <section className="not-found">
        <div className="not-found__content">
          <h1 className="not-found__header">404</h1>
          <p className="not-found__subheader">Страница не найдена</p>
        </div>
        <a href="/" className="not-found__link">Назад</a>
      </section>
  )
}

export default PageNotFound;
