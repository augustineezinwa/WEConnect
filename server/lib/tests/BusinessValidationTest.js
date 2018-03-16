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

describe('Testing /POST businesses,', function () {

        it('it should not post if one of the vital parameters is missing', function (done) {

                var business = {

                        businessName: 'Sheraton Hotel',

                        businessAddress: 'no 56 adrer road..',

                        location: 'Nigeria',

                        category: 'Hotel'
                };

                _chai2.default.request(_app2.default).post('/api/v1/businesses').send(business).end(function (err, res) {

                        res.should.have.status(400);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message');

                        res.body.message.should.be.eql('businessName,businessAddress,businessDescription,' + 'location or category is missing');

                        done();
                });
        });

        it('it should not post if one of the parameters has errors', function (done) {

                var business = {

                        businessName: 'Sheraton Hotel',

                        businessAddress: 'no 56 adrer road..',

                        businessDescription: 'Sheraton ,the number one in luxury..',

                        location: 'dfdf f', // user supplies invalid location.

                        category: 'Hotel'

                };

                _chai2.default.request(_app2.default).post('/api/v1/businesses').send(business).end(function (err, res) {

                        res.should.have.status(400);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('An error just occurred!');

                        res.body.should.have.property('business').be.a('object');

                        res.body.business.should.have.property('businessName').eql('Sheraton Hotel');

                        res.body.business.should.have.property('businessAddress').eql('no 56 adrer road..');

                        res.body.business.should.have.property('businessDescription').eql('Sheraton ,the number one in luxury..');

                        res.body.business.location.should.have.property('message').eql('Location is not a valid! or supported');

                        res.body.business.should.have.property('category').eql('Hotel');

                        done();
                });
        });
});