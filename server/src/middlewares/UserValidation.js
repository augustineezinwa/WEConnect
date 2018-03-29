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
    const shouldValidate = firstName && email && lastName && password && confirmpassword && phoneNumber;
    if (!shouldValidate) {
      return res.status(404).json({
        message: 'firstName, email, lastName, password or phoneNumber is missing'
      });
    }
    const userSignup = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      email: validateEmail(email),
      password: validatePassword(bcrypt.hashSync(password, 10)),
      confirmpassword: validatePassword(bcrypt.hashSync(confirmpassword, 10)),
      address: validateBusinessTextFields(address) || 'Not available yet',
      phoneNumber: validatePhoneNumber(phoneNumber)
    };
    const validateFlag = userSignup.firstName.message || userSignup.lastName.message || userSignup.email.message
    || userSignup.password.message || userSignup.confirmpassword.message || userSignup.address.message
     || userSignup.phoneNumber.message;
    if (validateFlag) {
      return res.status(406).json({ message: 'An Error occured!', user });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(409).json({ message: 'An Error occured!, password doesnt match', user });
    }
    req.body = userSignup;
    return next();
  }
  /**
  * @description -This method validates users in WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {function} next
  * @returns {object} - status Message and logins user into WEConnect
  * @memberOf Uservalidation class
  * @static
  */
  static checkEmail(req, res, next) {
    const { email } = req.body;
    user.find({
      where: {
        email
      }
    }).then((userItem) => {
      if (userItem) {
        return res.status(409).json({
          message: 'email is already in use'
        });
      }
    }).catch(err => err.status(500).json({
      message: 'Internal server error', err
    }));
    return next();
  }
}
export default UserValidation;
