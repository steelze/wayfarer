import jwt from 'jsonwebtoken';
import Config from '../config/index';
import ErrorHandler from '../util/ErrorHandler';
import QueryBuilder from '../db/QueryBuilder';


const { secret: SECRET_KEY } = Config;

export default async function (req, res, next) {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, SECRET_KEY);
  const { id } = decoded;
  try {
    const data = await QueryBuilder.select('users', { id, is_admin: true });
    const user = await data.rows[0];
    return user ? next() : next(ErrorHandler.error('Unauthorized', 403));
  } catch (error) {
    return next(error);
  }
}
