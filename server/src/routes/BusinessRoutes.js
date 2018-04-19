import express from 'express';
import BusinessController from '../controllers/BusinessController';
import ReviewController from '../controllers/ReviewController';
import BusinessValidation from '../middlewares/BusinessValidation';
import Authentication from '../middlewares/Authentication';

const BusinessRouter = express.Router();
const {
  getAllBusinesses, getBusinessById, createBusiness,
  updateBusiness, removeBusiness, filterSearchByCategory,
  filterSearchByLocation
} = BusinessController;
const { addReview, getAllReviews } = ReviewController;
const {
  validateBusiness, checkBusinessName, verifyUserAction, validateBusinessUpdate
} = BusinessValidation;
const { secureRoute } = Authentication;

BusinessRouter.route('/businesses')
  .get(filterSearchByLocation, filterSearchByCategory, getAllBusinesses)
  .post(secureRoute, validateBusiness, checkBusinessName, createBusiness);
BusinessRouter.route('/businesses/:businessId')
  .get(getBusinessById)
  .put(secureRoute, verifyUserAction, validateBusinessUpdate, checkBusinessName, updateBusiness)
  .delete(secureRoute, verifyUserAction, removeBusiness);
BusinessRouter.route('/businesses/:businessId/reviews')
  .post(secureRoute, addReview)
  .get(getAllReviews);

export default BusinessRouter;
