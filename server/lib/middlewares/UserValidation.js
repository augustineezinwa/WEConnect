'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InputFieldsValidation = require('../helper/InputFieldsValidation');

var _InputFieldsValidation2 = _interopRequireDefault(_InputFieldsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateEmail = _InputFieldsValidation2.default.validateEmail,
    validateName = _InputFieldsValidation2.default.validateName,
    validatePassword = _InputFieldsValidation2.default.validatePassword,
    validatePhoneNumber = _InputFieldsValidation2.default.validatePhoneNumber;

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
            key: 'validatesignUp',


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
            value: function validatesignUp(req, res, next) {
                  var _req$body = req.body,
                      firstName = _req$body.firstName,
                      lastName = _req$body.lastName,
                      email = _req$body.email,
                      password = _req$body.password,
                      phoneNumber = _req$body.phoneNumber;


                  var shouldValidate = firstName && email && lastName && password && phoneNumber;

                  if (!shouldValidate) {

                        return res.status(400).json({

                              message: 'firstName, email, lastName, password or phoneNumber is missing'

                        });
                  }

                  var user = {

                        firstName: validateName(req.body.firstName),

                        lastName: validateName(req.body.lastName),

                        email: validateEmail(req.body.email),

                        password: validatePassword(req.body.password),

                        address: req.body.address,

                        phoneNumber: validatePhoneNumber(req.body.phoneNumber)

                  };

                  var errorFlag = user.firstName.message || user.lastName.message || user.email.message || user.password.message || user.address.message || user.phoneNumber.message;

                  if (errorFlag) {

                        return res.status(400).json({ message: 'An Error occured!', user: user });
                  }

                  req.body = user;

                  return next();
            }
      }]);

      return UserValidation;
}();

exports.default = UserValidation;