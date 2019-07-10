import QueryBuilder from '../db/QueryBuilder';
import ErrorHandler from '../util/ErrorHandler';

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
      const query = await QueryBuilder.select('trips', { id });
      const trip = query.rows[0];
      if (!trip) return next(ErrorHandler.error('Trip not found', 404));
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
}
