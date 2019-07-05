import jwt from 'jsonwebtoken';
import Config from '../config/index';
import ErrorHandler from '../util/ErrorHandler';
import User from '../model/User';


const { secret: SECRET_KEY } = Config;

export default function (req, res, next) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, SECRET_KEY);
  const { id } = decoded;
  const isAdmin = User.isAdmin(id);
  return isAdmin ? next() : next(ErrorHandler.error('Unauthorized', 403));
}
