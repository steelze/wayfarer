import { checkSchema } from 'express-validator';

export default checkSchema({
  id: {
    in: ['params'],
    exists: {
      errorMessage: 'Booking ID is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Booking ID cannot be empty',
      negated: true,
    },
    isInt: true,
    toInt: true,
  },
});
