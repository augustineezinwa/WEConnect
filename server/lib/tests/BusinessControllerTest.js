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

describe('Testing /POST businesses', function () {

        var business1 = {

                businessName: 'Virgin Austrailia',

                businessAddress: 'No 10 New kingston road new zealand',

                location: 'Austrailia',

                category: 'Flight',

                userId: 2,

                reviews: []

        };

        it('it should post a particular business into database', function (done) {

                _chai2.default.request(_app2.default).post('/api/v1/businesses/').send(business1).end(function (err, res) {

                        res.should.have.status(201);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('business successfully added');

                        res.body.newBusiness.should.have.property('businessName').eql('Virgin Austrailia');

                        res.body.newBusiness.should.have.property('businessAddress').eql('No 10 New kingston road new zealand');

                        res.body.newBusiness.should.have.property('location').eql('Austrailia');

                        res.body.newBusiness.should.have.property('category').eql('Flight');

                        res.body.message.should.be.a('string');

                        res.body.newBusiness.businessName.should.be.a('string');

                        res.body.newBusiness.businessAddress.should.be.a('string');

                        res.body.newBusiness.location.should.be.a('string');

                        res.body.newBusiness.category.should.be.a('string');

                        _db.businesses.length.should.be.eql(2);

                        _db.businesses[1].category.should.be.eql('Flight');

                        _db.businesses[1].location.should.be.eql('Austrailia');

                        _db.businesses[1].businessId.should.be.eql(4);

                        _db.businesses[1].businessName.should.be.eql('Virgin Austrailia');

                        _db.businesses[1].businessAddress.should.be.eql('No 10 New kingston road new zealand');

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

                                _db.businesses.length.should.be.eql(1);

                                _db.businesses[0].category.should.be.eql('recreation');

                                _db.businesses[0].location.should.be.eql('USA');

                                _db.businesses[0].businessId.should.be.eql(1);

                                _db.businesses[0].businessName.should.be.eql('Madison Park');

                                _db.businesses[0].businessAddress.should.be.eql('No 10 New jersey street USA');

                                done();
                        });
                });
        });

        describe('Testing /PUT businesses/:businessId', function () {

                it('it should update a business in the database if it exists', function (done) {

                        var business = {

                                businessId: 2,

                                businessName: 'japanAir',

                                businessAddress: 'mugochikunu japan',

                                location: 'japan',

                                category: 'Flight',

                                userId: 2,

                                reviews: []

                        };

                        _db.businesses.push(business);

                        _chai2.default.request(_app2.default).put('/api/v1/businesses/2').send({

                                businessAddress: 'No 10 new jersey street, japan',

                                location: 'Hiroshima'

                        }).end(function (err, res) {

                                res.should.have.status(200);

                                res.body.should.have.a('object');

                                res.body.should.have.property('message').eql('business updated successfully');

                                res.body.should.have.property('business');

                                res.body.business.should.be.a('object');

                                res.body.business.should.have.property('businessId').eql(2);

                                res.body.business.should.have.property('businessName').eql('japanAir');

                                res.body.business.should.have.property('businessAddress').eql('No 10 new jersey street, japan');

                                res.body.business.should.have.property('location').eql('Hiroshima');

                                res.body.business.should.have.property('category').eql('Flight');

                                res.body.business.should.have.property('userId').eql(2);

                                res.body.business.should.have.property('reviews').eql([]);

                                res.body.business.reviews.should.be.a('array');

                                res.body.business.userId.should.be.a('number');

                                res.body.business.category.should.be.a('string');

                                res.body.business.location.should.be.a('string');

                                res.body.business.businessAddress.should.be.a('string');

                                res.body.business.businessName.should.be.a('string');

                                res.body.business.businessId.should.be.a('number');

                                done();
                        });
                });

                it('it should return error message if business does not exist in database', function (done) {

                        _chai2.default.request(_app2.default).put('/api/v1/businesses/3').send({

                                businessName: 'celler de Noma',

                                location: 'spain'

                        }).end(function (err, res) {

                                res.body.should.be.a('object');

                                res.body.should.have.property('message');

                                res.body.message.should.be.eql('Business with businessId 3 does not exist!');

                                done();
                        });
                });
        });

        describe('Testing /DELETE businesses/:businessId', function () {

                it('it should delete a business by Id if it exists', function (done) {

                        var business = {

                                businessId: 5,

                                businessName: 'Shoprite',

                                businessAddress: 'no 9 lane str. lagos',

                                location: 'Nigeria',

                                category: 'supermarket',

                                userId: 5,

                                reviews: []

                        };

                        _db.businesses.push(business);

                        _chai2.default.request(_app2.default).delete('/api/v1/businesses/5').end(function (err, res) {

                                res.should.have.status(204);

                                res.body.should.be.a('object');

                                done();
                        });
                });

                it('it should not return a message that business does not exist', function (done) {

                        _chai2.default.request(_app2.default).delete('/api/v1/businesses/2').end(function (err, res) {

                                res.should.have.status(404);

                                res.body.should.be.a('object');

                                res.body.should.have.property('message');

                                res.body.message.should.be.eql('business with businessId 2 does not exist');

                                done();
                        });
                });
        });
});