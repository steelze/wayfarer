import { checkSchema } from 'express-validator';

export default checkSchema({
  id: {
    in: ['params'],
    exists: {
      errorMessage: 'Trip ID is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Trip ID cannot be empty',
      negated: true,
    },
    isInt: true,
    toInt: true,
  },
});
