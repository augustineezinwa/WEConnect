import InputFieldsValidation from '../helper/InputFieldsValidation';

const {

  validateLocation, validateCategory

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
   *@description -This method validates business Categories in WEConnect
    *
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent back from the controller
    * @param {object} next
    * @returns {object} - status Message and logins user into WEConnect
    *
    * @memberOf UserController
    *
    */
  static validateBusiness(req, res, next) {

    const business = {

      businessName: req.body.businessName,

      businessAddress: req.body.businessAddress,

      businessDescription: req.body.businessDescription,

      location: validateLocation(req.body.location),

      category: validateCategory(req.body.category),

    };


  }


}
