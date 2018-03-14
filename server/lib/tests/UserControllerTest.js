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

describe('Testing /POST user login', function () {

      it('it should login user if user credentials matches the ones in database', function (done) {

            var unverifiedUser = {

                  email: 'augustineezinwa@gmail.com',

                  password: '34343434'

            };
            _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(unverifiedUser).end(function (err, res) {

                  res.should.have.status(200);

                  res.body.should.be.a('object');

                  res.body.should.have.property('message');

                  res.body.message.should.be.eql('you successfully logged in');

                  done();
            });
      });

      it('it should return an error message if user-credentials mismatches the ones in database', function (done) {

            var unverifiedUser1 = {

                  email: 'jet55591@gmail.com',

                  password: '4343i434'

            };

            _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(unverifiedUser1).end(function (err, res) {

                  res.should.have.status(401);

                  res.body.should.be.a('object');

                  res.body.should.have.property('message');

                  res.body.message.should.be.eql('your email was not found, sign up!');

                  done();
            });
      });

      it('it should return an unauthorized message if login was attempted with wrong password', function (done) {

            var unverifiedUser2 = {

                  email: 'augustineezinwa@gmail.com',

                  password: '4343434i'

            };

            _chai2.default.request(_app2.default).post('/api/v1/auth/login').send(unverifiedUser2).end(function (err, res) {

                  res.should.have.status(400);

                  res.body.should.be.a('object');

                  res.body.should.have.property('message');

                  res.body.message.should.be.eql('login failed! Incorrect password');

                  done();
            });
      });
});

describe('Testing /POST signup', function () {

      it('it should successfully sign up a user if his/her details is new to the database', function (done) {

            var newUser = {

                  firstName: 'augustine',

                  lastName: 'ezinwa',

                  email: 'jet55591@gmail.com',

                  password: '434323',

                  address: 'no 54 dffdfb str ..',

                  phoneNumber: '0934343434344'

            };

            _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {

                  res.should.have.status(201);

                  res.body.should.be.a('object');

                  done();
            });
      });

      it('it should return an error message if email is already in use', function (done) {

            var newUser1 = {

                  firstName: 'augustine',

                  lastName: 'ezinwa',

                  email: 'jet55591@gmail.com',

                  password: '434323',

                  address: 'no 54 dffdfb str ..',

                  phoneNumber: '0934343434344'

            };

            _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser1).end(function (err, res) {

                  res.should.have.status(400);

                  res.body.should.be.a('object');

                  res.body.should.have.property('message');

                  res.body.message.should.be.eql('email has been used');

                  done();
            });
      });
});