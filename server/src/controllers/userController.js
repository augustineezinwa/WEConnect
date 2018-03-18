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
     *@description -This method logins users into WEConnect
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

  /**
     * @static
     *
     *@description -This method signs up users into WEConnect
     *
     * @param {object} req - The request payload sent to the router
     * @param {object} res - The response payload sent back from the controller
     *
     * @returns {object} - status Message and signs up user into WEConnect
     *
     * @memberOf UserController
     *
     */
  static signupUser(req, res) {

    const user = req.body;

    const emailUser = users.find(userItem => userItem.email === user.email);

    if (!emailUser) {

      const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1;

      user.userId = userId;

      user.businesses = [];

      users.push(user);

      res.status(201).json({ message: 'You successfully signed up', user });

    } else {

      res.status(400).json({ message: 'email has been used' });

    }

  }

}

export default UserController;
