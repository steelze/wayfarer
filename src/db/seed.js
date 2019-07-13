import QueryBuilder from './QueryBuilder';

QueryBuilder.insert('buses', {
  number_plate: 'YAN454YR',
  manufacturer: 'Toyota',
  model: 'Camry',
  year: '2017',
  capacity: 15,
});

QueryBuilder.update('users', {
  is_admin: true,
 }, {
  email: 'admin@wayfarer.com',
});
