import dotenv from 'dotenv';

dotenv.config();

export default {
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  secret: process.env.JWT_SECRET,
};
