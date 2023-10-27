const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { SERVER_ERROR_MESSAGE } = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = error;
  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
      ? SERVER_ERROR_MESSAGE
      : message,
  });
  next();
};

module.exports = errorHandler;
