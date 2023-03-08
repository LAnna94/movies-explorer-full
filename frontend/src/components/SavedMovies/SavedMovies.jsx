import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ handleSaveMovies, movies, onSearch, onMenuOpen, onMenuClose, isOpen, saveNotFoundMessage, loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} isOpen={isOpen} />
      <section className="saved-movies">
        <SearchForm onSearch={onSearch} />
        <MoviesCardList
          movies={movies}
          onSave={handleSaveMovies}
          saveNotFoundMessage={saveNotFoundMessage}
        />
      </section>
      <Footer />
    </>
  )
}

export default SavedMovies;
