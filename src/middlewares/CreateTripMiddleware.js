import { checkSchema } from 'express-validator';

export default checkSchema({
  bus_id: {
    in: ['body'],
    exists: {
      errorMessage: 'Bus ID is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Bus ID cannot be empty',
      negated: true,
    },
    toInt: true,
  },
  origin: {
    in: ['body'],
    exists: {
      errorMessage: 'Origin is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Origin cannot be empty',
      negated: true,
    },
  },
  destination: {
    in: ['body'],
    exists: {
      errorMessage: 'Destination is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Destination cannot be empty',
      negated: true,
    },
  },
  trip_date: {
    in: ['body'],
    exists: {
      errorMessage: 'Trip date is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Trip date cannot be empty',
      negated: true,
    },
  },
  fare: {
    in: ['body'],
    exists: {
      errorMessage: 'Fare is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Fare cannot be empty',
      negated: true,
    },
    // https://www.codeproject.com/Questions/475669/Onlyplusoneplusdecimalpluspointplusinplustextplusb
    custom: {
      errorMessage: 'Fare is invalid',
      options: (value) => {
        if (!value.trim()) return false;
        const regex = /^[0-9]+\.?[0-9]*$/;
        return (regex.test(value));
      },
    },
    toFloat: true,
  },
});
