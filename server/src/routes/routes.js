import express from 'express';

import BusinessController from '../controllers/BusinessController';

const { getAllBusinesses, getBusinessById } = BusinessController;

const Router = express.Router();


Router.get('/businesses', getAllBusinesses);

Router.get('/businesses/:businessId', getBusinessById);


export default Router;
