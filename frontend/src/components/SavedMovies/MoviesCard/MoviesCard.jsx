import './MoviesCard.css'
import movieAvatar from '../../../images/33-slova-o-dizayne.png';

function MoviesCard() {
  return (
    <>
      <li className="movie-card">
        <div className="movie-card__info">
          <div className="movie-card__descr">
            <h3 className="movie-card__header">33 слова о дизайне</h3>
            <p className="movie-card__duration">1ч 42м</p>
          </div>
          <button type="button" className="movie-card__like-button movie-card__dislike" aria-label="Нравится"></button>
        </div>
        <img className="movie-card__picture" src={movieAvatar} alt="Картинка" />
      </li>
      <li className="movie-card">
        <div className="movie-card__info">
          <div className="movie-card__descr">
            <h3 className="movie-card__header">33 слова о дизайне</h3>
            <p className="movie-card__duration">1ч 42м</p>
          </div>
          <button type="button" className="movie-card__like-button movie-card__dislike" aria-label="Нравится"></button>
        </div>
        <img className="movie-card__picture" src={movieAvatar} alt="Картинка" />
      </li>
    </>
  )
}

export default MoviesCard;
