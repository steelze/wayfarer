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

QueryBuilder.schema('trips').create({
  id: 'SERIAL PRIMARY KEY',
  bus_id: 'INT NOT NULL',
  origin: 'VARCHAR(100) NOT NULL',
  destination: 'VARCHAR(100) UNIQUE NOT NULL',
  trip_date: 'DATE NOT NULL',
  fare: 'FLOAT NOT NULL',
  status: 'BOOLEAN DEFAULT TRUE',
});

QueryBuilder.schema('bookings').create({
  id: 'SERIAL PRIMARY KEY',
  user_id: 'INT NOT NULL',
  trip_id: 'INT NOT NULL',
  seat_number: 'INT NOT NULL',
});

QueryBuilder.schema('buses').create({
  id: 'SERIAL PRIMARY KEY',
  number_plate: 'VARCHAR(100) NOT NULL',
  manufacturer: 'VARCHAR(100) NOT NULL',
  model: 'VARCHAR(100) NOT NULL',
  year: 'VARCHAR(100) NOT NULL',
  capacity: 'INT NOT NULL',
});
