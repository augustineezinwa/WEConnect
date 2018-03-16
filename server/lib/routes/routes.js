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

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _UserValidation = require('../middlewares/UserValidation');

var _UserValidation2 = _interopRequireDefault(_UserValidation);

var _BusinessValidation = require('../middlewares/BusinessValidation');

var _BusinessValidation2 = _interopRequireDefault(_BusinessValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllBusinesses = _BusinessController2.default.getAllBusinesses,
    getBusinessById = _BusinessController2.default.getBusinessById,
    createBusiness = _BusinessController2.default.createBusiness,
    updateBusiness = _BusinessController2.default.updateBusiness,
    removeBusiness = _BusinessController2.default.removeBusiness,
    filterSearchByCategory = _BusinessController2.default.filterSearchByCategory,
    filterSearchByLocation = _BusinessController2.default.filterSearchByLocation;
var addReview = _ReviewController2.default.addReview,
    getAllReviews = _ReviewController2.default.getAllReviews;
var loginUser = _UserController2.default.loginUser,
    signupUser = _UserController2.default.signupUser;
var validatesignUp = _UserValidation2.default.validatesignUp;
var validateBusiness = _BusinessValidation2.default.validateBusiness,
    validateBusinessUpdate = _BusinessValidation2.default.validateBusinessUpdate;


var Router = _express2.default.Router();

Router.get('/businesses', filterSearchByLocation, filterSearchByCategory, getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', validateBusiness, createBusiness);

Router.put('/businesses/:businessId', validateBusinessUpdate, updateBusiness);

Router.delete('/businesses/:businessId', removeBusiness);

Router.post('/businesses/:businessId/reviews', addReview);

Router.get('/businesses/:businessId/reviews', getAllReviews);

Router.post('/auth/login', loginUser);

Router.post('/auth/signup', validatesignUp, signupUser);

exports.default = Router;