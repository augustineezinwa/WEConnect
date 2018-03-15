import InputFieldsValidation from '../helper/InputFieldsValidation';

const {

  validateEmail, validateName, validatePassword, validatePhoneNumber

} = InputFieldsValidation;

/**
 * @class InputFieldsValidaton
 *
 * @description Validation operations on Input fields
 *
 */
class UserValidation {

/**
   * @static
   *
   *@description -This method logins users into WEConnect
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {object} next
    * @returns {object} - status Message and logins user into WEConnect
    *
    * @memberOf UserController
    *
    */
  static validatesignUp(req, res, next) {

    const user = {

      firstName: validateName(req.body.firstName),

      lastName: validateName(req.body.lastName),

      email: validateEmail(req.body.email),

      password: validatePassword(req.body.password),

      address: req.body.address,

      phoneNumber: validatePhoneNumber(req.body.phoneNumber)

    };

    const errorFlag = user.firstName.message || user.lastName.message || user.email.message ||

        user.password.message || user.address.message || user.phoneNumber.message;

    if (errorFlag) {

      return res.status(400).json({ message: 'An Error occured!', user });

    }

    req.body = user;

    return next();

  }


}


export default UserValidation;
