'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _BusinessController = require('../controllers/BusinessController');

var _BusinessController2 = _interopRequireDefault(_BusinessController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllBusinesses = _BusinessController2.default.getAllBusinesses,
    getBusinessById = _BusinessController2.default.getBusinessById,
    createBusiness = _BusinessController2.default.createBusiness;


var Router = _express2.default.Router();

Router.get('/businesses', getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', createBusiness);

exports.default = Router;