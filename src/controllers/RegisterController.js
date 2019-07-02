import User from '../model/User';

/**
 * @class RegisterController
 * @description Handles actions related to user
 */

export default class RegisterController {
  static register(req, res) {
    const {
      first_name: firstName, last_name: lastName, email, password,
    } = req.body;
    const user = User.create({
      firstName, lastName, email, password,
    });
    return res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  }

  
}