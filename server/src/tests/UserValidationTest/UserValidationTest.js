import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const should = chai.should();
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Testing /POST auth/signup,', () => {
  it('it should not sign up a user if he or she fails to supply the valid parameters', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: 'fe3434',
      email: 'augustineezinwa@gmail.com',
      password: '343435eref3',
      password2: '343435eref3',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.should.have.property('user').be.a('object');
        res.body.user.should.have.property('firstName').eql('Emeka');
        res.body.user.should.have.property('lastName').be.a('object');
        res.body.user.should.have.property('email').eql('augustineezinwa@gmail.com');
        res.body.user.should.have.property('password').eql('343435eref3');
        res.body.user.should.have.property('password2').eql('343435eref3');
        res.body.user.should.have.property('phoneNumber').eql('07034629228');
        done();
      });
  });
  it('it should not sign up a user if he or she fails to supply the valid parameters', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: '3dgfdfe',
      email: 'augustineezin@wa@gmail.com',
      password: '343435eref3',
      password2: '343435eref3',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(406);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('An Error occured!');
        res.body.should.have.property('user').be.a('object');
        res.body.user.should.have.property('firstName').eql('Emeka');
        res.body.user.should.have.property('lastName').be.a('object');
        res.body.user.lastName.should.have.property('message').eql('this field contains Strange Characters!');
        res.body.user.should.have.property('email').be.a('object');
        res.body.user.email.should.have.property('message').eql('Invalid email, recheck your email');
        res.body.user.should.have.property('password').eql('343435eref3');
        res.body.user.should.have.property('phoneNumber').eql('07034629228');
        done();
      });
  });
  it('it should not sign up a user if he or she fails to supply the valid parameters', (done) => {
    const newUser = {
      firstName: 'Emeka',
      lastName: '',
      email: 'augustineezinwa@gmail.com',
      password: '343435eref3',
      password2: '343435eref3',
      phoneNumber: '07034629228'
    };
    chai.request(app).post('/api/v1/auth/signup').send(newUser)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message')
          .eql('firstName, email, lastName, password or phoneNumber is missing');
        done();
      });
  });
});
