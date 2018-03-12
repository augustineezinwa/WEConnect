import express from 'express';

import BusinessController from '../controllers/BusinessController';

const { getAllBusinesses, getBusinessById, createBusiness } = BusinessController;

const Router = express.Router();


Router.get('/businesses', getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);

Router.post('/businesses', createBusiness);


export default Router;
