'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _BusinessController = require('../controllers/BusinessController');

var _BusinessController2 = _interopRequireDefault(_BusinessController);

var _ReviewController = require('../controllers/ReviewController');

var _ReviewController2 = _interopRequireDefault(_ReviewController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllBusinesses = _BusinessController2.default.getAllBusinesses,
    getBusinessById = _BusinessController2.default.getBusinessById,
    createBusiness = _BusinessController2.default.createBusiness,
    updateBusiness = _BusinessController2.default.updateBusiness,
    removeBusiness = _BusinessController2.default.removeBusiness;
var addReview = _ReviewController2.default.addReview,
    getAllReviews = _ReviewController2.default.getAllReviews;


var Router = _express2.default.Router();

Router.get('/businesses', getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', createBusiness);

Router.put('/businesses/:businessId', updateBusiness);

Router.delete('/businesses/:businessId', removeBusiness);

Router.post('/businesses/:businessId/reviews', addReview);

Router.get('/businesses/:businessId/reviews', getAllReviews);

exports.default = Router;