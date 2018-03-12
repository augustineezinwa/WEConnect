'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../dummydb/db');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class BusinessController
 *
 * @description CRUD operations on Business
 *
 */
var BusinessController = function () {
      function BusinessController() {
            _classCallCheck(this, BusinessController);
      }

      _createClass(BusinessController, null, [{
            key: 'getAllBusinesses',


            /**
               * @static
               *
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and list of all businesses
               *
               * @memberOf BusinessController
               */
            value: function getAllBusinesses(req, res) {

                  if (_db.businesses.length === 0) {

                        return res.status(404).json({ message: 'No business available at this time', businesses: _db.businesses });
                  }

                  return res.json({ message: 'business list loaded successfully', businesses: _db.businesses });
            }

            /**
               * @static
               *
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and the particul businesses by id.
               *
               * @memberOf BusinessController
               */

      }, {
            key: 'getBusinessById',
            value: function getBusinessById(req, res) {

                  var id = req.params.businessId;

                  var business = _db.businesses.find(function (businessItem) {
                        return +businessItem.businessId === +id;
                  });

                  if (!business) {

                        res.status(404).json({ message: 'Business with businessId ' + id + ' does not exist' });
                  } else {

                        res.json({ message: 'business search was successful', businesses: _db.businesses });
                  }
            }

            /**
               * @static
               *
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and the particular businesses created.
               *
               * @memberOf BusinessController
               */

      }, {
            key: 'createBusiness',
            value: function createBusiness(req, res) {

                  var businessId = _db.businesses.length === 0 ? 1 : _db.businesses[_db.businesses.length - 1].businessId + 1;

                  var _req$body = req.body,
                      businessName = _req$body.businessName,
                      businessAddress = _req$body.businessAddress,
                      location = _req$body.location,
                      category = _req$body.category,
                      userId = _req$body.userId;


                  var newBusiness = {

                        businessId: businessId,

                        businessName: businessName,

                        businessAddress: businessAddress,

                        location: location,

                        category: category,

                        userId: userId,

                        reviews: []

                  };

                  _db.businesses.push(newBusiness);

                  res.status(201).send({ message: 'business successfully added', newBusiness: newBusiness });
            }
      }]);

      return BusinessController;
}();

exports.default = BusinessController;