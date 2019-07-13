import QueryBuilder from '../db/QueryBuilder';
import errorHandler from '../util/ErrorHandler';
import {
  checkTripExist, isSeatAvailable, busCapacity, generateSeatNumber, isSpaceAvailable,
} from '../util/helper';

/**
 * @class TripController
 * @description Handles actions relating to bookings
 */

export default class BookingController {
  static async view(req, res, next) {
    try {
      const { user_id, is_admin } = req.body;
      const data = (is_admin) ? await QueryBuilder.raw(`SELECT bookings.id AS booking_id, trip_id, user_id, seat_number, trips.bus_id, trips.trip_date, users.first_name, users.last_name, users.email FROM bookings INNER JOIN trips on bookings.trip_id = trips.id 
      LEFT JOIN users on bookings.user_id = users.id`) : await QueryBuilder.raw('SELECT bookings.id AS booking_id, trip_id, user_id, seat_number, trips.bus_id, trips.trip_date, users.first_name, users.last_name, users.email FROM bookings INNER JOIN trips on bookings.trip_id = trips.id LEFT JOIN users on bookings.user_id = users.id  WHERE bookings.user_id = $1 ', [user_id]);
      const bookings = data.rows;
      return res.status(200).json({
        status: 'success',
        data: bookings,
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
      const trip = await checkTripExist(trip_id, next);
      if (!trip) return next(errorHandler('Trip not found', 404));
      if (!(await isSpaceAvailable(trip, next))) return next(errorHandler('No more space available for this trip', 422));
      if (!seat_number) {
        const seat = await generateSeatNumber(trip, next);
        return BookingController.bookTrip(trip, seat, user_id, res, next);
      }
      const { capacity } = await busCapacity(trip.bus_id, next);
      if (seat_number > capacity) return next(errorHandler(`Exceeded maximum seat number of bus. Max(${capacity})`, 422));
      const checkSeat = await isSeatAvailable(trip, seat_number, next);
      if (!checkSeat) return next(errorHandler('Seat not available', 422));
      return BookingController.bookTrip(trip, seat_number, user_id, res, next);
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
      if (!booking) return next(errorHandler('Booking not found', 404));
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

  static async bookTrip(trip, seat_number, user_id, res, next) {
    try {
      const { id: trip_id } = trip;
      const data = await QueryBuilder.insert('bookings', {
        user_id, trip_id, seat_number,
      });
      const booking = Object.assign({}, trip, data.rows[0]);
      return res.status(201).json({
        status: 'success',
        data: booking,
      });
    } catch (error) {
      return next(error);
    }
  }
}
