import express from 'express';

import BusinessController from '../controllers/BusinessController';

const { getAllBusinesses } = BusinessController;

const Router = express.Router();


Router.get('/businesses', getAllBusinesses);


export default Router;
