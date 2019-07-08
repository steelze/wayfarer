import QueryBuilder from './QueryBuilder';

QueryBuilder.schema('users').create({
  id: 'SERIAL PRIMARY KEY',
  first_name: 'VARCHAR(20) NOT NULL',
  last_name: 'VARCHAR(20) NOT NULL',
  email: 'VARCHAR(100) UNIQUE NOT NULL',
  password: 'VARCHAR(100) NOT NULL',
  is_admin: 'BOOLEAN DEFAULT FALSE NOT NULL',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
});
