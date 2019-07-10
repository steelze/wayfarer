import QueryBuilder from '../db/QueryBuilder';
import ErrorHandler from '../util/ErrorHandler';

/**
 * @class TripController
 * @description Handles actions relating to bookings
 */

export default class BookingController {
  static async view(req, res, next) {
    try {
      const { user_id } = req.body;
      const query = await QueryBuilder.select('users', { id: user_id, is_admin: true });
      const user = query.rows[0];
      const data = (user) ? await QueryBuilder.raw(`SELECT bookings.id AS booking_id, trip_id, user_id, seat_number, trips.bus_id, trips.trip_date, users.first_name, users.last_name, users.email FROM bookings INNER JOIN trips on bookings.trip_id = trips.id 
      LEFT JOIN users on bookings.user_id = users.id`) : await QueryBuilder.raw('SELECT bookings.id AS booking_id, trip_id, user_id, seat_number, trips.bus_id, trips.trip_date, users.first_name, users.last_name, users.email FROM bookings INNER JOIN trips on bookings.trip_id = trips.id LEFT JOIN users on bookings.user_id = users.id  WHERE bookings.user_id = $1 ', [user_id]);
      const bookings = data.rows;
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
      seat_number, trip_id, user_id,
    } = req.body;
    try {
      const trip = await BookingController.checkTripExist(trip_id, next);
      if (!trip) return next(ErrorHandler.error('Trip not found', 404));
      const { bus_id } = trip;
      const query = await QueryBuilder.select('buses', { id: bus_id });
      const bus = query.rows[0];
      const { capacity } = bus;
      if (seat_number > capacity) return next(ErrorHandler.error(`Exceeded maximum seat number of bus. Max(${capacity})`, 422));
      const isSeatAvailable = await BookingController.isSeatAvailable(trip_id, seat_number, next);
      if (!isSeatAvailable) return next(ErrorHandler.error('Seat not available', 422));
      const data = await QueryBuilder.insert('bookings', {
        user_id, trip_id, seat_number,
      });
      const booking = Object.assign({}, trip, data.rows[0]);
      return res.status(201).json({
        status: 'success',
        data: {
          booking,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async delete(req, res, next) {
    const { user_id } = req.body;
    const { id } = req.params;
    try {
      const query = await QueryBuilder.select('bookings', { id, user_id });
      const booking = query.rows[0];
      if (!booking) return next(ErrorHandler.error('Booking not found', 404));
      await QueryBuilder.delete('bookings', { id, user_id });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Booking deleted successfully',
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async checkTripExist(id, next) {
    try {
      const data = await QueryBuilder.select('trips', { id });
      const trip = data.rows[0];
      return (trip) || false;
    } catch (error) {
      return next(error);
    }
  }

  static async isSeatAvailable(trip_id, seat_number, next) {
    try {
      const data = await QueryBuilder.select('bookings', { trip_id, seat_number });
      return !(data.rowCount);
    } catch (error) {
      return next(error);
    }
  }
}
