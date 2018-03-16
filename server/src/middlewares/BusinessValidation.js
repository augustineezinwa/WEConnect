import InputFieldsValidation from '../helper/InputFieldsValidation';

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

    const {

      businessName,

      businessAddress,

      businessDescription,

      location,

      category

    } = req.body;

    const businessUpdate = {};

    if (businessName) {

      businessUpdate.businessName = validateBusinessTextFields(req.body.businessName);

    }

    if (businessAddress) {

      businessUpdate.businessAddress = validateBusinessTextFields(req.body.businessAddress);

    }

    if (businessDescription) {

      businessUpdate.businessDescription = validateBusinessTextFields(req.body.businessDescription);

    }

    if (location) {

      businessUpdate.location = validateBusinessTextFields(req.body.location);

    }

    if (category) {

      businessUpdate.category = validateBusinessTextFields(req.body.category);

    }

    let errorFlag;

    if (category) {

      if (businessUpdate.category.message) {

        errorFlag = 1;

      }

    } else if (location) {

      if (businessUpdate.location.message) {

        errorFlag = 1;

      }

    } else if (businessDescription) {

      if (businessUpdate.businessDescription.message) {

        errorFlag = 1;

      }
    } else if (businessAddress) {

      if (businessUpdate.businessAddress.message) {

        errorFlag = 1;

      }

    } else if (businessName) {

      if (businessUpdate.businessName.message) {

        errorFlag = 1;

      }

    }

    if (errorFlag) {

      return res.status(400).json({ message: 'An error just occurred!', businessUpdate });

    }

    req.body = businessUpdate;

    return next();

  }

}


export default BusinessValidation;
