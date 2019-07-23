import { validationResult } from 'express-validator';
import errorHandler from '../util/ErrorHandler';

export default function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorBag = errors.array().map(error => (error.msg));
    const errorMsg = errorBag.join(', ');
    return next(errorHandler(errorMsg, 422));
  }
  return next();
}
