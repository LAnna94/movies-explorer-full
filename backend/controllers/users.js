const User = require('../models/users');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const notFoundError = new NotFoundError('Пользователь не найден');
const buildBadRequestError = new BadRequestError('Некорректные данные пользователя');
const notUniqueUserError = new ConflictError('Пользователь с указанным email уже существует');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw notFoundError;
      } else {
        res.send(user);
      }
    })
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw buildBadRequestError;
      }
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(notUniqueUserError);
      } else if (err.name === 'castError' || err.name === 'ValidationError') {
        next(buildBadRequestError);
      } else {
        next(err);
      }
    });
};
