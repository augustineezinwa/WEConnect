import express from 'express';

import BusinessController from '../controllers/BusinessController';

import ReviewController from '../controllers/ReviewController';

import UserController from '../controllers/UserController';

import UserValidation from '../middlewares/UserValidation';

const {

  getAllBusinesses, getBusinessById, createBusiness,

  updateBusiness, removeBusiness, filterSearchByCategory,

  filterSearchByLocation

} = BusinessController;

const { addReview, getAllReviews } = ReviewController;

const { loginUser, signupUser } = UserController;

const { validatesignUp } = UserValidation;

const Router = express.Router();

Router.get('/businesses', filterSearchByLocation, filterSearchByCategory, getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', createBusiness);

Router.put('/businesses/:businessId', updateBusiness);

Router.delete('/businesses/:businessId', removeBusiness);

Router.post('/businesses/:businessId/reviews', addReview);

Router.get('/businesses/:businessId/reviews', getAllReviews);

Router.post('/auth/login', loginUser);

Router.post('/auth/signup', validatesignUp, signupUser);

export default Router;
