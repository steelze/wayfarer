import jwt from 'jsonwebtoken';
import Config from '../config/index';
import ErrorHandler from '../util/ErrorHandler';


const { secret: SECRET_KEY } = Config;

export default function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return next(ErrorHandler.error('Unauthenticated user', 401));
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id, is_admin } = decoded;
    req.body.user_id = id;
    req.body.is_admin = is_admin;
    return next();
  } catch (error) {
    return next(ErrorHandler.error(error.message, 401));
  }
}
