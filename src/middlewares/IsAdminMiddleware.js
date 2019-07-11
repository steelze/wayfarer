import ErrorHandler from '../util/ErrorHandler';

export default (req, res, next) => {
  const { is_admin } = req.body;
  return is_admin ? next() : next(ErrorHandler.error('Unauthorized', 403));
};
