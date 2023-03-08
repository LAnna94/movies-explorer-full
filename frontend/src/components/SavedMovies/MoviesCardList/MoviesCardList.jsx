import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList () {
  return (
    <div className="movie-cards">
      <ul className="cards-container">
        <MoviesCard />
      </ul>
      <button className="movie-cards__more movie-cards__more_hidden">Ещё</button>
    </div>
  )
}

export default MoviesCardList;
