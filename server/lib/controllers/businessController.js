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
    }]);

    return BusinessController;
}();

exports.default = BusinessController;