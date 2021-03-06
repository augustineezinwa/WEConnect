import bcrypt from 'bcrypt';
import InputFieldsValidation from '../helper/InputFieldsValidation';
import models from '../../models/';

const { user } = models;
const {
  validateEmail, validateName, validatePassword, validatePhoneNumber, validateBusinessTextFields
} = InputFieldsValidation;
/**
 * @class UserInputValidaton
 * @description Validation operations on Users.
 */
class UserValidation {
/**
  * @description -This method validates users in WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {function} next
  * @returns {object} - status Message and logins user into WEConnect
  * @memberOf UserController
  * @static
  */
  static validatesignUp(req, res, next) {
    const {
      firstName, lastName, email, password, confirmpassword, address, phoneNumber
    } = req.body;
    const userSignup = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmpassword: validatePassword(confirmpassword),
      address: validateBusinessTextFields(address) || 'Not Available yet!',
      phoneNumber: validatePhoneNumber(phoneNumber)
    };
    if (!userSignup.password.message) {
      userSignup.password = bcrypt.hashSync(userSignup.password, 10);
    }
    if (!userSignup.confirmpassword.message) {
      userSignup.confirmpassword = bcrypt.hashSync(userSignup.confirmpassword, 10);
    }
    const validateFlag = userSignup.firstName.message || userSignup.lastName.message || userSignup.email.message
    || userSignup.password.message || userSignup.confirmpassword.message || userSignup.address.message
     || userSignup.phoneNumber.message;
    if (validateFlag) {
      return res.status(406).json({ message: 'An Error occured!', userSignup });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(409).json({ message: 'An Error occured!, password doesnt match', userSignup });
    }
    req.body = userSignup;
    return next();
  }
  /**
  * @description -This method checks if an email is existing in WEConnect to avoid reuse.
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {function} next
  * @returns {object} - status Message stating if mail is in use or not.
  * @memberOf Uservalidation class
  * @static
  */
  static checkEmail(req, res, next) {
    const { email } = req.body;
    user.find({
      where: {
        email
      }
    }).then((userObject) => {
      if (userObject) {
        return res.status(409).json({
          message: 'email is already in use'
        });
      }
      if (!userObject) {
        return next();
      }
    }).catch(err => res.status(500).json({
      message: 'Internal server error', err
    }));
  }
}
export default UserValidation;
