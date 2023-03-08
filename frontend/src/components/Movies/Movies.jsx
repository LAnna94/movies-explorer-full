import './Movies.css';
import '../Footer/Footer.css'
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';

function Movies({ isLoaded, onSearch, movies, handleSaveMovies, onMenuOpen, onMenuClose, isOpen, notFoundMessage, loggedIn }) {

  return (
    <>
      <Header loggedIn={loggedIn} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} isOpen={isOpen} />
      <section className="movies">
        <SearchForm onSearch={onSearch} />
        {isLoaded ?
          <Preloader />
          :
          <MoviesCardList movies={movies} onSave={handleSaveMovies} notFoundMessage={notFoundMessage} />}
      </section>
      <Footer />
    </>
  )
}

export default Movies;
