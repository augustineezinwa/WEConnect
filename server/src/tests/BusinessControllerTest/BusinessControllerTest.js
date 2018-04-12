import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../../app';


dotenv.config();
const should = chai.should();
chai.use(chaiHttp);

console.log(process.env.TRUE_TOKEN);
console.log(process.env.FAKE_TOKEN);
describe('Testing /GET businesses', () => {
  it('should GET all business in the database when initialized', (done) => {
    chai.request(app).get('/api/v1/businesses')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('No business available at this time');
        done();
      });
  });
});
describe('Testing /GET businesses/:businessId', () => {
  it('should GET a business by id, in the database when initialized', (done) => {
    chai.request(app).get('/api/v1/businesses/4')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Business with businessId 4 does not exist');
        done();
      });
  });
});
describe('Testing /GET businesses/:businessId', () => {
  it('it should GET a business in the array by businessId.', (done) => {
    chai.request(app).get('/api/v1/businesses/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('business search was successful');
        res.body.should.have.property('business');
        res.body.business.should.be.a('object');
        res.body.business.should.have.property('businessId').eql(3);
        res.body.business.should.have.property('businessName').eql('Shoprite');
        res.body.business.should.have.property('businessAddress').eql('no 5 washington road');
        res.body.business.should.have.property('location').eql('USA');
        res.body.business.should.have.property('category').eql('supermarket');
        res.body.business.should.have.property('userId').eql(1);
        res.body.business.businessId.should.be.a('number');
        res.body.business.businessName.should.be.a('string');
        res.body.business.businessAddress.should.be.a('string');
        res.body.business.location.should.be.a('string');
        res.body.business.category.should.be.a('string');
        res.body.business.userId.should.be.a('number');
        res.body.business.should.have.property('reviews');
        res.body.business.reviews.should.be.a('array');
        res.body.business.reviews.length.should.eql(0);
        done();
      });
  });
});
describe('Testing /POST businesses using token authentication', () => {
  const business1 = {
    businessName: 'Virgin Austrailia',
    businessAddress: 'No 10 New kingston road new zealand',
    businessDescription: 'This airline is awesome',
    location: 'Austrailia',
    category: 'Flight',
  };
  const business2 = {
    businessName: 'Madison Park',
    businessAddress: 'No 10 Washington Road Netherland',
    businessDescription: 'Madison park is a park situated at the heart of Netherland',
    location: 'Netherland',
    category: 'recreation',
  };
  const newUser = {
    firstName: 'charles',
    lastName: 'ezinwa',
    email: 'testerone@gmail.com',
    password: '5654545q',
    confirmpassword: '5654545q',
    address: 'no 54 dffdfb str ..',
    phoneNumber: '5656455454545'
  };
  const newSecondUser = {
    firstName: 'Jane',
    lastName: 'Ezinwa',
    email: 'JaneEzinwa@gmail.com',
    password: '5654q45q',
    confirmpassword: '5654q45q',
    address: 'no 54 dffdfb str ..',
    phoneNumber: '5656455454545'
  };
  chai.request(app).post('/api/v1/auth/signup')
    .send(newUser)
    .end((err, res) => {
      res.body.should.have.property('token');
      process.env.TRUE_TOKEN = res.body.token;
      jwt.verify(process.env.TRUE_TOKEN, process.env.PRIVATE_KEY, (err, decoded) => {
        if (!err) {
          process.env.USER_ID = decoded.payload.id;
        }
      });
    });
  chai.request(app).post('/api/v1/auth/signup')
    .send(newSecondUser)
    .end(() =>
      chai.request(app).post('/api/v1/auth/login')
        .send({
          email: 'JaneEzinwa@gmail.com',
          password: '5654q45q'
        })
        .end((err, res) => {
          res.body.should.have.property('token');
          process.env.SECOND_TRUE_TOKEN = res.body.token;
          jwt.verify(process.env.SECOND_TRUE_TOKEN, process.env.PRIVATE_KEY, (err, decoded) => {
            if (!err) {
              process.env.SECOND_USER_ID = decoded.payload.id;
            }
          });
        }));
  it('should not post a particular business into database without a token', (done) => {
    chai.request(app).post('/api/v1/businesses/')
      .send(business1).end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('You are forbidden from accessing this route! No token! You need to sign up!');
        res.body.message.should.be.a('string');
        done();
      });
  });
  it('should not post a particular business into database with an incorrect token', (done) => {
    chai.request(app).post('/api/v1/businesses/')
      .send(business1)
      .send({ token: process.env.FAKE_TOKEN })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('You are not allowed to access this route, Failed to authenticate!');
        done();
      });
  });
  it('should successfully post a business if a user provides a valid token', (done) => {
    chai.request(app).post('/api/v1/businesses/')
      .send(business1)
      .send({ token: process.env.TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('business registration was successful');
        res.body.should.have.property('createdBusinessObject');
        res.body.createdBusinessObject.should.have.property('businessName').eql('Virgin Austrailia');
        res.body.createdBusinessObject.should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.createdBusinessObject.should.have.property('location').eql('Austrailia');
        res.body.createdBusinessObject.should.have.property('category').eql('Flight');
        res.body.createdBusinessObject.should.have.property('businessDescription').eql('This airline is awesome');
        res.body.createdBusinessObject.should.have.property('userId').eql(+process.env.USER_ID);
        res.body.message.should.be.a('string');
        res.body.createdBusinessObject.businessName.should.be.a('string');
        res.body.createdBusinessObject.businessAddress.should.be.a('string');
        res.body.createdBusinessObject.location.should.be.a('string');
        res.body.createdBusinessObject.category.should.be.a('string');
        done();
      });
  });
  it('it should successfully post a business if a second user provides a valid token', (done) => {
    chai.request(app).post('/api/v1/businesses/')
      .send(business2)
      .send({ token: process.env.SECOND_TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('business registration was successful');
        res.body.should.have.property('createdBusinessObject');
        res.body.createdBusinessObject.should.have.property('businessName').eql('Madison Park');
        res.body.createdBusinessObject.should.have.property('businessAddress').eql('No 10 Washington Road Netherland');
        res.body.createdBusinessObject.should.have.property('location').eql('Netherland');
        res.body.createdBusinessObject.should.have.property('category').eql('recreation');
        res.body.createdBusinessObject.should.have.property('businessDescription')
          .eql('Madison park is a park situated at the heart of Netherland');
        res.body.createdBusinessObject.should.have.property('userId').eql(+process.env.SECOND_USER_ID);
        res.body.message.should.be.a('string');
        res.body.createdBusinessObject.businessName.should.be.a('string');
        res.body.createdBusinessObject.businessAddress.should.be.a('string');
        res.body.createdBusinessObject.location.should.be.a('string');
        res.body.createdBusinessObject.category.should.be.a('string');
        done();
      });
  });
  it('checking to see if two businesses are available in the database', (done) => {
    chai.request(app).get('/api/v1/businesses')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('business list loaded successfully');
        res.body.should.have.property('businessList');
        res.body.businessList.should.be.a('array');
        res.body.businessList.length.should.be.eql(2);
        res.body.businessList[0].should.have.property('id').eql(1);
        res.body.businessList[0].should.have.property('businessName').eql('Virgin Austrailia');
        res.body.businessList[0].should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.businessList[0].should.have.property('businessDescription').eql('This airline is awesome');
        res.body.businessList[0].should.have.property('location').eql('Austrailia');
        res.body.businessList[0].should.have.property('category').eql('Flight');
        res.body.businessList[0].should.have.property('userId').eql(1);
        res.body.businessList[0].id.should.be.a('number');
        res.body.businessList[0].businessName.should.be.a('string');
        res.body.businessList[0].businessAddress.should.be.a('string');
        res.body.businessList[0].businessDescription.should.be.a('string');
        res.body.businessList[0].location.should.be.a('string');
        res.body.businessList[0].category.should.be.a('string');
        res.body.businessList[0].userId.should.be.a('number');
        res.body.businessList[1].should.have.property('id').eql(2);
        res.body.businessList[1].should.have.property('businessName').eql('Madison Park');
        res.body.businessList[1].should.have.property('businessAddress').eql('No 10 Washington Road Netherland');
        res.body.businessList[1].should.have.property('location').eql('Netherland');
        res.body.businessList[1].should.have.property('category').eql('recreation');
        res.body.businessList[1].should.have.property('userId').eql(2);
        res.body.businessList[1].id.should.be.a('number');
        res.body.businessList[1].businessName.should.be.a('string');
        res.body.businessList[1].businessAddress.should.be.a('string');
        res.body.businessList[1].location.should.be.a('string');
        res.body.businessList[1].category.should.be.a('string');
        res.body.businessList[1].userId.should.be.a('number');
        done();
      });
  });
});
describe('Testing /FILTER by category endpoint', () => {
  it('it should filter business search by a particular category', (done) => {
    chai.request(app).get('/api/v1/businesses/?category=Flight')
      .end((err, res) => {
        res.body.searchBusinessResults[0].should.have.property('businessId').eql(4);
        res.body.searchBusinessResults[0].should.have.property('businessName').eql('Virgin Austrailia');
        res.body.searchBusinessResults[0].should.have.property('businessAddress')
          .eql('No 10 New kingston road new zealand');
        res.body.searchBusinessResults[0].should.have.property('location').eql('Austrailia');
        res.body.searchBusinessResults[0].should.have.property('category').eql('Flight');
        res.body.searchBusinessResults[0].should.have.property('userId').eql(2);
        res.body.searchBusinessResults[0].businessId.should.be.a('number');
        res.body.searchBusinessResults[0].should.be.a('object');
        res.body.searchBusinessResults[0].businessAddress.should.be.a('string');
        res.body.searchBusinessResults[0].location.should.be.a('string');
        res.body.searchBusinessResults[0].category.should.be.a('string');
        res.body.searchBusinessResults[0].userId.should.be.a('number');
        done();
      });
  });
});
describe('Testing /FILTER by location endpoint', () => {
  it('it should filter business search by a particular location', (done) => {
    chai.request(app).get('/api/v1/businesses/?location=Austrailia')
      .end((err, res) => {
        res.body.searchBusinessResults[0].should.have.property('businessId').eql(4);
        res.body.searchBusinessResults[0].should.have.property('businessName').eql('Virgin Austrailia');
        res.body.searchBusinessResults[0].should.have.property('businessAddress')
          .eql('No 10 New kingston road new zealand');
        res.body.searchBusinessResults[0].should.have.property('location').eql('Austrailia');
        res.body.searchBusinessResults[0].should.have.property('category').eql('Flight');
        res.body.searchBusinessResults[0].should.have.property('userId').eql(2);
        res.body.searchBusinessResults[0].businessId.should.be.a('number');
        res.body.searchBusinessResults[0].should.be.a('object');
        res.body.searchBusinessResults[0].businessAddress.should.be.a('string');
        res.body.searchBusinessResults[0].location.should.be.a('string');
        res.body.searchBusinessResults[0].category.should.be.a('string');
        res.body.searchBusinessResults[0].userId.should.be.a('number');
        done();
      });
  });
});
describe('Testing /FILTER by location endpoint', () => {
  it('it should return an error message if business under location doesnt exist', (done) => {
    chai.request(app).get('/api/v1/businesses/?location=london')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        res.body.message.should.eql('Business under location london not found');
        done();
      });
  });
});
describe('Testing /FILTER by Category endpoint', () => {
  it('it should return an error message if business under category doesnt exist', (done) => {
    chai.request(app).get('/api/v1/businesses/?category=recreation')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        res.body.message.should.eql('Business under category recreation not found!');
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
      businessDescription: 'This park gives you the best experience',
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
  describe('Testing /PUT businesses/:businessId', () => {
    it('it should update a business in the database if it exists', (done) => {
      const business = {
        businessId: 2,
        businessName: 'japanAir',
        businessAddress: 'mugochikunu japan',
        businessDescription: 'The best Airline in japan',
        location: 'japan',
        category: 'Flight',
        userId: 2,
        reviews: []
      };
      businesses.push(business);
      chai.request(app).put('/api/v1/businesses/2')
        .send({
          businessAddress: 'No 10 new jersey street, japan',
          location: 'Hiroshima',
        }).end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.a('object');
          res.body.should.have.property('message').eql('business updated successfully');
          res.body.should.have.property('business');
          res.body.business.should.be.a('object');
          res.body.business.should.have.property('businessId').eql(2);
          res.body.business.should.have.property('businessName').eql('japanAir');
          res.body.business.should.have.property('businessAddress').eql('No 10 new jersey street, japan');
          res.body.business.should.have.property('businessDescription').eql('The best Airline in japan');
          res.body.business.should.have.property('location').eql('Hiroshima');
          res.body.business.should.have.property('category').eql('Flight');
          res.body.business.should.have.property('userId').eql(2);
          res.body.business.should.have.property('reviews').eql([]);
          res.body.business.reviews.should.be.a('array');
          res.body.business.userId.should.be.a('number');
          res.body.business.category.should.be.a('string');
          res.body.business.location.should.be.a('string');
          res.body.business.businessAddress.should.be.a('string');
          res.body.business.businessName.should.be.a('string');
          res.body.business.businessId.should.be.a('number');
          done();
        });
    });
    it('it should return error message if business does not exist in database', (done) => {
      chai.request(app).put('/api/v1/businesses/3')
        .send({
          businessName: 'celler de Noma',
          location: 'spain'
        }).end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Business with businessId 3 does not exist!');
          done();
        });
    });
  });
  describe('Testing /DELETE businesses/:businessId', () => {
    it('it should delete a business by Id if it exists', (done) => {
      const business = {
        businessId: 5,
        businessName: 'Shoprite',
        businessAddress: 'no 9 lane str. lagos',
        location: 'Nigeria',
        category: 'supermarket',
        userId: 5,
        reviews: []
      };
      businesses.push(business);
      chai.request(app).delete('/api/v1/businesses/5')
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should  return a message that business does not exist', (done) => {
      chai.request(app).delete('/api/v1/businesses/2')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('business with businessId 2 does not exist');
          done();
        });
    });
  });
});

describe('Testing /PUT businesses/:businessId', () => {
  it('it should update a business in the database if it exists', (done) => {
    const business = {
      businessId: 2,
      businessName: 'japanAir',
      businessAddress: 'mugochikunu japan',
      businessDescription: 'The best Airline in japan',
      location: 'japan',
      category: 'Flight',
      userId: 2,
      reviews: []
    };
    businesses.push(business);
    chai.request(app).put('/api/v1/businesses/2')
      .send({
        businessAddress: 'No 10 new jersey street, japan',
        location: 'turkeyds',
      }).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        done();
      });
  });
});
describe('Testing /PUT businesses/:businessId', () => {
  it('it should update a business in the database if it exists', (done) => {
    const business = {
      businessName: 'japanAir',
      businessAddress: 'mugochikunu japan',
      businessDescription: 'The best Airline in japan',
      location: 'japan',
      category: 'Flight',
      userId: 2,
      reviews: []
    };
    businesses.push(business);
    chai.request(app).put('/api/v1/businesses/2')
      .send({
        businessAddress: 'No 10 new jersey street, japan',
      }).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
