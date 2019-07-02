import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import Config from '../config/index';


const { saltRounds, secret: SECRET_KEY } = Config;

/**
 * @class RegisterController
 * @description Handles actions related to user
 */

export default class RegisterController {
  static register(req, res, next) {
    const {
      first_name: firstName, last_name: lastName, email, password,
    } = req.body;
    bcrypt.hash(password, saltRounds).then((hashedPassword) => {
      const user = User.create({
        firstName, lastName, email, hashedPassword,
      });
      const { id, created_at: joined } = user;
      const token = jwt.sign({ id, email, joined }, SECRET_KEY, { expiresIn: '100hr' });
      return res.status(201).json({
        status: 'success',
        data: {
          token,
          user,
        },
      });
    }).catch(error => next(error));
  }
}
