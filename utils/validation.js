const { celebrate, Joi } = require('celebrate');
const { URL_REGEX, EMAIL_REGEX } = require('./constants');


const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEX),
    trailerLink: Joi.string().required().pattern(URL_REGEX),
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
    params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(EMAIL_REGEX),
    password: Joi.string().required().min(4),
  }),
});

const addUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40).required(),
    email: Joi.string().required().pattern(EMAIL_REGEX),
    password: Joi.string().required().min(4),
  }),
});

const editUserDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40),
    email: Joi.string().required().pattern(EMAIL_REGEX),
  }),
});

module.exports = {
  addMovieValidation,
  deleteMovieValidation,
  loginValidation,
  addUserValidation,
  editUserDataValidation,
};
