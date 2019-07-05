import TripSeed from '../db/seeds/trips';
import QueryBuilder from '../db/QueryBuilder';

export default class Trip extends QueryBuilder {
  static getAll() {
    return TripSeed;
  }
}
