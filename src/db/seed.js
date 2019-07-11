import QueryBuilder from './QueryBuilder';

QueryBuilder.insert('buses', {
  number_plate: 'XAS454YR',
  manufacturer: 'Toyota',
  model: 'Camry',
  year: '2015',
  capacity: 3,
});

QueryBuilder.insert('buses', {
  number_plate: 'YAN454YR',
  manufacturer: 'Toyota',
  model: 'Camry',
  year: '2017',
  capacity: 5,
});
