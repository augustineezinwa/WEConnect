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

describe('Testing API endpoints', function () {

  beforeEach(function (done) {

    _db.businesses.splice(0, _db.businesses.length);
    done();
  });

  describe('Testing /GET businesses', function () {

    it('it should GET all the businesses', function (done) {

      _chai2.default.request(_app2.default).get('/api/v1/businesses').end(function (err, res) {

        res.should.have.status(404);

        res.body.should.be.a('array');

        res.body.length.should.be.eql(0);

        done();
      });
    });
  });
});