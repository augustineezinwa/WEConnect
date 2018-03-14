'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../dummydb/db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

process.env.NODE_ENV = 'test';

describe('Testing /POST reviews', function () {

        it('it should return an error message if a business doesnt exist', function (done) {

                var review = {

                        reviewContent: 'i love this park',

                        userId: 34

                };

                _chai2.default.request(_app2.default).post('/api/v1/businesses/4/reviews').send(review).end(function (err, res) {

                        res.should.be.status(404);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message');

                        res.body.message.should.be.eql('Cannot add Review!, Business with businessId 4 does not exist');

                        done();
                });
        });
});

describe('Testing /POST reviews', function () {

        it('it should add reviews to a particular business by Id', function (done) {

                var business1 = {

                        businessId: 3,

                        businessName: 'Virgin Austrailia',

                        businessAddress: 'No 10 New kingston road new zealand',

                        location: 'Austrailia',

                        category: 'Flight',

                        userId: 2,

                        reviews: []

                };

                _db.businesses.push(business1);

                var review = {

                        reviewContent: 'I love this place, its awesome!',

                        userId: 60

                };

                _chai2.default.request(_app2.default).post('/api/v1/businesses/3/reviews').send(review).end(function (err, res) {

                        res.should.have.status(201);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('review was added successfully');

                        res.body.should.have.property('review');

                        res.body.review.should.have.property('reviewId').eql(1);

                        res.body.review.should.have.property('reviewContent').eql('I love this place, its awesome!');

                        res.body.review.should.have.property('userId').eql(60);

                        res.body.review.userId.should.be.a('number');

                        res.body.review.reviewContent.should.be.a('string');

                        res.body.review.reviewId.should.be.a('number');

                        res.body.message.should.be.a('string');

                        done();
                });
        });
});

describe('Testing /GET reviews for a particular business', function () {

        it('it should get all reviews attached to a particular business', function (done) {

                _chai2.default.request(_app2.default).get('/api/v1/businesses/3/reviews').end(function (err, res) {

                        res.should.be.status(200);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('reviews loaded successfully');

                        res.body.should.have.property('allReviews');

                        res.body.allReviews[0].should.have.property('reviewId').eql(1);

                        res.body.allReviews[0].should.have.property('reviewContent').eql('I love this place, its awesome!');

                        res.body.allReviews[0].should.have.property('userId').eql(60);

                        res.body.allReviews[0].userId.should.be.a('number');

                        res.body.allReviews[0].reviewContent.should.be.a('string');

                        res.body.allReviews[0].reviewId.should.be.a('number');

                        res.body.message.should.be.a('string');

                        res.body.allReviews.should.be.a('array');

                        res.body.allReviews.length.should.be.eql(1);

                        done();
                });
        });
});

describe('Testing /GET reviews for a existing business that has no review', function () {

        it('it should return an error message if a business exists and has no review', function (done) {

                var business2 = {

                        businessId: 4,

                        businessName: 'celler de noma',

                        businessAddress: 'No 10 New jersey street ',

                        location: 'New York City',

                        category: 'Hotels',

                        userId: 2,

                        reviews: []

                };

                _db.businesses.push(business2);

                _chai2.default.request(_app2.default).get('/api/v1/businesses/4/reviews').end(function (err, res) {

                        res.should.be.status(404);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message');

                        res.body.message.should.eql('reviews not available at this time for business with businessId 4');

                        done();
                });
        });
});