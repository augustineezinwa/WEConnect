'use strict';

Object.defineProperty(exports, "__esModule", {
      value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../dummydb/db');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class ReviewController
 *
 * @description CRUD operations on Reviews in Business
 *
 */
var ReviewController = function () {
      function ReviewController() {
            _classCallCheck(this, ReviewController);
      }

      _createClass(ReviewController, null, [{
            key: 'addReview',


            /**
               * @static
               *
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and adds review for a businesses
               *
               * @memberOf ReviewController
               */
            value: function addReview(req, res) {

                  var id = req.params.businessId;

                  var business = _db.businesses.find(function (businessItem) {
                        return +businessItem.businessId === +id;
                  });

                  if (!business) {

                        res.status(404).json({ message: 'Cannot add Review!, Business with businessId ' + id + ' does not exist' });
                  } else {

                        var businessIndex = _db.businesses.indexOf(business);

                        var reviewId = _db.businesses[businessIndex].reviews.length === 0 ? 1 : _db.businesses[businessIndex].reviews[_db.businesses[businessIndex].reviews.length - 1].reviewId + 1;

                        var _req$body = req.body,
                            reviewContent = _req$body.reviewContent,
                            userId = _req$body.userId;


                        var review = {

                              reviewId: reviewId,

                              reviewContent: reviewContent,

                              userId: userId,

                              businessId: id

                        };

                        _db.businesses[businessIndex].reviews.push(review);

                        res.status(201).json({ message: 'review was added successfully', review: review });
                  }
            }

            /**
               * @static
               *
               *
               * @param {object} req - The request payload sent to the router
               * @param {object} res - The response payload sent back from the controller
               *
               * @returns {object} - status Message and gets all reviews for a businesses
               *
               * @memberOf ReviewController
               */

      }, {
            key: 'getAllReviews',
            value: function getAllReviews(req, res) {

                  var id = req.params.businessId;

                  var business = _db.businesses.find(function (businessItem) {
                        return +businessItem.businessId === +id;
                  });

                  if (!business) {

                        res.status(404).json({ message: 'Cannot get Review! Business with businessId ' + id + ' does not exist' });
                  } else {

                        var businessIndex = _db.businesses.indexOf(business);

                        var allReviews = _db.businesses[businessIndex].reviews;

                        res.json({ message: 'reviews loaded successfully', allReviews: allReviews });
                  }
            }
      }]);

      return ReviewController;
}();

exports.default = ReviewController;