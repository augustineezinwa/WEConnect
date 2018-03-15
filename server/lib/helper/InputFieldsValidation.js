'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class InputFieldsValidaton
 *
 * @description Validation operations on Input fields
 *
 */
var InputFieldsValidation = function () {
    function InputFieldsValidation() {
        _classCallCheck(this, InputFieldsValidation);
    }

    _createClass(InputFieldsValidation, null, [{
        key: 'validateName',


        /**
        * @static
         *
         *@description -This method validates input fields in WEConnect forms.
          *
          * @param {object} name - The request payload sent to the router
          *
          *
          * @returns {object} - status Message and logins user into WEConnect
          *
          * @memberOf UserController
          *
          */
        value: function validateName(name) {

            name = name.trim();

            if (name.length === 0) {

                return { message: ' field is Empty' };
            } else if (!/^[a-zA-Z]+$/.test(name)) {

                return { message: 'this field contains Strange Characters!' };
            }

            return name[0].toUpperCase() + name.substr(1);
        }

        /**
               * @static
               *
               *@description -This method logins users into WEConnect
               *
               * @param {object} password - The request payload sent to the router
               * @param {object}  - The response payload sent back from the controller
               *
               * @returns {object} - status Message and logins user into WEConnect
               *
               * @memberOf UserController
               *
               */

    }, {
        key: 'validatePassword',
        value: function validatePassword(password) {

            password = password.trim();

            if (password.length === 0) {

                return { message: 'password fields is empty!' };
            } else if (password.length < 6) {

                return { message: 'password length must be at least 6 characters' };
            } else if (password.includes(' ')) {

                return { message: 'invalid password, it contains space' };
            } else if (!/^(?=.*[0-9-\W]).+$/.test(password)) {

                return { message: 'password must contain at least a number, and any other special character' };
            }

            return password;
        }

        /**
               * @static
               *
               *@description -This method logins users into WEConnect
               *
               * @param {object} email - The request payload sent to the router
               * @param {object} - The response payload sent back from the controller
               *
               * @returns {object} - status Message and logins user into WEConnect
               *
               * @memberOf UserController
               *
               */

    }, {
        key: 'validateEmail',
        value: function validateEmail(email) {

            email = email.trim();

            if (email.length === 0) {

                return { message: 'email field cannot be empty' };
            } else if (email.includes(' ')) {

                return { message: 'invalid email ,contains space ' };
            } else if (!/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(email)) {

                return { message: 'Invalid email, recheck your email' };
            }

            return email;
        }

        /**
               * @static
               *
               *@description -This method logins users into WEConnect
               *
               * @param {object} phone - The request payload sent to the router
               * @param {object} - The response payload sent back from the controller
               *
               * @returns {object} - status Message and logins user into WEConnect
               *
               * @memberOf UserController
               *
               */

    }, {
        key: 'validatePhoneNumber',
        value: function validatePhoneNumber(phone) {

            phone = phone.trim();

            if (!Number(phone)) {

                return { message: 'Phone number is not valid, must not contain - or _ or space' };
            }

            return phone;
        }
    }]);

    return InputFieldsValidation;
}();

exports.default = InputFieldsValidation;