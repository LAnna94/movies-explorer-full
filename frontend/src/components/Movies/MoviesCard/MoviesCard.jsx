import './MoviesCard.css'
import { Link, useLocation } from 'react-router-dom';

function MoviesCard({ movie, onSave }) {

  const location = useLocation();

  const baseUrl = 'https://api.nomoreparties.co/';
  let imageUrl = '';

  if (movie.image.url) {
    imageUrl = `${baseUrl}${movie.image.url}`
  } else {
    imageUrl = movie.image
  }

  const handleLike = () => {
    onSave(movie)
  }

  const convertMinutesToHours = (min) => {
    const hours = Math.floor(min / 60);
    const minutes = min % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <>
      <li className="movie-card">
        <div className="movie-card__info">
          <div className="movie-card__descr">
            <h3 className="movie-card__header">{movie.nameRU}</h3>
            <p className="movie-card__duration">{convertMinutesToHours(movie.duration)}</p>
          </div>
          <button
            type="button"
            onClick={handleLike}
            className={`movie-card__like-button ${!movie.isSaved ? "" : "movie-card__like-button_active"} ${location.pathname === "/saved-movies" ? "movie-card__dislike" : ""}`}
            aria-label="Нравится">
          </button>
        </div>
        <a href={movie.trailerLink} target="_blank" rel="noreferrer">
          <img className="movie-card__picture" src={imageUrl} alt={movie.nameRU} />
        </a>
      </li>
    </>
  )
}

export default MoviesCard;
