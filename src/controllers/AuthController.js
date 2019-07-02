import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import Config from '../config/index';
import ErrorHandler from '../util/ErrorHandler';


const { saltRounds, secret: SECRET_KEY } = Config;

/**
 * @class AuthController
 * @description Handles actions relating to authenticating user
 */

export default class AuthController {
  static register(req, res, next) {
    const {
      first_name: firstName, last_name: lastName, email, password,
    } = req.body;
    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
      const user = User.create({
        firstName, lastName, email, hashedPassword,
      });
      const { id, created_at: joined } = user;
      const token = AuthController.getToken({ id, email, joined });
      return res.status(201).json({
        status: 'success',
        data: {
          token,
          user,
        },
      });
    }).catch(error => next(error));
  }

  static login(req, res, next) {
    const {
      email, password,
    } = req.body;
    const user = User.exists({ email });
    if (!user) return next(ErrorHandler.error('Invalid credentials', 422));
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) return next(ErrorHandler.error('Invalid credentials', 422));
      const { id, created_at: joined } = user;
      const token = AuthController.getToken({ id, email, joined });
      return res.status(201).json({
        status: 'success',
        data: {
          token,
          user,
        },
      });
    }).catch(error => next(error));
  }

  static getToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '100hr' });
  }
}
