import bcrypt from 'bcrypt';
import User from '../model/User';
import Config from '../config/index';


const { saltRounds } = Config;

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
      return res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    }).catch(error => next(error));
  }
}
