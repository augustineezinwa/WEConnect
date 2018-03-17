import InputFieldsValidation from '../helper/InputFieldsValidation';

import { businesses } from '../dummydb/db';

const { validateLocation, validateCategory, validateBusinessTextFields } = InputFieldsValidation;

/**
 * @class InputFieldsValidaton
 *
 * @description Validation operations on Input fields
 *
 */
class BusinessValidation {

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

    const {

      businessName,

      businessAddress,

      businessDescription,

      location,

      category

    } = req.body;

    const shouldValidate = businessName && businessAddress && businessDescription && location

    && category;

    if (!shouldValidate) {

      return res.status(400).json({

        message: 'businessName,businessAddress,businessDescription,' +

        'location or category is missing'

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

      return res.status(400).json({ message: 'An error just occurred!', business });

    }

    req.body = business;

    return next();

  }


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
  static validateBusinessUpdate(req, res, next) {

    const id = req.params.businessId;

    const business = businesses.find(businessItem => +businessItem.businessId === +id);

    if (!business) {

      return res.status(404).json({ message: `Business with businessId ${id} does not exist!` });

    }

    const {

      businessName,

      businessAddress,

      businessDescription,

      businessImage,

      location,

      category

    } = business;

    const businessUpdate = {

      businessName: validateBusinessTextFields(req.body.businessName || businessName),

      businessAddress: validateBusinessTextFields(req.body.businessAddress || businessAddress),

      businessDescription: validateBusinessTextFields(req.body.businessDescription || businessDescription),

      location: validateLocation(req.body.location || location),

      category: validateCategory(req.body.category || category)

    };

    const errorFlag = businessUpdate.businessName.message || businessUpdate.businessAddress.message ||

    businessUpdate.businessDescription.message || businessUpdate.location.message || businessUpdate.category.message;


    if (errorFlag) {

      return res.status(400).json({ message: 'An error just occurred!', businessUpdate });

    }

    req.body = businessUpdate;

    return next();

  }

}


export default BusinessValidation;
