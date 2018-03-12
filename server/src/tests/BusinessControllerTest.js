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

describe('Testing /POST businesses', () => {


  const business1 = {

    businessName: 'Virgin Austrailia',

    businessAddress: 'No 10 New kingston road new zealand',

    location: 'Austrailia',

    category: 'Flight',

    userId: 2,

    reviews: []

  };

  it('it should post a particular business into database', (done) => {

    chai.request(app).post('/api/v1/businesses/')

      .send(business1).end((err, res) => {

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

        businesses.length.should.be.eql(2);

        businesses[1].category.should.be.eql('Flight');

        businesses[1].location.should.be.eql('Austrailia');

        businesses[1].businessId.should.be.eql(4);

        businesses[1].businessName.should.be.eql('Virgin Austrailia');

        businesses[1].businessAddress.should.be.eql('No 10 New kingston road new zealand');


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

  describe('Testing /POST businesses', () => {

    const business = {

      businessName: 'Madison Park',

      businessAddress: 'No 10 New jersey street USA',

      location: 'USA',

      category: 'recreation',

      userId: 1,

      reviews: []

    };

    it('it should add a new business to the database and return the new business', (done) => {

      chai.request(app).post('/api/v1/businesses')

        .send(business).end((err, res) => {

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

          businesses.length.should.be.eql(1);

          businesses[0].category.should.be.eql('recreation');

          businesses[0].location.should.be.eql('USA');

          businesses[0].businessId.should.be.eql(1);

          businesses[0].businessName.should.be.eql('Madison Park');

          businesses[0].businessAddress.should.be.eql('No 10 New jersey street USA');

          done();

        });

    });

  });
});

