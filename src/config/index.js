import dotenv from 'dotenv';

dotenv.config();

export default {
  saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  secret: process.env.JWT_SECRET,
  dbuser: process.env.DB_USER,
  dbpass: process.env.DB_PASS,
  dbhost: process.env.DB_HOST,
  dbname: process.env.DB_NAME,
  dbport: parseInt(process.env.DB_PORT, 10),
};
