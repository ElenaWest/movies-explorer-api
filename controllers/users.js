const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SECRET_KEY, NODE_ENV } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const { USER_CONFLICT_EMAIL, USER_NOT_FOUND } = require('../utils/constants');

module.exports.addUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(HTTP_STATUS_CREATED).send({
        name: user.name, _id: user._id, email: user.email,
      }))
      .catch((error) => {
        if (error.code === 11000) {
          next(new ConflictError(USER_CONFLICT_EMAIL));
        } else if (error instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(error.message));
        } else {
          next(error);
        }
      }));
      console.log(error)
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : 'hello', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.editUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.status(HTTP_STATUS_OK).send(user))
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictError(USER_CONFLICT_EMAIL));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(error.message));
      } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(USER_NOT_FOUND));
      } else {
        next(error);
      }
    });
    console.log(error)
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => res.status(HTTP_STATUS_OK).send(users))
    .catch(next);
};
