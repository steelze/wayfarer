import { checkSchema } from 'express-validator';
import QueryBuilder from '../db/QueryBuilder';

export default checkSchema({
  first_name: {
    in: ['body'],
    exists: {
      errorMessage: 'First name is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'First name cannot be empty',
      negated: true,
    },
    isLength: {
      errorMessage: 'First name should be at least 3 chars long',
      options: { min: 3 },
    },
  },
  last_name: {
    in: ['body'],
    exists: {
      errorMessage: 'Last name is required',
    },
    trim: true,
    isEmpty: {
      errorMessage: 'Last name cannot be empty',
      negated: true,
    },
    isLength: {
      errorMessage: 'Last Name should be at least 3 chars long',
      options: { min: 3 },
    },
  },
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
    custom: {
      errorMessage: 'Email already exists',
      options: async (value) => {
        if (!value.trim()) return false;
        const data = await QueryBuilder.exists('users', { email: value });
        const isExist = await data.rowCount;
        if (isExist) {
          return Promise.reject();
        }
        return false;
      },
    },
    isEmail: {
      errorMessage: 'Enter a valid email address',
    },
  },
  password: {
    in: ['body'],
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
