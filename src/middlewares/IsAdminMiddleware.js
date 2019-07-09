import ErrorHandler from '../util/ErrorHandler';
import QueryBuilder from '../db/QueryBuilder';

export default async function (req, res, next) {
  const { user_id: id } = req.body;
  try {
    const data = await QueryBuilder.select('users', { id, is_admin: true });
    const user = await data.rows[0];
    return user ? next() : next(ErrorHandler.error('Unauthorized', 403));
  } catch (error) {
    return next(error);
  }
}
