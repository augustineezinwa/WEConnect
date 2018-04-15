import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Testing /POST businesses,', () => {
  it('it should not post if one of the vital parameters is missing', (done) => {
    const business = {
      businessAddress: 'no 56 adrer road..',
      location: 'Nigeria',
      category: 'Hotel'
    };
    chai.request(app).post('/api/v1/businesses').send(business)
      .send({ token: process.env.TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('An error just occurred!');
        res.body.should.have.property('newBusiness').be.a('object');
        res.body.newBusiness.should.have.property('businessName').be.a('object');
        res.body.newBusiness.businessName.should.have.property('message').eql('businessName is missing!');
        res.body.newBusiness.should.have.property('businessAddress').eql('no 56 adrer road..');
        res.body.newBusiness.should.have.property('businessDescription').eql('Not available yet!');
        res.body.newBusiness.should.have.property('location').eql('Nigeria');
        res.body.newBusiness.should.have.property('category').eql('Hotel');
        done();
      });
  });
  it('it should not post if one of the parameters has errors', (done) => {
    const business = {
      businessName: 'Sheraton Hotel',
      businessAddress: 'no 56 adrer road..',
      businessDescription: 'Sheraton ,the number one in luxury..',
      location: 'dfdf f',
      category: 'Hotel'
    };
    chai.request(app).post('/api/v1/businesses').send(business)
      .send({ token: process.env.TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An error just occurred!');
        res.body.should.have.property('newBusiness').be.a('object');
        res.body.newBusiness.should.have.property('businessName').eql('Sheraton Hotel');
        res.body.newBusiness.should.have.property('businessAddress').eql('no 56 adrer road..');
        res.body.newBusiness.should.have.property('businessDescription').eql('Sheraton ,the number one in luxury..');
        res.body.newBusiness.location.should.have.property('message').eql('Location is not a valid! or supported');
        res.body.newBusiness.should.have.property('category').eql('Hotel');
        done();
      });
  });
});
