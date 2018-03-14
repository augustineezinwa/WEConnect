import { users } from '../dummydb/db';

/**
 * @class UserController
 *
 * @description CRUD operations on Users
 *
 */
class UserController {

  /**
     * @static
     *
     *
     * @param {object} req - The request payload sent to the router
     * @param {object} res - The response payload sent back from the controller
     *
     * @returns {object} - status Message and logins user into WEConnect
     *
     * @memberOf UserController
     *
     */
  static loginUser(req, res) {

    const { email, password } = req.body;

    if (email && password) {

      const user = users.find(userItem => userItem.email === email);

      if (user) {

        if ((user.password === password) && (user.email === email)) {

          res.json({ message: 'you successfully logged in' });

        } else {

          res.status(400).json({ message: 'login failed! Incorrect password' });

        }

      } else {

        res.status(401).json({ message: 'your email was not found, sign up!' });

      }

    }

  }


}

export default UserController;
