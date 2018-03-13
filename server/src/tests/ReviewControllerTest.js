import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import { businesses } from '../dummydb/db';

const should = chai.should();

chai.use(chaiHttp);

process.env.NODE_ENV = 'test';

describe('Testing /POST reviews', () => {

  it('it should add reviews to a particular business by Id', (done) => {

    const business1 = {

      businessId: 3,

      businessName: 'Virgin Austrailia',

      businessAddress: 'No 10 New kingston road new zealand',

      location: 'Austrailia',

      category: 'Flight',

      userId: 2,

      reviews: []

    };

    businesses.push(business1);

    const review = {

      reviewContent: 'I love this place, its awesome!',

      userId: 60,

    };

    chai.request(app).post('/api/v1/businesses/3/reviews')

      .send(review).end((err, res) => {

        res.should.have.status(201);

        res.body.should.be.a('object');

        res.body.should.have.property('message').eql('review was added successfully');

        res.body.should.have.property('review');

        res.body.review.should.have.property('reviewId').eql(1);

        res.body.review.should.have.property('reviewContent').eql('I love this place, its awesome!');

        res.body.review.should.have.property('userId').eql(60);

        res.body.review.userId.should.be.a('number');

        res.body.review.reviewContent.should.be.a('string');

        res.body.review.reviewId.should.be.a('number');

        res.body.message.should.be.a('string');

        done();

      });

  });
});
