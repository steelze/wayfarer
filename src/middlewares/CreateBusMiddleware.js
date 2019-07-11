import { checkSchema } from 'express-validator';

export default checkSchema({
  number_plate: {
    in: ['body'],
    exists: {
      errorMessage: 'Plate number is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Plate number cannot be empty',
      negated: true,
    },
  },
  model: {
    in: ['body'],
    exists: {
      errorMessage: 'Model is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Model cannot be empty',
      negated: true,
    },
  },
  manufacturer: {
    in: ['body'],
    exists: {
      errorMessage: 'Manufacturer is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Manufacturer cannot be empty',
      negated: true,
    },
  },
  year: {
    in: ['body'],
    exists: {
      errorMessage: 'Year is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Year cannot be empty',
      negated: true,
    },
    isInt: true,
  },
  capacity: {
    in: ['body'],
    exists: {
      errorMessage: 'Capacity is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Capacity cannot be empty',
      negated: true,
    },
    isInt: true,
  },
});
