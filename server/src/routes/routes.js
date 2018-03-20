import express from 'express';

import BusinessController from '../controllers/businessController';

import ReviewController from '../controllers/reviewController';

import UserController from '../controllers/userController';

import UserValidation from '../middlewares/UserValidation';

import BusinessValidation from '../middlewares/BusinessValidation';

const {

  getAllBusinesses, getBusinessById, createBusiness,

  updateBusiness, removeBusiness, filterSearchByCategory,

  filterSearchByLocation

} = BusinessController;

const { addReview, getAllReviews } = ReviewController;

const { loginUser, signupUser } = UserController;

const { validatesignUp } = UserValidation;

const { validateBusiness, validateBusinessUpdate } = BusinessValidation;

const Router = express.Router();

Router.get('/businesses', filterSearchByLocation, filterSearchByCategory, getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', validateBusiness, createBusiness);

Router.put('/businesses/:businessId', validateBusinessUpdate, updateBusiness);

Router.delete('/businesses/:businessId', removeBusiness);

Router.post('/businesses/:businessId/reviews', addReview);

Router.get('/businesses/:businessId/reviews', getAllReviews);

Router.post('/auth/login', loginUser);

Router.post('/auth/signup', validatesignUp, signupUser);

export default Router;
