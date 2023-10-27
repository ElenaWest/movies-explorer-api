const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const mongoose = require('mongoose');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  FILM_NOT_FOUND, FILM_FORBIDDEN_DELETE, FILM_DELETE, FILM_INVALID_DATA,
} = require('../utils/constants');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(HTTP_STATUS_CREATED).send(movie);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(FILM_NOT_FOUND);
      } else if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(FILM_FORBIDDEN_DELETE);
      } else {
        Movie.deleteOne(movie)
          .orFail()
          .then(() => {
            res.status(HTTP_STATUS_OK).send({ message: FILM_DELETE });
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.DocumentNotFoundError) {
              next(new NotFoundError(FILM_NOT_FOUND));
            } else {
              next(error);
            }
          });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError(FILM_INVALID_DATA));
      } else {
        next(error);
      }
    });
};
