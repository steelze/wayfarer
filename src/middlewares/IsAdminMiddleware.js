import errorHandler from '../util/ErrorHandler';

export default (req, res, next) => {
  const { is_admin } = req.body;
  return is_admin ? next() : next(errorHandler('Unauthorized. You are not authorized to perform this action', 403));
};
