const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const ConflictError = require('../errors/ConflictError');

const unauthorizedError = new UnauthorizedError('Неправильная почта или пароль');
const buildBadRequestError = new BadRequestError('Некорректные данные пользователя');
const notUniqueUserError = new ConflictError('Пользователь с указанным email уже существует');
const buildServerError = new ServerError('На сервере произошла ошибка');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_SECRET } = req.app.get('config');

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(unauthorizedError);
    });
};

module.exports.register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;
      return User.create(req.body);
    })
    .then((document) => {
      const { password: removed, ...user } = document.toObject();
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(notUniqueUserError);
      } else if (err.name === 'ValidationError') {
        next(buildBadRequestError);
      } else {
        next(buildServerError);
      }
    });
};
