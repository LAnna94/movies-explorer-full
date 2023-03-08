const { celebrate, Joi } = require('celebrate');
const regexUrl = require('./common');

module.exports.celebrateBodyMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexUrl).uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().regex(regexUrl).uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().regex(regexUrl).uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.celebrateMovieId = celebrate({
  params: Joi.object({
    _id: Joi.string().hex().length(24).required(),
  }).required(),
});
