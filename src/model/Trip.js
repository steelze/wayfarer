import TripSeed from '../db/seeds/trips';
import QueryBuilder from '../db/QueryBuilder';

export default class Trip extends QueryBuilder {
  static create(data) {
    const trips = {
      id: (TripSeed.length + 1),
      bus_id: data.bus_id,
      origin: data.origin,
      destination: data.destination,
      trip_date: data.trip_date,
      fare: data.fare,
      status: 1,
    };
    TripSeed.push(trips);
    return trips;
  }

  static getAll() {
    return TripSeed;
  }
}
