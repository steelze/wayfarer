import QueryBuilder from '../db/QueryBuilder';

/**
 * @class BusController
 * @description Handles actions relating to buses
 */

export default class BusController {
  static async view(req, res, next) {
    try {
      const data = await QueryBuilder.select('buses');
      const buses = data.rows;
      return res.status(200).json({
        status: 'success',
        data: buses,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async create(req, res, next) {
    const {
      number_plate, manufacturer, model, year, capacity,
    } = req.body;
    try {
      const data = await QueryBuilder.insert('buses', {
        number_plate, manufacturer, model, year, capacity,
      });
      const bus = data.rows[0];
      return res.status(201).json({
        status: 'success',
        data: bus,
      });
    } catch (error) {
      return next(error);
    }
  }
}
