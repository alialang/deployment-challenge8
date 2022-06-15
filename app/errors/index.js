const CarAlreadyRentedError = require('./CarAlreadyRentedError');
const EmailNotRegisteredError = require('./EmailNotRegisteredError');
const InsufficientAccessError = require('./InsufficientAccessError');
const EmailAlreadyTakenError = require('./EmailAlreadyTakenError');
const NotFoundError = require('./NotFoundError');
const RecordNotFoundError = require('./RecordNotFoundError');
const WrongPasswordError = require('./WrongPasswordError');

module.exports = {
  CarAlreadyRentedError,
  EmailNotRegisteredError,
  EmailAlreadyTakenError,
  InsufficientAccessError,
  NotFoundError,
  RecordNotFoundError,
  WrongPasswordError,
};
