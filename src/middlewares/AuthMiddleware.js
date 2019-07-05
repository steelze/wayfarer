import jwt from 'jsonwebtoken';
import Config from '../config/index';
import ErrorHandler from '../util/ErrorHandler';


const { secret: SECRET_KEY } = Config;

async function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

export default function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) return next(ErrorHandler.error('Unauthenticated user', 401));
  return verifyToken(token)
    .then(() => next())
    .catch(error => next(ErrorHandler.error(error.message, 401)));
}
