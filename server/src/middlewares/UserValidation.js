import InputFieldsValidation from '../helper/InputFieldsValidation';

const {
  validateEmail, validateName, validatePassword, validatePhoneNumber
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
  * @param {object} next
  * @returns {object} - status Message and logins user into WEConnect
  * @memberOf UserController
  * @static
  */
  static validatesignUp(req, res, next) {
    const {
      firstName, lastName, email, password, password2, address, phoneNumber
    } = req.body;
    const shouldValidate = firstName && email && lastName && password && password2 && phoneNumber;
    if (!shouldValidate) {
      return res.status(404).json({
        message: 'firstName, email, lastName, password or phoneNumber is missing'
      });
    }
    const user = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      email: validateEmail(email),
      password: validatePassword(password),
      password2: validatePassword(password2),
      address,
      phoneNumber: validatePhoneNumber(phoneNumber)
    };
    const validateFlag = user.firstName.message || user.lastName.message || user.email.message
    || user.password.message || user.password2.message || user.address.message
     || user.phoneNumber.message;
    if (validateFlag) {
      return res.status(406).json({ message: 'An Error occured!', user });
    }
    if (user.password !== user.password2) {
      return res.status(409).json({ message: 'An Error occured!, password doesnt match', user });
    }
    req.body = user;
    return next();
  }
}

export default UserValidation;
