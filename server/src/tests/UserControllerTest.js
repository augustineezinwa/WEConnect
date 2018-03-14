import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../app';

import { users } from '../dummydb/db';

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

        res.should.have.status(401);

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

        res.should.have.status(400);

        res.body.should.be.a('object');

        res.body.should.have.property('message');

        res.body.message.should.be.eql('login failed! Incorrect password');

        done();

      });
  });
});
