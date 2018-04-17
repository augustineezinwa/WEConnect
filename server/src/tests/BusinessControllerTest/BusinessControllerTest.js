import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import app from '../../app';

dotenv.config();
const should = chai.should();
chai.use(chaiHttp);

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
const business3 = {
  businessName: 'Sony Technologies',
  businessAddress: 'No 159 oakland UK',
  businessDescription: 'We bring out the beauty in the world with our cutting edge technology',
  location: 'United Kingdom',
  category: 'technology',
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

it('signup', (done) => {
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
  done();
});

it('signup', (done) => {
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
  done();
});
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
        res.body.message.should.be.a('string');
        res.body.should.have.property('message').eql('Business with businessId 4 does not exist');
        done();
      });
  });
});
describe('Testing /POST businesses using token authentication', () => {
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
  it('should restrict user if he or she trys to update a business he or she did not create', (done) => {
    chai.request(app).put('/api/v1/businesses/2')
      .send({
        businessName: 'Coca Cola',
      })
      .send({
        token: process.env.TRUE_TOKEN
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('you do not have access to this business');
        done();
      });
  });
  it('should restrict second user if he or she trys to update a business he or she did not create', (done) => {
    chai.request(app).put('/api/v1/businesses/1')
      .send({
        businessName: 'Coca Cola',
      })
      .send({
        token: process.env.SECOND_TRUE_TOKEN
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('you do not have access to this business');
        done();
      });
  });
  it('should forbid second user if he/she trys to update a his/her business name with an existing name in database', (done) => {
    chai.request(app).put('/api/v1/businesses/2')
      .send({
        businessName: 'Virgin Austrailia',
      })
      .send({
        token: process.env.SECOND_TRUE_TOKEN
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property('message').eql('businessName already exists, choose another!');
        done();
      });
  });
  it('should let second user to update his/her business', (done) => {
    chai.request(app).put('/api/v1/businesses/2')
      .send({
        businessName: 'Coca Cola',
      })
      .send({
        token: process.env.SECOND_TRUE_TOKEN
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('business updated successfully');
        res.body.should.have.property('updatedBusinessObject');
        res.body.updatedBusinessObject.should.have.property('businessName').eql('Coca Cola');
        res.body.updatedBusinessObject.should.have.property('businessAddress').eql('No 10 Washington Road Netherland');
        res.body.updatedBusinessObject.should.have.property('location').eql('Netherland');
        res.body.updatedBusinessObject.should.have.property('category').eql('recreation');
        res.body.updatedBusinessObject.should.have.property('businessDescription')
          .eql('Madison park is a park situated at the heart of Netherland');
        res.body.updatedBusinessObject.should.have.property('userId').eql(2);
        done();
      });
  });
  it('should let first user to update his/her business', (done) => {
    chai.request(app).put('/api/v1/businesses/1')
      .send({
        businessName: 'Apple 30 Inc',
        category: 'technology',
        businessDescription: 'A fortune 1000 company where we believe technology makes the world a better place.'
      })
      .send({
        token: process.env.TRUE_TOKEN
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('business updated successfully');
        res.body.should.have.property('updatedBusinessObject');
        res.body.updatedBusinessObject.should.have.property('businessName').eql('Apple 30 Inc');
        res.body.updatedBusinessObject.should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.updatedBusinessObject.should.have.property('location').eql('Austrailia');
        res.body.updatedBusinessObject.should.have.property('category').eql('technology');
        res.body.updatedBusinessObject.should.have.property('businessDescription')
          .eql('A fortune 1000 company where we believe technology makes the world a better place.');
        res.body.updatedBusinessObject.should.have.property('userId').eql(1);
        done();
      });
  });
  it('second user should successfully post second business if he/she provides a valid token', (done) => {
    chai.request(app).post('/api/v1/businesses/')
      .send(business3)
      .send({ token: process.env.SECOND_TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('business registration was successful');
        res.body.should.have.property('createdBusinessObject');
        res.body.createdBusinessObject.should.have.property('businessName').eql('Sony Technologies');
        res.body.createdBusinessObject.should.have.property('businessAddress')
          .eql('No 159 oakland UK');
        res.body.createdBusinessObject.should.have.property('location').eql('United Kingdom');
        res.body.createdBusinessObject.should.have.property('category').eql('technology');
        res.body.createdBusinessObject.should.have.property('businessDescription')
          .eql('We bring out the beauty in the world with our cutting edge technology');
        res.body.createdBusinessObject.should.have.property('userId').eql(+process.env.SECOND_USER_ID);
        res.body.message.should.be.a('string');
        res.body.createdBusinessObject.businessName.should.be.a('string');
        res.body.createdBusinessObject.businessAddress.should.be.a('string');
        res.body.createdBusinessObject.location.should.be.a('string');
        res.body.createdBusinessObject.category.should.be.a('string');
        done();
      });
  });
  it('should forbid first user if he/she tries to delete a business without a token', (done) => {
    chai.request(app).delete('/api/v1/businesses/2')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message')
          .eql('You are forbidden from accessing this route! No token! You need to sign up!');
        done();
      });
  });
  it('should forbid first user if he/she tries to delete a business with an invalid token', (done) => {
    chai.request(app).delete('/api/v1/businesses/2')
      .send({ token: process.env.FAKE_TOKEN })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message')
          .eql('You are not allowed to access this route, Failed to authenticate!');
        done();
      });
  });
  it('should forbid first user if he/she tries to delete a business he/she did not create with an true token', (done) => {
    chai.request(app).delete('/api/v1/businesses/2')
      .send({ token: process.env.TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message')
          .eql('you do not have access to this business');
        done();
      });
  });
  it('should allow second user to successfully delete a business he/she created with a true token', (done) => {
    chai.request(app).delete('/api/v1/businesses/2')
      .send({ token: process.env.SECOND_TRUE_TOKEN })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message')
          .eql('business with businessId 2 was deleted successfully');
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
        res.body.businessList[0].should.have.property('businessName').eql('Apple 30 Inc');
        res.body.businessList[0].should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.businessList[0].should.have.property('businessDescription')
          .eql('A fortune 1000 company where we believe technology makes the world a better place.');
        res.body.businessList[0].should.have.property('location').eql('Austrailia');
        res.body.businessList[0].should.have.property('category').eql('technology');
        res.body.businessList[0].should.have.property('userId').eql(1);
        res.body.businessList[0].id.should.be.a('number');
        res.body.businessList[0].businessName.should.be.a('string');
        res.body.businessList[0].businessAddress.should.be.a('string');
        res.body.businessList[0].businessDescription.should.be.a('string');
        res.body.businessList[0].location.should.be.a('string');
        res.body.businessList[0].category.should.be.a('string');
        res.body.businessList[0].userId.should.be.a('number');
        res.body.businessList[1].should.have.property('id').eql(3);
        res.body.businessList[1].should.have.property('businessName').eql('Sony Technologies');
        res.body.businessList[1].should.have.property('businessAddress').eql('No 159 oakland UK');
        res.body.businessList[1].should.have.property('businessDescription')
          .eql('We bring out the beauty in the world with our cutting edge technology');
        res.body.businessList[1].should.have.property('location').eql('United Kingdom');
        res.body.businessList[1].should.have.property('category').eql('technology');
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
describe('Testing /GET businesses/:businessId', () => {
  it('it should GET a business in the database by businessId.', (done) => {
    chai.request(app).get('/api/v1/businesses/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('business search was successful');
        res.body.should.have.property('businessList');
        res.body.businessList.should.be.a('object');
        res.body.businessList.should.have.property('businessName').eql('Apple 30 Inc');
        res.body.businessList.should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.businessList.should.have.property('location').eql('Austrailia');
        res.body.businessList.should.have.property('category').eql('technology');
        res.body.businessList.should.have.property('userId').eql(1);
        res.body.businessList.businessName.should.be.a('string');
        res.body.businessList.businessAddress.should.be.a('string');
        res.body.businessList.location.should.be.a('string');
        res.body.businessList.category.should.be.a('string');
        res.body.businessList.userId.should.be.a('number');
        done();
      });
  });
});
describe('Testing /FILTER by category endpoint', () => {
  it('it should filter business search by a particular category', (done) => {
    chai.request(app).get('/api/v1/businesses/?category=technology')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Search was successful');
        res.body.should.have.property('businessItems');
        res.body.businessItems.should.be.a('Array');
        res.body.businessItems[0].should.have.property('businessName').eql('Apple 30 Inc');
        res.body.businessItems[0].should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.businessItems[0].should.have.property('location').eql('Austrailia');
        res.body.businessItems[0].should.have.property('category').eql('technology');
        res.body.businessItems[0].should.have.property('userId').eql(1);
        res.body.businessItems[0].businessName.should.be.a('string');
        res.body.businessItems[0].businessAddress.should.be.a('string');
        res.body.businessItems[0].location.should.be.a('string');
        res.body.businessItems[0].category.should.be.a('string');
        res.body.businessItems[0].userId.should.be.a('number');
        res.body.businessItems[1].should.have.property('id').eql(3);
        res.body.businessItems[1].should.have.property('businessName').eql('Sony Technologies');
        res.body.businessItems[1].should.have.property('businessAddress').eql('No 159 oakland UK');
        res.body.businessItems[1].should.have.property('businessDescription')
          .eql('We bring out the beauty in the world with our cutting edge technology');
        res.body.businessItems[1].should.have.property('location').eql('United Kingdom');
        res.body.businessItems[1].should.have.property('category').eql('technology');
        res.body.businessItems[1].should.have.property('userId').eql(2);
        res.body.businessItems[1].id.should.be.a('number');
        res.body.businessItems[1].businessName.should.be.a('string');
        res.body.businessItems[1].businessAddress.should.be.a('string');
        res.body.businessItems[1].location.should.be.a('string');
        res.body.businessItems[1].category.should.be.a('string');
        res.body.businessItems[1].userId.should.be.a('number');
        done();
      });
  });
});
describe('Testing /FILTER by location endpoint', () => {
  it('it should filter business search by a particular location', (done) => {
    chai.request(app).get('/api/v1/businesses/?location=Austrailia')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Search was successful');
        res.body.should.have.property('businessItems');
        res.body.businessItems.should.be.a('array');
        res.body.businessItems[0].should.have.property('businessName').eql('Apple 30 Inc');
        res.body.businessItems[0].should.have.property('businessAddress').eql('No 10 New kingston road new zealand');
        res.body.businessItems[0].should.have.property('location').eql('Austrailia');
        res.body.businessItems[0].should.have.property('category').eql('technology');
        res.body.businessItems[0].should.have.property('userId').eql(1);
        res.body.businessItems[0].businessName.should.be.a('string');
        res.body.businessItems[0].businessAddress.should.be.a('string');
        res.body.businessItems[0].location.should.be.a('string');
        res.body.businessItems[0].category.should.be.a('string');
        res.body.businessItems[0].userId.should.be.a('number');
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
        res.body.message.should.eql('No business was found in this location -london');
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
