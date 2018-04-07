import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);

describe('Testing /POST signup', () => {
  it('should throw an error if user fails to provide first name during signup', (done) => {
    const newUser = {
      firstName: '',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '434323',
      confirmpassword: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').be.a('object');
        res.body.userSignup.firstName.should.have.property('message').eql(' field is Empty');
        res.body.userSignup.should.have.property('lastName').eql('Ezinwa');
        res.body.userSignup.should.have.property('email').eql('jet55591@gmail.com');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.userSignup.should.have.property('phoneNumber').eql('0934343434344');
        done();
      });
  });
  it('should throw an error if user fails to provide last name during signup', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: '',
      email: 'jet55591@gmail.com',
      password: '434323',
      confirmpassword: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('lastName').be.a('object');
        res.body.userSignup.lastName.should.have.property('message').eql(' field is Empty');
        res.body.userSignup.should.have.property('firstName').eql('Augustine');
        res.body.userSignup.should.have.property('email').eql('jet55591@gmail.com');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.userSignup.should.have.property('phoneNumber').eql('0934343434344');
        done();
      });
  });
  it('should throw an error if user fails to provide first name and last name during signup', (done) => {
    const newUser = {
      firstName: '',
      lastName: '',
      email: 'jet55591@gmail.com',
      password: '434323',
      confirmpassword: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').be.a('object');
        res.body.userSignup.should.have.property('lastName').be.a('object');
        res.body.userSignup.firstName.should.have.property('message').eql(' field is Empty');
        res.body.userSignup.lastName.should.have.property('message').eql(' field is Empty');
        res.body.userSignup.should.have.property('email').eql('jet55591@gmail.com');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.userSignup.should.have.property('phoneNumber').eql('0934343434344');
        done();
      });
  });
  it('should throw an error if user fails to provide email during signup', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: '',
      password: '434323',
      confirmpassword: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Augustine');
        res.body.userSignup.should.have.property('lastName').eql('Ezinwa');
        res.body.userSignup.should.have.property('email').be.a('object');
        res.body.userSignup.email.should.have.property('message').eql('email field cannot be empty');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.userSignup.should.have.property('phoneNumber').eql('0934343434344');
        done();
      });
  });
  it('should throw an error if user fails to provide password during signup', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '',
      confirmpassword: '434323',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Augustine');
        res.body.userSignup.should.have.property('lastName').eql('Ezinwa');
        res.body.userSignup.should.have.property('password').be.a('object');
        res.body.userSignup.should.have.property('email').be.eql('jet55591@gmail.com');
        res.body.userSignup.password.should.have.property('message').eql('password is empty!');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.userSignup.should.have.property('phoneNumber').eql('0934343434344');
        done();
      });
  });
  it('should throw an error if user fails to provide confirm password field during signup', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545',
      confirmpassword: '',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '0934343434344'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Augustine');
        res.body.userSignup.should.have.property('lastName').eql('Ezinwa');
        res.body.userSignup.should.have.property('confirmpassword').be.a('object');
        res.body.userSignup.should.have.property('email').be.eql('jet55591@gmail.com');
        res.body.userSignup.confirmpassword.should.have.property('message').eql('password is empty!');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        res.body.userSignup.should.have.property('phoneNumber').eql('0934343434344');
        done();
      });
  });
  it('should throw an error if user fails to provide phone number during signup', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545',
      confirmpassword: '',
      address: 'no 54 dffdfb str ..',
      phoneNumber: ''
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.should.have.property('firstName').eql('Augustine');
        res.body.userSignup.should.have.property('lastName').eql('Ezinwa');
        res.body.userSignup.should.have.property('confirmpassword').be.a('object');
        res.body.userSignup.should.have.property('email').be.eql('jet55591@gmail.com');
        res.body.userSignup.phoneNumber.should.have.property('message').eql('Phone number is not valid, must not contain - or _ or space');
        res.body.userSignup.should.have.property('address').eql('no 54 dffdfb str ..');
        done();
      });
  });
  it('should throw an error if user fails to enter any field during signup', (done) => {
    const newUser = {};
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.firstName.should.have.property('message').eql('Name field is missing!');
        res.body.userSignup.lastName.should.have.property('message').eql('Name field is missing!');
        res.body.userSignup.email.should.have.property('message').eql('email field is missing!');
        res.body.userSignup.password.should.have.property('message').eql('password is needed!');
        res.body.userSignup.confirmpassword.should.have.property('message').eql('password is needed!');
        res.body.userSignup.phoneNumber.should.have.property('message').eql('phoneNumber field cant be empty!');
        res.body.userSignup.address.should.be.eql('Not Available yet!');
        done();
      });
  });
  it('should successfully signup a user that enters all required fields', (done) => {
    const newUser = {
      firstName: 'Augustine',
      lastName: 'ezinwa',
      email: 'jet55591@gmail.com',
      password: '5654545q',
      confirmpassword: '5654545q',
      address: 'no 54 dffdfb str ..',
      phoneNumber: '5656455454545'
    };
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('you have successfully signed up!');
        res.body.should.have.property('token');
        done();
      });
  });
  it('should throw an error if user fails to enter any field during signup', (done) => {
    const newUser = {};
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser).end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.userSignup.should.be.a('object');
        res.body.userSignup.firstName.should.have.property('message').eql('Name field is missing!');
        res.body.userSignup.lastName.should.have.property('message').eql('Name field is missing!');
        res.body.userSignup.email.should.have.property('message').eql('email field is missing!');
        res.body.userSignup.password.should.have.property('message').eql('password is needed!');
        res.body.userSignup.confirmpassword.should.have.property('message').eql('password is needed!');
        res.body.userSignup.phoneNumber.should.have.property('message').eql('phoneNumber field cant be empty!');
        res.body.userSignup.address.should.be.eql('Not Available yet!');
        done();
      });
  });
  it('it should return an error message if email is already in use', (done) => {
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
        res.should.have.status(409);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('email has been used');
        done();
      });
  });
  it('it should return an error message if password doesnt match', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: 'Ezinwa',
      email: 'augustineezinwa@gmail.com',
      password: '343435',
      confirmpassword: '3434a35',
      address: 'efdsf fdsf',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
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
    const unverifiedUser = {
      email: 'jet5559q1@gmail.com',
      password: '4343i434'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser).end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('your email does not exist, please sign up!');
        done();
      });
  });
  it('it should return an unauthorized message if login was attempted with wrong password', (done) => {
    const unverifiedUser = {
      email: 'augustineezinwa@gmail.com',
      password: '4343434i'
    };
    chai.request(app).post('/api/v1/auth/login')
      .send(unverifiedUser).end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.eql('login failed! Incorrect password');
        done();
      });
  });
});
