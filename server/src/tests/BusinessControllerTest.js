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

      chai.request(app).get('/businesses')

        .end((err, res) => {

          res.should.have.status(200);

          res.body.should.be.a('array');

          res.body.length.should.be.eql(0);

          done();

        });

    });

  });

  describe('/POST businesses', () => {

    it('it should not post a buisness without businessName field', (done) => {

      const business = {

        businessAddress: 'no 5 washington road',
        location: 'turkey',
        category: 'istanbul',
        userId: 1,
        reviews: []

      };

      chai.request(app).post('/businesses')

        .send(business).end((err, res) => {

          res.should.have.status(201);

          res.body.should.be.a('Object');

          res.body.should.have.property('businessId');
          res.body.should.have.property('category').eql('istanbul');
          done();


        });
    });
  });

});
