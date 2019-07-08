import { Pool } from 'pg';
import Config from '../config/index';

const { 
  dbuser, dbpass, dbhost, dbname, dbport,
} = Config;

const connectionString = `postgresql://${dbuser}:${dbpass}@${dbhost}:${dbport}/${dbname}`;
export default new Pool({
  connectionString,
});

// const connectionString = 'postgresql://edu1:admin@123@localhost:5432/stackoverflow';
