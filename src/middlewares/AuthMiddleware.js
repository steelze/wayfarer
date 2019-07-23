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
  if (!token) return next(errorHandler('Unauthenticated. You have to signin to perform this action. ', 401));
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { id, is_admin } = decoded;
    req.body.user_id = id;
    req.body.is_admin = is_admin;
    return next();
  } catch (error) {
    const errorMessage = error.message;
    let message;

    /* istanbul ignore else */
    if (errorMessage.includes('invalid')) {
      message = 'Session is invalid. Signin again to continue';
    } else if (errorMessage.includes('expired')) {
      message = 'Session has expired. Signin again to continue';
    } else if (errorMessage.includes('malformed')) {
      message = 'Session is invalid. Signin again to continue';
    } else {
      message = errorMessage;
    }
    return next(errorHandler(message, 401));
  }
}
