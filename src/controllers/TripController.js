import Trip from '../model/Trip';

/**
 * @class TripController
 * @description Handles actions relating to trips
 */

export default class TripController {
  static view(req, res, next) {
    const trips = Trip.getAll();
    return res.status(200).json({
      status: 'success',
      data: {
        trips,
      },
    });
  }

  static create(req, res, next) {
    const trip = Trip.create(req.body);
    return res.status(201).json({
      status: 'success',
      data: {
        trip,
      },
    });
  }
}
