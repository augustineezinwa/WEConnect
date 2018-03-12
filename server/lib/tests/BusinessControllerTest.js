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

describe('Testing /GET businesses', function () {

        it('it should GET all business in the array', function (done) {

                _chai2.default.request(_app2.default).get('/api/v1/businesses').end(function (err, res) {

                        res.should.have.status(200);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('business list loaded successfully');

                        res.body.should.have.property('businesses');

                        res.body.businesses.should.be.a('array');

                        res.body.businesses.length.should.be.eql(1);

                        res.body.businesses[0].should.have.property('businessId').eql(3);

                        res.body.businesses[0].should.have.property('businessName').eql('Shoprite');

                        res.body.businesses[0].should.have.property('businessAddress').eql('no 5 washington road');

                        res.body.businesses[0].should.have.property('location').eql('USA');

                        res.body.businesses[0].should.have.property('category').eql('supermarket');

                        res.body.businesses[0].should.have.property('userId').eql(1);

                        res.body.businesses[0].businessId.should.be.a('number');

                        res.body.businesses[0].businessName.should.be.a('string');

                        res.body.businesses[0].businessAddress.should.be.a('string');

                        res.body.businesses[0].location.should.be.a('string');

                        res.body.businesses[0].category.should.be.a('string');

                        res.body.businesses[0].userId.should.be.a('number');

                        done();
                });
        });
});

describe('Testing /GET businesses/:businessId', function () {

        it('it should GET all business in the array', function (done) {

                _chai2.default.request(_app2.default).get('/api/v1/businesses/3').end(function (err, res) {

                        res.should.have.status(200);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('business search was successful');

                        res.body.should.have.property('businesses');

                        res.body.businesses.should.be.a('array');

                        res.body.businesses.length.should.be.eql(1);

                        res.body.businesses[0].should.have.property('businessId').eql(3);

                        res.body.businesses[0].should.have.property('businessName').eql('Shoprite');

                        res.body.businesses[0].should.have.property('businessAddress').eql('no 5 washington road');

                        res.body.businesses[0].should.have.property('location').eql('USA');

                        res.body.businesses[0].should.have.property('category').eql('supermarket');

                        res.body.businesses[0].should.have.property('userId').eql(1);

                        res.body.businesses[0].businessId.should.be.a('number');

                        res.body.businesses[0].businessName.should.be.a('string');

                        res.body.businesses[0].businessAddress.should.be.a('string');

                        res.body.businesses[0].location.should.be.a('string');

                        res.body.businesses[0].category.should.be.a('string');

                        res.body.businesses[0].userId.should.be.a('number');

                        done();
                });
        });
});

describe('Testing API endpoints', function () {

        beforeEach(function (done) {

                _db.businesses.splice(0, _db.businesses.length);
                done();
        });

        describe('Testing /GET businesses', function () {

                it('it should RETURN no businesses if no business is present in database', function (done) {

                        _chai2.default.request(_app2.default).get('/api/v1/businesses').end(function (err, res) {

                                res.should.have.status(404);

                                res.body.should.be.a('object');

                                res.body.should.have.property('message').eql('No business available at this time');

                                res.body.should.have.property('businesses').eql([]);

                                res.body.businesses.should.be.a('array');

                                res.body.businesses.length.should.be.eql(0);

                                done();
                        });
                });
        });

        describe('Testing /GET businesses/:businessId', function () {

                it('it should search and return nothing if business is not present', function (done) {

                        _chai2.default.request(_app2.default).get('/api/v1/businesses/4').end(function (err, res) {

                                res.should.have.status(404);

                                res.body.should.be.a('object');

                                res.body.should.have.property('message').eql('Business with businessId 4 does not exist');

                                done();
                        });
                });
        });

        describe('Testing /POST businesses', function () {

                var business = {

                        businessName: 'Madison Park',

                        businessAddress: 'No 10 New jersey street USA',

                        location: 'USA',

                        category: 'recreation',

                        userId: 1,

                        reviews: []

                };

                it('it should add a new business to the database and return the new business', function (done) {

                        _chai2.default.request(_app2.default).post('/api/v1/businesses').send(business).end(function (err, res) {

                                res.should.have.status(201);

                                res.body.should.be.a('object');

                                res.body.should.have.property('message').eql('business successfully added');

                                res.body.newBusiness.should.have.property('businessName').eql('Madison Park');

                                res.body.newBusiness.should.have.property('businessAddress').eql('No 10 New jersey street USA');

                                res.body.newBusiness.should.have.property('location').eql('USA');

                                res.body.newBusiness.should.have.property('category').eql('recreation');

                                res.body.message.should.be.a('string');

                                res.body.newBusiness.businessName.should.be.a('string');

                                res.body.newBusiness.businessAddress.should.be.a('string');

                                res.body.newBusiness.location.should.be.a('string');

                                res.body.newBusiness.category.should.be.a('string');

                                done();
                        });
                });
        });
});