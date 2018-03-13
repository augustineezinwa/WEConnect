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