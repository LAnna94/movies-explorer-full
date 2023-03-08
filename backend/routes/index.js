const Router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const userRouter = require('./users');
const moviesRouter = require('./movie');
const NotFoundError = require('../errors/NotFoundError');

Router.use('/', authRouter);

Router.use('/users', auth, userRouter);
Router.use('/movies', auth, moviesRouter);
Router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = Router;
