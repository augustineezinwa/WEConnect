'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputFieldsValidation = require('../helper/InputFieldsValidation');

var _InputFieldsValidation2 = _interopRequireDefault(_InputFieldsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateLocation = _InputFieldsValidation2.default.validateLocation,
    validateCategory = _InputFieldsValidation2.default.validateCategory;

/**
 * @class InputFieldsValidaton
 *
 * @description Validation operations on Input fields
 *
 */

var UserValidation = function () {
      function UserValidation() {
            _classCallCheck(this, UserValidation);
      }

      _createClass(UserValidation, null, [{
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

                        businessName: req.body.businessName,

                        businessAddress: req.body.businessAddress,

                        businessDescription: req.body.businessDescription,

                        location: validateLocation(req.body.location),

                        category: validateCategory(req.body.category)

                  };
            }
      }]);

      return UserValidation;
}();