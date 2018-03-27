import { users } from '../dummydatabase/dummydatabase';
import models from '../../models/';

const { user } = models;
/**
  * @class UserController
  * @description CRUD operations on Users
  */
class UserController {
/**
  * @description -This method logins users into WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and logins user into WEConnect
  * @memberOf UserController
  * @static
  */
  static loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const userlogin = users.find(userItem => userItem.email === email);
        if (userlogin) {
          if ((userlogin.password === password) && (userlogin.email === email)) {
            res.status(200).json({ message: 'you successfully logged in' });
          } else {
            res.status(401).json({ message: 'login failed! Incorrect password' });
          }
        } else {
          res.status(404).json({ message: 'your email was not found, sign up!' });
        }
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  /**
  * @description -This method signs up users into WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and signs up user into WEConnect
  * @memberOf UserController
  * @static
  */
  static signupUser(req, res) {
    user.create(req.body)
      .then(userItem => res.status(201).send(userItem))
      .catch(err => res.status(500).send(err));
  }
}
export default UserController;
