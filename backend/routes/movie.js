const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { celebrateBodyMovie, celebrateMovieId } = require('../validators/movie');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', celebrateBodyMovie, createMovie);
moviesRouter.delete('/:_id', celebrateMovieId, deleteMovie);

module.exports = moviesRouter;
