import { businesses } from '../dummydatabase/dummydatabase';
/**
 * @class ReviewController
 * @description CRUD operations on Reviews in Business
 */
class ReviewController {
/**
 * @static
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 * @returns {object} - Status message showing status of recieved review
 * @memberOf ReviewController
 */
  static addReview(req, res) {
    const id = req.params.businessId;
    const business = businesses.find(businessItem => +businessItem.businessId === +id);
    if (!business) {
      return res.status(404).json({ message: `Cannot add Review!, Business with businessId ${id} does not exist` });
    }
    const businessIndex = businesses.indexOf(business);
    const reviewId = businesses[businessIndex].reviews.length === 0 ? 1 :
      businesses[businessIndex].reviews[businesses[businessIndex].reviews.length - 1].reviewId + 1;
    const {
      reviewContent,
      userId
    } = req.body;
    const review = {
      reviewId,
      reviewContent,
      userId,
      businessId: id,
    };
    businesses[businessIndex].reviews.push(review);
    return res.status(201).json({ message: 'review was added successfully', review });
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and gets all reviews for a businesses
  * @memberOf ReviewController
  */
  static getAllReviews(req, res) {
    const id = req.params.businessId;
    const business = businesses.find(businessItem => +businessItem.businessId === +id);
    if (!business) {
      return res.status(404).json({ message: `Cannot get Review! Business with businessId ${id} does not exist` });
    }
    const businessIndex = businesses.indexOf(business);
    const allReviews = businesses[businessIndex].reviews;
    if (allReviews.length === 0) {
      return res.status(404).json({ message: `reviews not available at this time for business with businessId ${id}` });
    }
    return res.status(200).json({ message: 'reviews loaded successfully', allReviews });
  }
}

export default ReviewController;
