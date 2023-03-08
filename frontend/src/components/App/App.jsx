import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { constants } from '../../utils/constants';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loaded, setLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notFoundMessage, setNotFoundMessage] = useState(false);
  const [saveNotFoundMessage, setSaveNotFoundMessage] = useState(false);

  const [statusRequest, setStatusRequest] = useState(null)

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  }

  const checkToken = () => {
    const token = localStorage.getItem('jwt');
    mainApi.getToken(token);
    if (token) {
      mainApi.getUserInfo()
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err)
          setLoggedIn(false);
        });
    } else {
      setLoggedIn(false);
    }
  }

  // регистрация пользователя
  const handleRegister = ({ name, email, password }) => {
    mainApi.register(name, email, password)
      .then((res) => {
        handleLogin({
          email: email,
          password: password,
        })
        setStatusRequest(200)
      })
      .catch((err) => {
        setStatusRequest(err);
      })
  }

  // авторизация пользователя
  const handleLogin = ({ email, password }) => {
    mainApi.login(email, password)
      .then((data) => {
        if (data.token) {
          mainApi.getToken(data.token);
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          navigate('/movies')
        }
      })
      .catch((err) => {
        console.log(err);
        setStatusRequest(err)
      })
  }

  // обновление данных пользователя
  const handleUpdateUser = (userData) => {
    mainApi.setProfileInfo(userData)
      .then((dataUserInfo) => {
        setCurrentUser(dataUserInfo);
        setStatusRequest(200)
      })
      .catch(err => {
        console.log('Ошибка. Запрос не выполнен: ', err)
        setStatusRequest(err)
      })
  }

  // обработка поискового запроса
  const handleSearch = (searchData) => {
    setLoaded(true)
    setMovies([]);

    if (notFoundMessage) {
      setNotFoundMessage(!notFoundMessage)
    }

    const markIdAndIsSaved = (movies, savedMovies) => {
      movies.forEach((movie) => {
        savedMovies.forEach((savedMovie) => {
          if (movie.nameRU === savedMovie.nameRU) {
            movie._id = savedMovie._id;
            movie.isSaved = true;
          }
        });
      });
      return movies;
    };

    const handleMoviesOnPage = () => {
      localStorage.setItem('searchRequest', JSON.stringify(searchData));

      moviesApi.getMovies()
        .then((movies) => {
          const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
          const markedMovies = markIdAndIsSaved(movies, savedMovies);
          const filteredMovies = markedMovies
            .filter((movie) => movie.nameRU
              .toLowerCase()
              .includes(searchData.request.toLowerCase()));


          if (filteredMovies.length > 0) {
            localStorage.setItem('searchMovies', JSON.stringify(filteredMovies));
            setMovies(filteredMovies);
          } else {
            console.log('Ошибка');
            setNotFoundMessage(!notFoundMessage)
          }

          if (searchData.switch) {
            const shortMovies = filteredMovies.filter((movie) => movie.duration <= constants.SHORT_MOVIES_DURATION);

            if (shortMovies.length > 0) {
              localStorage.setItem('searchMovies', JSON.stringify(shortMovies));
              setMovies(shortMovies);
            } else {
              console.log('Ошибка');
              setNotFoundMessage(!notFoundMessage)
            }
          }
        })
      setLoaded(false)
    }
    setTimeout(handleMoviesOnPage, 500);
  }

  // поиск по сохраненным фильмам
  const handleSavedMoviesSearch = (searchData) => {
    setLoaded(true)

    if (saveNotFoundMessage) {
      setSaveNotFoundMessage(!saveNotFoundMessage)
    }

    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

    const filteredMovies = savedMovies
      .filter((movie) => movie.nameRU
        .toLowerCase()
        .includes(searchData.request.toLowerCase()));

    if (filteredMovies.length > 0) {
      setSavedMovies(filteredMovies);
    } else {
      setSaveNotFoundMessage(true)
      console.log(saveNotFoundMessage)
    }

    if (searchData.switch) {
      const shortMovies = filteredMovies.filter((movie) => movie.duration <= constants.SHORT_MOVIES_DURATION);

      if (shortMovies.length > 0) {
        setSavedMovies(shortMovies);
      } else {
        console.log('Ошибка');
        setSaveNotFoundMessage(true)
      }
    }
    setLoaded(false);
  }

  // сохранение фильмов
  const handleSaveMovie = (movie) => {
    if (!movie.isSaved) {
      const savedMovieInfo = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }

      mainApi.saveMovie(savedMovieInfo)
        .then((saveMovie) => {
          saveMovie.isSaved = true;
          setMovies((state) => state.map((m) => {
            if (m.nameRU === movie.nameRU) {
              m.isSaved = true;
              m._id = saveMovie._id;
            }
            return m;
          }));
          localStorage.setItem('searchMovies', JSON.stringify(movies));
          setSavedMovies([...savedMovies, saveMovie]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mainApi.deleteMovie(movie._id)
        .then((deleteMovie) => {
          setMovies((state) => state.map((m) => {
            if (m.nameRU === deleteMovie.nameRU) {
              m.isSaved = false;
              m._id = deleteMovie._id;
            }
            return m;
          }));
          localStorage.setItem('searchMovies', JSON.stringify(movies));
          setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    checkToken()
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        mainApi.getUserInfo(),
        mainApi.getMovies(),
      ])
        .then(([dataUserInfo, { data: savedMoviesData }]) => {
          setCurrentUser(dataUserInfo);

          if (savedMoviesData.length > 0) {
            savedMoviesData.forEach((movie) => {
              movie.isSaved = true;
            });
          }

          localStorage.setItem('savedMovies', JSON.stringify(savedMoviesData));
          setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));

          const savedPrevMovies = JSON.parse(localStorage.getItem('searchMovies'));

          if (savedPrevMovies) {
            setMovies(savedPrevMovies);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

/*   useEffect(() => {
    if (location.pathname === '/saved-movies') {
        mainApi.getMovies()
          .then((res) => {
            setSavedMovies(res.data)
            console.log(res.data)
          })
    }
  }, [location]) */

  const onLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([])
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <>
          <Routes>

            <Route path="/signup"
            element={!loggedIn ?
              <Register
                statusRequest={statusRequest}
                onRegister={handleRegister} />
              :
              <Navigate to="/" replace />
            } />

            <Route path="/signin"
            element={!loggedIn ?
              <Login
                statusRequest={statusRequest}
                onLogin={handleLogin} />
              :
              <Navigate to="/" replace />
            } />

            <Route path="/profile"
              element={loggedIn ?
                <Profile
                  statusRequest={statusRequest}
                  onLogOut={onLogOut}
                  onUpdateUser={handleUpdateUser}
                  isOpen={isMenuOpen}
                  onMenuOpen={handleMenuOpen}
                  onMenuClose={handleMenuClose}
                  loggedIn={loggedIn} />
                :
                <Navigate to="/" replace />
              } />

            <Route path="/movies"
              element={loggedIn ?
                <Movies
                  isOpen={isMenuOpen}
                  onMenuOpen={handleMenuOpen}
                  onMenuClose={handleMenuClose}
                  loggedIn={loggedIn}
                  onSearch={handleSearch}
                  movies={movies}
                  isLoaded={loaded}
                  handleSaveMovies={handleSaveMovie}
                  notFoundMessage={notFoundMessage} />
                :
                <Navigate to="/" replace />} />

            <Route path="/saved-movies"
              element={loggedIn ?
                <SavedMovies
                  isOpen={isMenuOpen}
                  onMenuOpen={handleMenuOpen}
                  onMenuClose={handleMenuClose}
                  onSearch={handleSavedMoviesSearch}
                  handleSaveMovies={handleSaveMovie}
                  movies={savedMovies}
                  saveNotFoundMessage={saveNotFoundMessage}
                  loggedIn={loggedIn} />
                :
                <Navigate to="/" replace />} />

            <Route exact path="/"
              element={
                <Main
                  isOpen={isMenuOpen}
                  onMenuOpen={handleMenuOpen}
                  onMenuClose={handleMenuClose}
                  loggedIn={loggedIn} />
              } />
            <Route path="*" element={<PageNotFound />} />

          </Routes>
        </>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
