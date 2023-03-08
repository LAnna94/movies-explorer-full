const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const unauthorizedError = new UnauthorizedError('Необходима авторизация');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw unauthorizedError;
  }

  const token = authorization.replace(/^Bearer\s/i, '');
  let payload;

  try {
    const { JWT_SECRET } = req.app.get('config');
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(unauthorizedError);
  }
  req.user = payload;
  next();
};

module.exports = auth;
