import models from '../../models/';

const { review, business } = models;
/**
 * @class ReviewController
 * @description CRUD operations on Reviews in Business
 */
class ReviewController {
/**
 * @static
 * @param {object} req - The request payload sent to the router
 * @param {object} res - The response payload sent back from the controller
 * @returns {object} - Status message showing review has been added and its content
 * @memberOf ReviewController
 */
  static addReview(req, res) {
    const { payload } = req.decoded;
    return business.find({
      where: {
        id: req.params.businessId
      }
    })
      .then((businessObject) => {
        if (!businessObject) {
          return res.status(404).json({ message: `Cannot add Review!, Business with businessId ${req.params.businessId} does not exist` });
        }
        return review.create({
          reviewContent: req.body.reviewContent,
          userId: payload.id,
          businessId: req.params.businessId
        })
          .then(reviews => res.status(201).json({
            message: 'review was added successfully', reviews
          }))
          .catch(err => res.status(500).json({
            message: 'A severe error occurred :Internal server error!', err
          }));
      }).catch(err => res.status(500).json({ message: 'Internal server error', err }));
  }
  /**
  * @static
  * @param {object} req - The request payload sent to the router
  * @param {object} res - The response payload sent back from the controller
  * @returns {object} - status Message and gets all reviews for a businesses
  * @memberOf ReviewController
  */
  static getAllReviews(req, res) {
    return business.find({
      where: {
        id: req.params.businessId,
      }
    })
      .then((businesses) => {
        if (!businesses) {
          return res.status(404).json({
            message: `Cannot get Reviews!,business with id ${req.params.businessId} doesnt exist`
          });
        }
        return review.findAll({
          where: {
            businessId: req.params.businessId
          }
        })
          .then((reviews) => {
            if (reviews.length < 1) {
              return res.status(404).json({
                message: `Review is not available at this time for business with id ${req.params.businessId}`
              });
            }
            return res.status(200).json({
              message: 'Review search was successful', reviews
            });
          }).catch(error => res.status(500).json({
            message: 'Internal server error!', error
          }));
      })
      .catch(err => res.status(500).json({
        message: 'Internal server error', err
      }));
  }
}
export default ReviewController;
