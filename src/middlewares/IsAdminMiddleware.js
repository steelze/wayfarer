import errorHandler from '../util/ErrorHandler';

export default (req, res, next) => {
  const { is_admin } = req.body;
  return is_admin ? next() : next(errorHandler('Unauthorized', 403));
};
