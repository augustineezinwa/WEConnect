import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Testing /POST auth/signup,', () => {
  it('should not sign up a user if he or she fails to supply valid parameters', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: 'fe3434',
      email: 'augustineezinwa@gmail.com',
      password: '343435eref3',
      confirmpassword: '343435eref3',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.should.have.property('userSignup').be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Emeka');
        res.body.userSignup.should.have.property('lastName').be.a('object');
        res.body.userSignup.should.have.property('email').eql('augustineezinwa@gmail.com');
        res.body.userSignup.should.have.property('password').be.a('string');
        res.body.userSignup.should.have.property('confirmpassword').be.a('string');
        res.body.userSignup.should.have.property('phoneNumber').eql('07034629228');
        done();
      });
  });
  it('should not sign up a user if he or she fails to supply the valid lastName and email', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: '3dgfdfe',
      email: 'augustineezin@wa@gmail.com',
      password: '343435eref3',
      confirmpassword: '343435eref3',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.should.have.property('userSignup').be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Emeka');
        res.body.userSignup.should.have.property('lastName').be.a('object');
        res.body.userSignup.lastName.should.have.property('message').eql('this field contains Strange Characters!');
        res.body.userSignup.should.have.property('email').be.a('object');
        res.body.userSignup.email.should.have.property('message').eql('Invalid email, recheck your email');
        res.body.userSignup.should.have.property('password').be.a('string');
        res.body.userSignup.should.have.property('phoneNumber').eql('07034629228');
        done();
      });
  });
  it('should not sign up a user if he or she fails to supply valid name, email or number', (done) => {
    const newUser = {
      firstName: 'Emeka23',
      email: 'augustineezin@wa@gmail.com',
      password: '343435eref3',
      phoneNumber: '07034629228a2'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.should.have.property('userSignup').be.a('object');
        res.body.userSignup.firstName.should.have.property('message').eql('this field contains Strange Characters!');
        res.body.userSignup.lastName.should.have.property('message').eql('Name field is missing!');
        res.body.userSignup.should.have.property('email').be.a('object');
        res.body.userSignup.email.should.have.property('message').eql('Invalid email, recheck your email');
        res.body.userSignup.should.have.property('password').be.a('string');
        res.body.userSignup.phoneNumber.should.have.property('message').eql('Phone number is not valid, must not contain - or _ or space');
        done();
      });
  });
  it('should return an error message if password appears more than two times', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: 'Ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: ['343435a', '433434a'],
      confirmpassword: '3434a35',
      address: 'efdsf fdsf',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Emeka');
        res.body.userSignup.should.have.property('lastName').eql('Ezinwa');
        res.body.userSignup.should.have.property('confirmpassword').be.a('string');
        res.body.userSignup.should.have.property('email').be.eql('augustineezinwa@gmail.com');
        res.body.userSignup.password.should.have.property('message').eql('password cant be an array!');
        res.body.userSignup.should.have.property('address').eql('efdsf fdsf');
        res.body.userSignup.should.have.property('phoneNumber').eql('07034629228');
        done();
      });
  });
  it('should notify user if he/she doesnt provide email during login', (done) => {
    const unverifiedUser = {
      email: '',
      password: '4343434i'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('email is missing!');
        done();
      });
  });
  it('should notify user if he/she fails to provide password during login', (done) => {
    const unverifiedUser = {
      email: 'jet55591@gmail.com',
      password: ''
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('password is missing!');
        done();
      });
  });
});
