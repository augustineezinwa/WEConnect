'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _businessController = require('../controllers/businessController');

var _businessController2 = _interopRequireDefault(_businessController);

var _reviewController = require('../controllers/reviewController');

var _reviewController2 = _interopRequireDefault(_reviewController);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _UserValidation = require('../middlewares/UserValidation');

var _UserValidation2 = _interopRequireDefault(_UserValidation);

var _BusinessValidation = require('../middlewares/BusinessValidation');

var _BusinessValidation2 = _interopRequireDefault(_BusinessValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllBusinesses = _businessController2.default.getAllBusinesses,
    getBusinessById = _businessController2.default.getBusinessById,
    createBusiness = _businessController2.default.createBusiness,
    updateBusiness = _businessController2.default.updateBusiness,
    removeBusiness = _businessController2.default.removeBusiness,
    filterSearchByCategory = _businessController2.default.filterSearchByCategory,
    filterSearchByLocation = _businessController2.default.filterSearchByLocation;
var addReview = _reviewController2.default.addReview,
    getAllReviews = _reviewController2.default.getAllReviews;
var loginUser = _userController2.default.loginUser,
    signupUser = _userController2.default.signupUser;
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