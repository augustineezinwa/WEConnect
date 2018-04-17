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
      .send(review)
      .send({ token: process.env.TRUE_TOKEN })
      .end((err, res) => {
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
    const review = {
      reviewContent: 'I love this place, its awesome!'
    };
    chai.request(app).post('/api/v1/businesses/3/reviews')
      .send(review)
      .send({ token: process.env.TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('review was added successfully');
        res.body.should.have.property('reviews');
        res.body.reviews.should.have.property('id').eql(1);
        res.body.reviews.should.have.property('reviewContent').eql('I love this place, its awesome!');
        res.body.reviews.should.have.property('userId').eql(1);
        res.body.reviews.userId.should.be.a('number');
        res.body.reviews.reviewContent.should.be.a('string');
        res.body.reviews.id.should.be.a('number');
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
        res.body.should.have.property('message').eql('Review search was successful');
        res.body.should.have.property('reviews');
        res.body.reviews[0].should.have.property('id').eql(1);
        res.body.reviews[0].should.have.property('reviewContent').eql('I love this place, its awesome!');
        res.body.reviews[0].should.have.property('userId').eql(1);
        res.body.reviews[0].userId.should.be.a('number');
        res.body.reviews[0].reviewContent.should.be.a('string');
        res.body.reviews[0].id.should.be.a('number');
        res.body.message.should.be.a('string');
        res.body.reviews.should.be.a('array');
        res.body.reviews.length.should.be.eql(1);
        done();
      });
  });
});
describe('Testing /GET reviews for a existing business that has no review', () => {
  it('it should return an error message if a business exists and has no review', (done) => {
    chai.request(app).get('/api/v1/businesses/1/reviews')
      .end((err, res) => {
        res.should.be.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.eql('Review is not available at this time for business with id 1');
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
        res.body.message.should.eql('Cannot get Reviews!,business with id 10 doesnt exist');
        done();
      });
  });
});
