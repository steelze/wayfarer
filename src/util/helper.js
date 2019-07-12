import QueryBuilder from '../db/QueryBuilder';

const busCapacity = (bus_id, next) => QueryBuilder.select('buses', { id: bus_id }).then(data => data.rows[0]).catch(/* istanbul ignore next */ error => next(error));

const isSeatAvailable = (trip, seat_number, next) => {
  const { id: trip_id } = trip;
  return QueryBuilder.select('bookings', { trip_id, seat_number }).then(data => !(data.rowCount)).catch(/* istanbul ignore next */ error => next(error));
};

const checkTripExist = (id, next) => QueryBuilder.select('trips', { id }).then((data) => {
  const trip = data.rows[0];
  return (trip) || false;
}).catch(/* istanbul ignore next */ error => next(error));

const findAvailableSeats = (trip_id, bus_id, next) => busCapacity(bus_id, next)
  .then(data => data.capacity)
  .then(capacity => QueryBuilder.raw('SELECT seat_number FROM bookings where trip_id = $1', [trip_id])
    .then((data) => {
      const seats = data.rows.map(seat => seat.seat_number);
      return { capacity, seats };
    }))
  .catch(/* istanbul ignore next */ error => next(error));

const isSpaceAvailable = (trip, next) => {
  const { id: trip_id, bus_id } = trip;
  return busCapacity(bus_id, next).then(data => data.capacity).then(capacity => QueryBuilder.raw('SELECT COUNT(id) FROM bookings WHERE trip_id = $1', [trip_id])
    .then((data) => {
      const count = parseInt(data.rows[0].count, 10);
      return !(count === capacity);
    }))
    .catch(/* istanbul ignore next */ error => next(error));
};

const generateSeatNumber = (trip, next) => {
  const { id: trip_id, bus_id } = trip;
  return findAvailableSeats(trip_id, bus_id, next)
    .then((data) => {
      const { seats, capacity } = data;
      const available_seats = [];
      /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
      for (let index = 1; index <= capacity; index++) {
        if (!seats.includes(index)) {
          available_seats.push(index);
        }
      }
      // https://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
      return available_seats[Math.floor(Math.random() * available_seats.length)];
    }).catch(/* istanbul ignore next */ error => next(error));
};

export {
  isSeatAvailable, checkTripExist, busCapacity, generateSeatNumber, isSpaceAvailable,
};
