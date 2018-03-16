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

describe('Testing /POST auth/signup,', function () {

        it('it should not sign up a user if he or she fails to supply the valid parameters', function (done) {

                var newUser = {

                        firstName: 'Emeka',

                        lastName: 'fe3434', // checks for valid last Name

                        email: 'augustineezinwa@gmail.com',

                        password: '343435eref3',

                        phoneNumber: '07034629228'

                };

                _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {

                        res.should.have.status(400);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('An Error occured!');

                        res.body.should.have.property('user').be.a('object');

                        res.body.user.should.have.property('firstName').eql('Emeka');

                        res.body.user.should.have.property('lastName').be.a('object');

                        res.body.user.should.have.property('email').eql('augustineezinwa@gmail.com');

                        res.body.user.should.have.property('password').eql('343435eref3');

                        res.body.user.should.have.property('phoneNumber').eql('07034629228');

                        done();
                });
        });

        it('it should not sign up a user if he or she fails to supply the valid parameters', function (done) {

                var newUser = {

                        firstName: 'Emeka',

                        lastName: '3dgfdfe', // checks for valid last Name

                        email: 'augustineezin@wa@gmail.com', // checks for valid email

                        password: '343435eref3',

                        phoneNumber: '07034629228'

                };

                _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {

                        res.should.have.status(400);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('An Error occured!');

                        res.body.should.have.property('user').be.a('object');

                        res.body.user.should.have.property('firstName').eql('Emeka');

                        res.body.user.should.have.property('lastName').be.a('object');

                        res.body.user.lastName.should.have.property('message').eql('this field contains Strange Characters!');

                        res.body.user.should.have.property('email').be.a('object');

                        res.body.user.email.should.have.property('message').eql('Invalid email, recheck your email');

                        res.body.user.should.have.property('password').eql('343435eref3');

                        res.body.user.should.have.property('phoneNumber').eql('07034629228');

                        done();
                });
        });

        it('it should not sign up a user if he or she fails to supply the valid parameters', function (done) {

                var newUser = {

                        firstName: 'Emeka',

                        lastName: '', // checks for valid last Name

                        email: 'augustineezinwa@gmail.com',

                        password: '343435eref3',

                        phoneNumber: '07034629228'

                };

                _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end(function (err, res) {

                        res.should.have.status(400);

                        res.body.should.be.a('object');

                        res.body.should.have.property('message').eql('firstName, email, lastName, password or phoneNumber is missing');

                        done();
                });
        });
});