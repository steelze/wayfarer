import QueryBuilder from '../db/QueryBuilder';

/**
 * @class TripController
 * @description Handles actions relating to trips
 */

export default class TripController {
  static async view(req, res, next) {
    try {
      const data = await QueryBuilder.select('trips');
      const trips = await data.rows;
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
      const trip = await data.rows[0];
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
}
