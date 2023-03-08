const { constants } = require('http2');

const errorHandler = ((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.statusCode === 500 ? 'Неизвестная ошибка' : err.message;
  res.status(status).send({ message });
  next();
});

module.exports = errorHandler;
