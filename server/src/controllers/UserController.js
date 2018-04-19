import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import models from '../../models/';

dotenv.config();

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
  * @description This controller signs a user after authentication using jwt and returns token.
  * @memberOf UserController
  * @static
  */
  static loginUser(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(406).json({
        message: 'email is missing!'
      });
    }
    if (!password) {
      return res.status(406).json({
        message: 'password is missing!'
      });
    }
    user.find({
      where: {
        email
      }
    }).then((userObject) => {
      if (userObject) {
        if (bcrypt.compareSync(password, userObject.password)) {
          const payload = {
            id: userObject.id,
            email,
          };
          const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, {
            expiresIn: 334 * 60
          });
          return res.status(200).json({
            message: 'you successfully logged in', token
          });
        }
        return res.status(401).json({
          message: 'password is incorrect'
        });
      }
      return res.status(404).json({
        message: 'your email does not exist, please sign up!'
      });
    }).catch(err => res.status(500).json({
      message: 'Internal server error', err
    }));
  }
  /**
  * @description -This method signs up users into WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and signs up user into WEConnect
  * @description This controller authenticates a user during signup using jwt token.
  * @memberOf UserController
  * @static
  */
  static signupUser(req, res) {
    user.create(req.body)
      .then((usersignup) => {
        const payload = {
          id: usersignup.id,
          email: usersignup.email
        };
        const token = jwt.sign({ payload }, process.env.PRIVATE_KEY, { expiresIn: 60 * 60 });
        res.status(201).send({
          message: 'you have successfully signed up!', token
        });
      }).catch(err => res.status(500).send(err));
  }
}
export default UserController;
