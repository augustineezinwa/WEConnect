import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { businesses } from '../../dummydatabase/dummydatabase';

const should = chai.should();
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Testing /POST reviews', () => {
  it('it should return an error message if a business doesnt exist', (done) => {
    const review = {
      reviewContent: 'i love this park',
      userId: 34
    };
    chai.request(app).post('/api/v1/businesses/4/reviews')
      .send(review).end((err, res) => {
        res.should.be.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('Cannot add Review!, Business with businessId 4 does not exist');
        done();
      });
  });
});
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
describe('Testing /GET reviews for a particular business', () => {
  it('it should get all reviews attached to a particular business', (done) => {
    chai.request(app).get('/api/v1/businesses/3/reviews')
      .end((err, res) => {
        res.should.be.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('reviews loaded successfully');
        res.body.should.have.property('allReviews');
        res.body.allReviews[0].should.have.property('reviewId').eql(1);
        res.body.allReviews[0].should.have.property('reviewContent').eql('I love this place, its awesome!');
        res.body.allReviews[0].should.have.property('userId').eql(60);
        res.body.allReviews[0].userId.should.be.a('number');
        res.body.allReviews[0].reviewContent.should.be.a('string');
        res.body.allReviews[0].reviewId.should.be.a('number');
        res.body.message.should.be.a('string');
        res.body.allReviews.should.be.a('array');
        res.body.allReviews.length.should.be.eql(1);
        done();
      });
  });
});
describe('Testing /GET reviews for a existing business that has no review', () => {
  it('it should return an error message if a business exists and has no review', (done) => {
    const business2 = {
      businessId: 4,
      businessName: 'celler de noma',
      businessAddress: 'No 10 New jersey street ',
      location: 'New York City',
      category: 'Hotels',
      userId: 2,
      reviews: []
    };
    businesses.push(business2);
    chai.request(app).get('/api/v1/businesses/4/reviews')
      .end((err, res) => {
        res.should.be.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('reviews not available at this time for business with businessId 4');
        done();
      });
  });
});
describe('Testing /GET reviews for a business that doesnt exist', () => {
  it('it should return an error message if a business doesnt exist', (done) => {
    chai.request(app).get('/api/v1/businesses/10/reviews')
      .end((err, res) => {
        res.should.be.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Cannot get Review! Business with businessId 10 does not exist');
        done();
      });
  });
});
