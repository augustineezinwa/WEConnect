

Object.defineProperty(exports, '__esModule', {
  value: true
});

let _express = require('express');

let _express2 = _interopRequireDefault(_express);

let _BusinessController = require('../controllers/businessController');

let _BusinessController2 = _interopRequireDefault(_BusinessController);

let _ReviewController = require('../controllers/reviewController');

let _ReviewController2 = _interopRequireDefault(_ReviewController);

let _UserController = require('../controllers/userController');

let _UserController2 = _interopRequireDefault(_UserController);

let _UserValidation = require('../middlewares/UserValidation');

let _UserValidation2 = _interopRequireDefault(_UserValidation);

let _BusinessValidation = require('../middlewares/BusinessValidation');

let _BusinessValidation2 = _interopRequireDefault(_BusinessValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let getAllBusinesses = _BusinessController2.default.getAllBusinesses,
  getBusinessById = _BusinessController2.default.getBusinessById,
  createBusiness = _BusinessController2.default.createBusiness,
  updateBusiness = _BusinessController2.default.updateBusiness,
  removeBusiness = _BusinessController2.default.removeBusiness,
  filterSearchByCategory = _BusinessController2.default.filterSearchByCategory,
  filterSearchByLocation = _BusinessController2.default.filterSearchByLocation;
let addReview = _ReviewController2.default.addReview,
  getAllReviews = _ReviewController2.default.getAllReviews;
let loginUser = _UserController2.default.loginUser,
  signupUser = _UserController2.default.signupUser;
let validatesignUp = _UserValidation2.default.validatesignUp;
let validateBusiness = _BusinessValidation2.default.validateBusiness,
  validateBusinessUpdate = _BusinessValidation2.default.validateBusinessUpdate;


let Router = _express2.default.Router();

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
