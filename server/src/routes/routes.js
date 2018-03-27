import express from 'express';
import BusinessController from '../controllers/BusinessController';
import ReviewController from '../controllers/ReviewController';
import UserController from '../controllers/UserController';
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
const router = express.Router();
router.get('/businesses', filterSearchByLocation, filterSearchByCategory, getAllBusinesses);
router.get('/businesses/:businessId', getBusinessById);
router.post('/businesses', validateBusiness, createBusiness);
router.put('/businesses/:businessId', validateBusinessUpdate, updateBusiness);
router.delete('/businesses/:businessId', removeBusiness);
router.post('/businesses/:businessId/reviews', addReview);
router.get('/businesses/:businessId/reviews', getAllReviews);
router.post('/auth/login', loginUser);
router.post('/auth/signup', validatesignUp, signupUser);

export default router;
