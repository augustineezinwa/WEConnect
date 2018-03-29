import InputFieldsValidation from '../helper/InputFieldsValidation';
import models from '../../models/';

const { business } = models;

const {
  validateLocation, validateCategory, validatePhoneNumber, validateBusinessTextFields
} = InputFieldsValidation;
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
      businessName, businessAddress, businessDescription, location, category, userId
    } = req.body;
    const shouldValidate = businessName && businessAddress && businessDescription && location && userId
    && category;
    if (!shouldValidate) {
      return res.status(400).json({
        message: 'businessName,businessAddress,businessDescription,location or category is missing'
      });
    }
    const businessObject = {
      businessName: validateBusinessTextFields(req.body.businessName),
      businessAddress: validateBusinessTextFields(req.body.businessAddress),
      businessDescription: validateBusinessTextFields(req.body.businessDescription),
      businessImage: req.body.businessImage,
      location: validateBusinessTextFields(req.body.location),
      category: validateBusinessTextFields(req.body.category),
      userId: req.body.userId,
    };
    const errorFlag = businessObject.businessName.message || businessObject.businessDescription.message
  || businessObject.businessAddress.message || businessObject.location.message || businessObject.category.message
  || businessObject.userId.message;
    if (errorFlag) {
      return res.status(406).json({ message: 'An error just occurred!', business });
    }
    req.body = businessObject;
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
    const businessUpdate = {
      businessName: validateBusinessTextFields(req.body.businessName) || business.businessName,
      businessAddress: validateBusinessTextFields(req.body.businessAddress) || business.businessAddress,
      businessDescription: validateBusinessTextFields(req.body.businessDescription) || business.businessDescription,
      location: validateLocation(req.body.location) || business.location,
      category: validateCategory(req.body.category) || business.category,
      userId: req.body.userId
    };
    const errorFlag = businessUpdate.businessName.message || businessUpdate.businessAddress.message
   || businessUpdate.businessDescription.message || businessUpdate.location.message
    || businessUpdate.category.message;
    if (errorFlag) {
      return res.status(406).json({ message: 'An error just occurred!', businessUpdate });
    }
    req.body = businessUpdate;
    return next();
  }
  /**
    * @description -This method validates business Updates in WEConnect
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent to the client
    * @param {object} next - The call back function that calls the next middleware
    * @returns {object} - status Message and logins user into WEConnect
    * @memberOf businessValidator class.
    * @static
    */
  static checkBusinessName(req, res, next) {
    business.find({
      where: {
        businessName: req.body.businessName
      }
    }).then((businessObject) => {
      if (!businessObject) {
        return next();
      }
      return res.status(409).json({
        message: 'businessName already exists, choose another!'
      });
    });
  }
  /**
    * @description -This method validates business Updates in WEConnect
    * @param {object} req - The request payload sent to the router
    * @param {object} res - The response payload sent to the client
    * @param {object} next - The call back function that calls the next middleware
    * @returns {object} - status Message and logins user into WEConnect
    * @memberOf businessValidator class.
    * @static
    */
  static verifyUserAction(req, res, next) {
    const { id } = req.decoded;
    business.find({
      where: {
        id: req.params.businessId
      }
    }).then((businessObject) => {
      if (businessObject) {
        if (id === businessObject.userId) {
          return next();
        }
        return res.status(401).json({
          message: 'you do not have access to this business'
        });
      }
    }).catch(err => res.status(500).json({ message: 'Internal server error!', err }));
  }
}

export default BusinessValidation;
