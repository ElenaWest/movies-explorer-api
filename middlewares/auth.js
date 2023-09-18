const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NEED_AUTHORIZE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(NEED_AUTHORIZE));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'hello');
  } catch (error) {
    next(new UnauthorizedError(NEED_AUTHORIZE));
    return;
  }
  req.user = payload;
  next();
};
