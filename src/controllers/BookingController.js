import QueryBuilder from '../db/QueryBuilder';

/**
 * @class TripController
 * @description Handles actions relating to bookings
 */

export default class BookingController {
  static async view(req, res, next) {
    try {
      const { user_id } = req.body;
      const query = await QueryBuilder.select('users', { id: user_id, is_admin: true });
      const user = await query.rows[0];
      const data = (user) ? await QueryBuilder.select('bookings', { user_id, is_admin: true }) : await QueryBuilder.select('bookings');
      const bookings = await data.rows;
      return res.status(200).json({
        status: 'success',
        data: {
          bookings,
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
