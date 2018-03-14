'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../dummydb/db');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class UserController
 *
 * @description CRUD operations on Users
 *
 */
var UserController = function () {
      function UserController() {
            _classCallCheck(this, UserController);
      }

      _createClass(UserController, null, [{
            key: 'loginUser',


            /**
               * @static
               *
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and logins user into WEConnect
               *
               * @memberOf UserController
               *
               */
            value: function loginUser(req, res) {
                  var _req$body = req.body,
                      email = _req$body.email,
                      password = _req$body.password;


                  if (email && password) {

                        var user = _db.users.find(function (userItem) {
                              return userItem.email === email;
                        });

                        if (user) {

                              if (user.password === password && user.email === email) {

                                    res.json({ message: 'you successfully logged in' });
                              } else {

                                    res.status(400).json({ message: 'login failed! Incorrect password' });
                              }
                        } else {

                              res.status(401).json({ message: 'your email was not found, sign up!' });
                        }
                  }
            }
      }]);

      return UserController;
}();

exports.default = UserController;