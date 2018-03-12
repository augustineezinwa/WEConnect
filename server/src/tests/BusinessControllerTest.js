import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import { businesses } from '../dummydb/db';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';


describe('Testing /GET businesses', () => {

  it('it should GET all business in the array', (done) => {

    chai.request(app).get('/api/v1/businesses')

      .end((err, res) => {

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

describe('Testing /GET businesses/:businessId', () => {

  it('it should GET all business in the array', (done) => {

    chai.request(app).get('/api/v1/businesses/3')

      .end((err, res) => {

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

describe('Testing API endpoints', () => {

  beforeEach((done) => {

    businesses.splice(0, businesses.length);
    done();

  });

  describe('Testing /GET businesses', () => {


    it('it should RETURN no businesses if no business is present in database', (done) => {

      chai.request(app).get('/api/v1/businesses')

        .end((err, res) => {

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

  describe('Testing /GET businesses/:businessId', () => {

    it('it should search and return nothing if business is not present', (done) => {

      chai.request(app).get('/api/v1/businesses/4')

        .end((err, res) => {

          res.should.have.status(404);

          res.body.should.be.a('object');

          res.body.should.have.property('message').eql('Business with businessId 4 does not exist');

          done();

        });
    });
  });

});

