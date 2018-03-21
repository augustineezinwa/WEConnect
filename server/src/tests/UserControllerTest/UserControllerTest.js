import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Testing /POST user login', () => {
  it('it should login user if user credentials matches the ones in database', (done) => {
    const unverifiedUser = {
      email: 'augustineezinwa@gmail.com',
      password: '34343434'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('you successfully logged in');
        done();
      });
  });
  it('it should return an error message if user-credentials mismatches the ones in database', (done) => {
    const unverifiedUser1 = {
      email: 'jet55591@gmail.com',
      password: '4343i434'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser1).end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('your email was not found, sign up!');
        done();
      });
  });
  it('it should return an unauthorized message if login was attempted with wrong password', (done) => {
    const unverifiedUser2 = {
      email: 'augustineezinwa@gmail.com',
      password: '4343434i'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser2).end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('login failed! Incorrect password');
        done();
      });
  });
});
describe('Testing /POST signup', () => {
  it('it should successfully sign up a user if his/her details is new to the database', (done) => {
    const newUser = {
      firstName: 'augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '434323',
      password2: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You successfully signed up');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('firstName').eql('Augustine');
        res.body.user.should.have.property('lastName').eql('Ezinwa');
        res.body.user.should.have.property('email').eql('jet55591@gmail.com');
        res.body.user.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.user.should.have.property('phoneNumber').eql('0934343434344');
        res.body.user.should.have.property('userId').eql(2);
        res.body.user.businesses.should.be.a('array');
        res.body.user.businesses.length.should.be.eql(0);
        done();
      });
  });
  it('it should return an error message if email is already in use', (done) => {
    const newUser1 = {
      firstName: 'augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '434323',
      password2: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser1).end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('email has been used');
        done();
      });
  });
  it('it should return an error message if password doesnt match', (done) => {
    const newUser2 = {
      firstName: 'Emeka',
      lastName: 'Ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '343435',
      password2: '3434a35',
      address: 'efdsf fdsf',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser2)
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('An Error occured!, password doesnt match');
        done();
      });
  });
  it('it should return  WEConnect welcome message', (done) => {
    chai.request(app).get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('Welcome to WEConnect!');
        done();
      });
  });
});
