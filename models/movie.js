const mongoose = require('mongoose');
const httpRegex = require('../utils/constants');
const { REQUIRED_MESSAGE, VALIDATE_MESSAGE } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
  },
  director: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
  },
  duration: {
    type: Number,
    required: [true, REQUIRED_MESSAGE],
  },
  year: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
  },
  description: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
  },
  image: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
    validate: {
      validator(url) {
        return httpRegex.test(url);
      },
      message: VALIDATE_MESSAGE,
    },
  },
  trailerLink: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
    validate: {
      validator(url) {
        return httpRegex.test(url);
      },
      message: VALIDATE_MESSAGE,
    },
  },
  thumbnail: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
    validate: {
      validator(url) {
        return httpRegex.test(url);
      },
      message: VALIDATE_MESSAGE,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
  },
  nameEN: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
