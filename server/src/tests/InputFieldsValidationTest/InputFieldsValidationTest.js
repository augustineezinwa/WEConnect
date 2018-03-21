import chai from 'chai';
import chaiHttp from 'chai-http';
import InputFieldsValidation from '../../helper/InputFieldsValidation';

const should = chai.should();
const {
  validateName, validatePassword, validateLocation, validatePhoneNumber,
  validateBusinessTextFields, validateEmail, validateCategory
} = InputFieldsValidation;
chai.use(chaiHttp);
process.env.NODE_ENV = 'test';
describe('Testing method validateName()', () => {
  it('it should return an error object if supplied with empty string', () => {
    const output = validateName('');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validateName('');
    output.should.have.property('message');
    output.message.should.be.eql(' field is Empty');
  });
  it('it should return an an error object with message property', () => {
    const output = validateName('derjere%34&');
    output.should.have.property('message');
    output.message.should.be.eql('this field contains Strange Characters!');
  });
  it('it should return an an error object with message property', () => {
    const output = validateName('emeka');
    output.should.be.a('string');
    output.should.be.eql('Emeka');
  });
});
describe('Testing method validatePassword()', () => {
  it('it should return an error object if supplied with empty string', () => {
    const output = validatePassword('');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validatePassword('');
    output.should.have.property('message');
    output.message.should.be.eql('password fields is empty!');
  });
  it('it should return an an error object with message property', () => {
    const output = validatePassword('derjere%34&');
    output.should.be.eql('derjere%34&');
  });
  it('it should return an an error object with message property', () => {
    const output = validatePassword('');
    output.should.be.a('object');
    output.message.should.be.eql('password fields is empty!');
  });
  it('it should return an an error object with message property if password is too short', () => {
    const output = validatePassword('323');
    output.should.be.a('object');
    output.message.should.be.eql('password length must be at least 6 characters');
  });
  it('it should return an an error object with message if password contains space', () => {
    const output = validatePassword('323 3421a');
    output.should.be.a('object');
    output.message.should.be.eql('invalid password, it contains space');
  });
  it('it should return an error object if password contains only letters', () => {
    const output = validatePassword('swdfsdsdswdea');
    output.should.be.a('object');
    output.message.should.be.eql('password must contain at least a number, and any other special character');
  });
});


describe('Testing method validateEmail()', () => {
  it('it should return an error object if supplied with empty string', () => {
    const output = validateEmail('');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validateEmail('');
    output.should.have.property('message');
    output.message.should.be.eql('email field cannot be empty');
  });
  it('it should return an an error object with message property when email has space', () => {
    const output = validateEmail('augsu st inee@gmial.com');
    output.message.should.be.eql('invalid email ,contains space ');
  });
  it('it should return an an error object with message property', () => {
    const output = validateEmail('dfrerer@@gmail.com');
    output.should.be.a('object');
    output.message.should.be.eql('Invalid email, recheck your email');
  });
  it('it should return an the valid email, if email supplied is valid', () => {
    const output = validateEmail('augustineezinwa@gmail.com');
    output.should.be.eql('augustineezinwa@gmail.com');
  });
});
describe('Testing method validateEmail()', () => {
  it('it should return an error object if supplied with empty string', () => {
    const output = validateEmail('');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validateEmail('');
    output.should.have.property('message');
    output.message.should.be.eql('email field cannot be empty');
  });
});
describe('Testing method validatephoneNumber()', () => {
  it('it should return an error object if supplied with empty string', () => {
    const output = validatePhoneNumber('');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validatePhoneNumber('');
    output.should.have.property('message');
    output.message.should.be.eql('Phone number is not valid, must not contain - or _ or space');
  });
});
describe('Testing method validateCategory()', () => {
  it('it should return an error object if supplied with an invalid categoryu', () => {
    const output = validateCategory('fish');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validateCategory('donkey');
    output.should.have.property('message');
    output.message.should.be.eql('Invalid category');
  });
  it('it should return the category if category is valid', () => {
    const output = validateCategory('Recreation');
    output.should.be.eql('Recreation');
  });
});
describe('Testing method validateLocation()', () => {
  it('it should return an error object if supplied with an invalid location', () => {
    const output = validateCategory('newjersey');
    output.should.be.a('object');
  });
  it('it should return an an error object with message property', () => {
    const output = validateLocation('lake');
    output.should.have.property('message');
    output.message.should.be.eql('Location is not a valid! or supported');
  });
  it('it should return the location if location is valid', () => {
    const output = validateLocation('Netherland');
    output.should.be.eql('Netherland');
  });
});
describe('Testing method validateBusinessTextFields()', () => {
  it('it should return the same Text if the parameter is without error', () => {
    const output = validateBusinessTextFields('newJersey');
    output.should.be.eql('newJersey');
  });
  it('it should return an an error object with message property', () => {
    const output = validateBusinessTextFields('A.B');
    output.should.have.property('message');
    output.message.should.be.eql('Field cant be too short!');
  });
  it('it should return the location if location is valid', () => {
    const output = validateBusinessTextFields('');
    output.message.should.be.eql('Field cant be empty');
  });
});

