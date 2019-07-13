import jwt from 'jsonwebtoken';
import Config from '../config/index';
import errorHandler from '../util/ErrorHandler';


const { secret: SECRET_KEY } = Config;

const getToken = (bearer) => {
  if (!bearer) return false;
  return bearer.split(' ')[1];
};

export default function (req, res, next) {
  const token = getToken(req.headers.authorization);
  if (!token) return next(errorHandler('Unauthenticated user', 401));
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id, is_admin } = decoded;
    req.body.user_id = id;
    req.body.is_admin = is_admin;
    return next();
  } catch (error) {
    return next(errorHandler(error.message, 401));
  }
}
