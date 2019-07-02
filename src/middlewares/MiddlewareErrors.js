import { validationResult } from 'express-validator';
import ErrorHandler from '../util/ErrorHandler';

export default function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorBag = errors.array().map(error => ({ field: error.param, msg: error.msg }));
    return next(ErrorHandler.error(JSON.stringify(errorBag), 422));
  }
  return next();
}