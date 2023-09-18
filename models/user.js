const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnautorizedError = require('../errors/UnauthorizedError');
const {
  REQUIRED_MESSAGE,
  VALIDATE_MESSAGE_EMAIL,
  UNAUTHORIZED_ERROR_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
    unique: true,
    validate: {
      validator(email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: VALIDATE_MESSAGE_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
    select: false,
    minlength: 3,
  },
  name: {
    type: String,
    required: [true, REQUIRED_MESSAGE],
    minlength: [2, MIN_LENGTH_MESSAGE],
    maxlength: [30, MAX_LENGTH_MESSAGE],
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnautorizedError(UNAUTHORIZED_ERROR_MESSAGE);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnautorizedError(UNAUTHORIZED_ERROR_MESSAGE);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
