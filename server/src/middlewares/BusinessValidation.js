import InputFieldsValidation from '../helper/InputFieldsValidation';
import models from '../../models/';

const { business } = models;

const {
  validateLocation, validateCategory, validateBusinessTextFields
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
    const userId = req.decoded.payload.id;
    const {
      businessName, businessAddress, businessDescription, location, category
    } = req.body;
    const newBusiness = {
      businessName: validateBusinessTextFields(businessName) || { message: 'businessName is missing!' },
      businessAddress: validateBusinessTextFields(businessAddress) || { message: 'businessAddress is missing!' },
      businessDescription: validateBusinessTextFields(businessDescription) || 'Not available yet!',
      businessImage: req.body.businessImage,
      location: validateLocation(location) || { message: 'location is missing!' },
      category: validateCategory(category) || { message: 'category field is missing!' },
      userId
    };
    const errorFlag = newBusiness.businessName.message || newBusiness.businessDescription.message
    || newBusiness.businessAddress.message || newBusiness.location.message
    || newBusiness.category.message;
    if (errorFlag) {
      return res.status(406).json({ message: 'An error just occurred!', newBusiness });
    }
    req.body = newBusiness;
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
      businessName: validateBusinessTextFields(req.body.businessName) || '',
      businessAddress: validateBusinessTextFields(req.body.businessAddress) || '',
      businessDescription: validateBusinessTextFields(req.body.businessDescription) || '',
      location: validateLocation(req.body.location) || '',
      category: validateCategory(req.body.category) || '',
      userId: req.decoded.payload.id
    };
    const errorFlag = businessUpdate.businessName.message || businessUpdate.businessAddress.message
   || businessUpdate.businessDescription.message || businessUpdate.location.message
    || businessUpdate.category.message;
    if (errorFlag) {
      return res.status(406).json({ message: 'An error just occurred!', businessUpdate });
    }
    req.body = businessUpdate;
    req.id = req.id;
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
      if (+businessObject.id === +req.id) {
        return next();
      }
      return res.status(409).json({
        message: 'businessName already exists, choose another!'
      });
    }).catch(err => res.status(500).json({
      message: 'Internal server error', err
    }));
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
    const { id } = req.decoded.payload;
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
      if (!businessObject) {
        req.body.userId = id;
        req.id = req.id;
        return next();
      }
    }).catch(err => res.status(500).json({ message: 'Internal server error!', err }));
  }
}

export default BusinessValidation;
