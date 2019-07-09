import { checkSchema } from 'express-validator';

export default checkSchema({
  seat_number: {
    in: ['body'],
    exists: {
      errorMessage: 'Seat Number is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Seat Number cannot be empty',
      negated: true,
    },
    isInt: true,
    toInt: true,
  },
  trip_id: {
    in: ['body'],
    isInt: true,
    exists: {
      errorMessage: 'Trip ID is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Trip ID cannot be empty',
      negated: true,
    },
    toInt: true,
  },
});
