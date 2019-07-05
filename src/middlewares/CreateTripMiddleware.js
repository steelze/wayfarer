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
      errorMessage: 'Trip Date is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Trip Date cannot be empty',
      negated: true,
    },
    // https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
    custom: {
      errorMessage: 'Fare is invalid',
      options: (value) => {
        if (!value.trim()) return false;
        const regex = /^\d{4}-\d{1,2}-\d{1,2}$/;
        return (regex.test(value));
      },
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
