import QueryBuilder from '../db/QueryBuilder';
import errorHandler from '../util/ErrorHandler';
import { checkTripExist } from '../util/helper';

/**
 * @class TripController
 * @description Handles actions relating to trips
 */

export default class TripController {
  static async view(req, res, next) {
    try {
      const data = await QueryBuilder.select('trips');
      const trips = data.rows;
      return res.status(200).json({
        status: 'success',
        data: {
          trips,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    const {
      bus_id, origin, destination, trip_date, fare,
    } = req.body;
    try {
      const data = await QueryBuilder.insert('trips', {
        bus_id, origin, destination, trip_date, fare,
      });
      const trip = data.rows[0];
      return res.status(201).json({
        status: 'success',
        data: {
          trip,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async cancel(req, res, next) {
    const { id } = req.params;
    try {
      const trip = await checkTripExist(id, next);
      if (!trip) return next(errorHandler('Trip not found', 404));
      await QueryBuilder.update('trips', { status: 0 }, { id });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Trip cancelled successfully',
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async search(req, res, next) {
    const { origin, destination } = req.query;
    try {
      let query;
      if (origin && destination) {
        query = await QueryBuilder.raw('SELECT * from trips WHERE origin ILIKE $1 AND destination ILIKE $2', [origin, destination]);
      } else if (origin) {
        query = await QueryBuilder.raw('SELECT * from trips WHERE origin ILIKE $1', [origin]);
      } else if (destination) {
        query = await QueryBuilder.raw('SELECT * from trips WHERE destination ILIKE $1', [destination]);
      } else {
        return next(errorHandler('Origin or destination required', 422));
      }
      const trips = query.rows;
      return res.status(200).json({
        status: 'success',
        data: {
          trips,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
