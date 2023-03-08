import './MoviesCardList.css'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import { constants } from '../../../utils/constants';

function MoviesCardList({ movies, onSave, notFoundMessage, saveNotFoundMessage }) {

  const location = useLocation();
  const [loadCards, setLoadCards] = useState(true)

  const [index, setIndex] = useState({
    start: constants.INITIAL_MOVIES_CARDS_DESKTOP,
    load: constants.ADD_MOVIES_CARDS_DESKTOP
  })

  const handleRenderCounter = (movies) => {
    if (window.innerWidth >= 767) {
      setIndex({
        start: constants.INITIAL_MOVIES_CARDS_DESKTOP,
        load: constants.ADD_MOVIES_CARDS_DESKTOP,
      })
    }

    if (window.innerWidth <= 768) {
      setIndex({
        start: constants.INITIAL_MOVIES_CARDS_MOBILE,
        load: constants.ADD_MOVIES_CARDS_MOBILE,
      })
    }
  }

  const renderMovies = movies.slice(0, index.start);

  const loadMoreCards = () => {

    if (renderMovies.length >= movies.length - index.load) {
      setLoadCards(false)
    }

    setIndex({
      start: index.start + index.load,
      load: index.load,
    })
  }

  useEffect(() => {
    if (movies.length <= index.load) {
      setLoadCards(false)
    } else {
      setLoadCards(true)
    }

    window.addEventListener("resize", handleRenderCounter);

    return () => window.removeEventListener("resize", handleRenderCounter);
  }, [movies, index.load])

  return (
    <div className="movie-cards">
      {location.pathname === "/movies" && !notFoundMessage && (
        <>
          <ul className="cards-container">
            {renderMovies.map(movie => (
              <MoviesCard
                onSave={onSave}
                key={(movie.id)}
                movie={movie}
              />)
            )}
          </ul>
          {loadCards &&
            <button
              onClick={loadMoreCards}
              className="movie-cards__more">Ещё</button>
          }
        </>
      )}
      {location.pathname === "/saved-movies" && !saveNotFoundMessage && (
        <ul className="cards-container">
          {movies.map(movie => (
            <MoviesCard
              onSave={onSave}
              key={(movie._id)}
              movie={movie}
            />)
          )}
        </ul>
      )}

      {(notFoundMessage || saveNotFoundMessage) && (
        <p className="cards-container__error-message">Ничего не найдено</p>
      )}
    </div>
  )
}

export default MoviesCardList;
