const httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const FILM_NOT_FOUND = 'Запрашиваемый фильм не найден';
const FILM_FORBIDDEN_DELETE = 'Невозможно удалить фильм другого пользователя';
const FILM_DELETE = 'Фильм удален';
const FILM_INVALID_DATA = 'Некорректные данные фильма';

const USER_CONFLICT_EMAIL = 'Пользователь с таким email уже зарегистрирован';
const USER_NOT_FOUND = 'Запрашиваемый пользователь не найден';

const NEED_AUTHORIZE = 'Необходима авторизация';

const LIMITER_MESSAGE = 'You have exceeded the 100 requests in 24 hrs limit!';

const PAGE_NOT_FOUND = 'Страница не найдена';

const REQUIRED_MESSAGE = 'Поле должно быть заполнено';
const VALIDATE_MESSAGE = 'Неправильно указан URL';
const VALIDATE_MESSAGE_EMAIL = 'Неправильно указан email';
const UNAUTHORIZED_ERROR_MESSAGE = 'Неправильные почта или пароль';
const MIN_LENGTH_MESSAGE = 'Минимальная длина поля — 2 символа';
const MAX_LENGTH_MESSAGE = 'Максимальная длина поля — 30 символов';
const SERVER_ERROR_MESSAGE = 'Произошла ошибка на сервере';

module.exports = {
  httpRegex,
  FILM_NOT_FOUND,
  FILM_FORBIDDEN_DELETE,
  FILM_DELETE,
  FILM_INVALID_DATA,
  USER_CONFLICT_EMAIL,
  USER_NOT_FOUND,
  NEED_AUTHORIZE,
  LIMITER_MESSAGE,
  PAGE_NOT_FOUND,
  REQUIRED_MESSAGE,
  VALIDATE_MESSAGE,
  VALIDATE_MESSAGE_EMAIL,
  UNAUTHORIZED_ERROR_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
