import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({ onSearch }) {

  const location = useLocation();

  const [searchMovie, setSearchMovie] = useState();
  const [checkBox, setCheckbox] = useState(false);
  const [isRequestEmpty, setIsRequestEmpty] = useState(false)

  const handleSearchMovie = (evt) => {
    setSearchMovie(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!searchMovie) {
      setIsRequestEmpty(true)
      return
    }

    const searchData = {
      request: searchMovie,
      switch: checkBox,
    }

    onSearch(searchData)
    setIsRequestEmpty(false)
  }

  const handleCheckbox = () => {
    setCheckbox(!checkBox)
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      const searchRequest = JSON.parse(localStorage.getItem('searchRequest'));

      if (searchRequest) {
        setCheckbox(searchRequest.switch);
        setSearchMovie(searchRequest.request)
      }
    }
  }, [])

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} name="search-movie" className="search-form" noValidate>
        <fieldset className="search-form__input-container">
            <input
              type="text"
              name="movie"
              placeholder="Фильм"
              minLength="2"
              maxLength="30"
              className="search-form__input"
              required
              value={searchMovie || ''}
              onChange={handleSearchMovie}
            />
            <button type="submit" aria-label="Поиск" className="search-form__button"></button>
            <span className="search-form__input-error">{isRequestEmpty && "Введите запрос"}</span>
        </fieldset>
        <FilterCheckbox checked={checkBox} handleCheckbox={handleCheckbox} />
      </form>
      <div className="line"></div>
    </div>
  )
}

export default SearchForm;
