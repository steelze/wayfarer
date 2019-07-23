import { checkSchema } from 'express-validator';

export default checkSchema({
  email: {
    in: ['body'],
    exists: {
      errorMessage: 'Email is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Email cannot be empty',
      negated: true,
    },
    isEmail: {
      errorMessage: 'Enter a valid email address',
    },
  },
  password: {
    in: ['body'],
    trim: true,
    exists: {
      errorMessage: 'Password is required',
    },
    isEmpty: {
      errorMessage: 'Password cannot be empty',
      negated: true,
    },
    isLength: {
      errorMessage: 'Password should be at least 6 chars long',
      options: { min: 6 },
    },
  },
});
