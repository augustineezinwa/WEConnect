'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputFieldsValidation = require('../helper/InputFieldsValidation');

var _InputFieldsValidation2 = _interopRequireDefault(_InputFieldsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateLocation = _InputFieldsValidation2.default.validateLocation,
    validateCategory = _InputFieldsValidation2.default.validateCategory,
    validateBusinessTextFields = _InputFieldsValidation2.default.validateBusinessTextFields;

/**
 * @class InputFieldsValidaton
 *
 * @description Validation operations on Input fields
 *
 */

var BusinessValidation = function () {
    function BusinessValidation() {
        _classCallCheck(this, BusinessValidation);
    }

    _createClass(BusinessValidation, null, [{
        key: 'validateBusiness',


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
        value: function validateBusiness(req, res, next) {

            var business = {

                businessName: validateBusinessTextFields(req.body.businessName),

                businessAddress: validateBusinessTextFields(req.body.businessAddress),

                businessDescription: validateBusinessTextFields(req.body.businessDescription),

                businessImage: req.body.businessImage,

                location: validateLocation(req.body.location),

                category: validateCategory(req.body.category),

                userId: req.body.userId

            };

            var errorFlag = business.businessName.message || business.businessDescription.message || business.businessAddress.message || business.location.message || business.category.message;

            if (errorFlag) {

                return res.status(400).json({ message: 'An error just occurred!', business: business });
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

    }, {
        key: 'validateBusinessUpdate',
        value: function validateBusinessUpdate(req, res, next) {
            var _req$body = req.body,
                businessName = _req$body.businessName,
                businessAddress = _req$body.businessAddress,
                businessDescription = _req$body.businessDescription,
                location = _req$body.location,
                category = _req$body.category;


            var businessUpdate = {};

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

            var errorFlag = void 0;

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

                return res.status(400).json({ message: 'An error just occurred!', businessUpdate: businessUpdate });
            }

            req.body = businessUpdate;

            return next();
        }
    }]);

    return BusinessValidation;
}();

exports.default = BusinessValidation;