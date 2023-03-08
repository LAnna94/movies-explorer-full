const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');

const buildServerError = new ServerError('На сервере произошла ошибка');
const notFoundError = new NotFoundError('Карточка не найдена');
const buildBadRequestError = new BadRequestError('Некорректные данные');
const forbiddenError = new ForbiddenError('Это действие возможно только со своими карточками');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch(() => next(buildServerError));
};

module.exports.createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(buildBadRequestError);
      } else {
        next(buildServerError);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw notFoundError;
      } else if (req.user._id !== movie.owner.toString()) {
        throw forbiddenError;
      } else {
        return movie.remove();
      }
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(buildBadRequestError);
      } else {
        next(err);
      }
    });
};
