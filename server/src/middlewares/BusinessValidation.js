import InputFieldsValidation from '../helper/InputFieldsValidation';
import { businesses } from '../dummydatabase/dummydatabase';

const { validateLocation, validateCategory, validateBusinessTextFields } = InputFieldsValidation;
/**
  * @class InputFieldsValidaton
  * @description Validation operations on Input fields
  */
class BusinessValidation {
/**
  * @description -This method validates businesses about to be registered in WEConnect
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @param {fucntion} next - The call back function that calls the next middleware
  * @returns {object} - status message showing status of business validation
  * @memberOf UserController
  * @static
  */
  static validateBusiness(req, res, next) {
    const {
      businessName, businessAddress, businessDescription, location, category
    } = req.body;
    const shouldValidate = businessName && businessAddress && businessDescription && location
    && category;
    if (!shouldValidate) {
      return res.status(400).json({
        message: 'businessName,businessAddress,businessDescription,location or category is missing'
      });
    }
    const business = {
      businessName: validateBusinessTextFields(req.body.businessName),
      businessAddress: validateBusinessTextFields(req.body.businessAddress),
      businessDescription: validateBusinessTextFields(req.body.businessDescription),
      businessImage: req.body.businessImage,
      location: validateLocation(req.body.location),
      category: validateCategory(req.body.category),
      userId: req.body.userId
    };
    const errorFlag = business.businessName.message || business.businessDescription.message
  || business.businessAddress.message || business.location.message || business.category.message;
    if (errorFlag) {
      return res.status(406).json({ message: 'An error just occurred!', business });
    }
    req.body = business;
    return next();
  }
  /**
    * @description -This method validates business Updates in WEConnect
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent to the client
    * @param {object} next - The call back function that calls the next middleware
    * @returns {object} - status Message and logins user into WEConnect
    * @memberOf UserController
    * @static
    */
  static validateBusinessUpdate(req, res, next) {
    const id = req.params.businessId;
    const business = businesses.find(businessItem => +businessItem.businessId === +id);
    if (!business) {
      return res.status(404).json({ message: `Business with businessId ${id} does not exist!` });
    }
    const {
      businessName, businessAddress, businessDescription, businessImage, location, category
    } = business;
    const businessUpdate = {
      businessName: validateBusinessTextFields(req.body.businessName || businessName),
      businessAddress: validateBusinessTextFields(req.body.businessAddress || businessAddress),
      businessDescription: validateBusinessTextFields(req.body.businessDescription || businessDescription),
      location: validateLocation(req.body.location || location),
      category: validateCategory(req.body.category || category)
    };
    const errorFlag1 = businessUpdate.businessName.message || businessUpdate.businessAddress.message
   || businessUpdate.businessDescription.message || businessUpdate.location.message
    || businessUpdate.category.message;
    if (errorFlag1) {
      return res.status(406).json({ message: 'An error just occurred!', businessUpdate });
    }
    req.body = businessUpdate;
    return next();
  }
}

export default BusinessValidation;
