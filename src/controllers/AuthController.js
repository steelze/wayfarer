import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../config/index';
import errorHandler from '../util/ErrorHandler';
import QueryBuilder from '../db/QueryBuilder';

const { saltRounds, secret: SECRET_KEY } = Config;

/**
 * @class AuthController
 * @description Handles actions relating to authenticating user
 */

export default class AuthController {
  static async register(req, res, next) {
    const {
      first_name, last_name, email, password,
    } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = await QueryBuilder.insert('users', {
        first_name, last_name, email, password: hashedPassword,
      });
      const user = data.rows[0];
      const { id, created_at: joined, is_admin } = user;
      const token = AuthController.getToken({
        id, email, joined, is_admin,
      });
      return res.status(201).json({
        status: 'success',
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static async login(req, res, next) {
    const {
      email, password,
    } = req.body;
    try {
      const data = await QueryBuilder.select('users', { email });
      const user = data.rows[0];
      if (!user) return next(errorHandler('Invalid credentials', 422));
      const match = await bcrypt.compare(password, user.password);
      if (!match) return next(errorHandler('Invalid credentials', 422));
      const { id, created_at: joined, is_admin } = user;
      const token = AuthController.getToken({ id, email, joined, is_admin });
      return res.status(200).json({
        status: 'success',
        data: {
          token,
          user,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  static getToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1hr' });
  }
}
