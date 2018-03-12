import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import { businesses } from '../dummydb/db';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';


describe('Testing API endpoints', () => {

  beforeEach((done) => {

    businesses.splice(0, businesses.length);
    done();

  });

  describe('Testing /GET businesses', () => {


    it('it should GET all the businesses', (done) => {

      chai.request(app).get('/api/v1/businesses')

        .end((err, res) => {

          res.should.have.status(404);

          res.body.should.be.a('array');

          res.body.length.should.be.eql(0);

          done();

        });

    });

  });


});

