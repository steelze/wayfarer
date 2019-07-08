import { Pool } from 'pg';
import Config from '../config/index';

const {
  dbuser, dbpass, dbhost, dbname, dbport,
} = Config;

let ssl = false;
let connectionString;

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  connectionString = `postgresql://${dbuser}:${dbpass}@${dbhost}:${dbport}/${dbname}`;
} else {
  connectionString = process.env.DATABASE_URL;
  ssl = true;
}

export default new Pool({
  connectionString,
  ssl,
});
