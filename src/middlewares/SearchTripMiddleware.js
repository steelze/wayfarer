import { checkSchema } from 'express-validator';

export default checkSchema({
  origin: {
    in: ['query'],
    trim: true,
    customSanitizer: {
      // https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
      options: value => value.replace(/\s\s+/g, ' '),
    },
  },
  destination: {
    in: ['query'],
    trim: true,
    customSanitizer: {
      // https://stackoverflow.com/questions/1981349/regex-to-replace-multiple-spaces-with-a-single-space
      options: value => value.replace(/\s\s+/g, ' '),
    },
  },
});
