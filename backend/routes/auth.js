const authRouter = require('express').Router();
const { login, register } = require('../controllers/auth');
const { celebrateLogin, celebrateBodyUser } = require('../validators/users');

authRouter.post('/signup', celebrateBodyUser, register);
authRouter.post('/signin', celebrateLogin, login);

module.exports = authRouter;
