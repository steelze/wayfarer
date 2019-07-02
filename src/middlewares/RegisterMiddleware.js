import { checkSchema } from 'express-validator';
import User from '../model/User';

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
      options: (value) => {
        if (!value.trim()) return false;
        const isExist = User.exists({ email: value });   
        return !isExist;
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
