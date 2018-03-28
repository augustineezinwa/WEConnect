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
