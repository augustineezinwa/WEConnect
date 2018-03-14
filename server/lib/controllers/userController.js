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
               *@description -This method logins users into users into WEConnect
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

            /**
               * @static
               *
               *@description -This method signs users into users into WEConnect
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and signs up user into WEConnect
               *
               * @memberOf UserController
               *
               */

      }, {
            key: 'signupUser',
            value: function signupUser(req, res) {

                  var userId = _db.users.length === 0 ? 1 : _db.users[_db.users.length - 1].userId + 1;

                  var _req$body2 = req.body,
                      firstName = _req$body2.firstName,
                      lastName = _req$body2.lastName,
                      email = _req$body2.email,
                      password = _req$body2.password,
                      address = _req$body2.address,
                      phoneNumber = _req$body2.phoneNumber;


                  var emailUser = _db.users.find(function (userItem) {
                        return userItem.email === email;
                  });

                  if (!emailUser) {

                        var user = {

                              userId: userId,

                              firstName: firstName,

                              lastName: lastName,

                              email: email,

                              password: password,

                              address: address,

                              phoneNumber: phoneNumber,

                              businesses: []

                        };

                        _db.users.push(user);

                        res.status(201).json({ message: 'You successfully signed up', user: user });
                  } else {

                        res.status(400).json({ message: 'email has been used' });
                  }
            }
      }]);

      return UserController;
}();

exports.default = UserController;