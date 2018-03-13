import express from 'express';

import BusinessController from '../controllers/BusinessController';

import ReviewController from '../controllers/ReviewController';

const {

  getAllBusinesses, getBusinessById, createBusiness,

  updateBusiness, removeBusiness

} = BusinessController;

const { addReview, getAllReviews } = ReviewController;

const Router = express.Router();


Router.get('/businesses', getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', createBusiness);

Router.put('/businesses/:businessId', updateBusiness);

Router.delete('/businesses/:businessId', removeBusiness);

Router.post('/businesses/:businessId/reviews', addReview);

Router.get('/businesses/:businessId/reviews', getAllReviews);

export default Router;
