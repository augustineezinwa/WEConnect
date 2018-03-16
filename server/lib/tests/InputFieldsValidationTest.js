'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _InputFieldsValidation = require('../helper/InputFieldsValidation');

var _InputFieldsValidation2 = _interopRequireDefault(_InputFieldsValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateName = _InputFieldsValidation2.default.validateName,
    validatePassword = _InputFieldsValidation2.default.validatePassword,
    validateLocation = _InputFieldsValidation2.default.validateLocation,
    validatePhoneNumber = _InputFieldsValidation2.default.validatePhoneNumber,
    validateBusinessTextFields = _InputFieldsValidation2.default.validateBusinessTextFields,
    validateEmail = _InputFieldsValidation2.default.validateEmail,
    validateCategory = _InputFieldsValidation2.default.validateCategory;


var should = _chai2.default.should();

_chai2.default.use(_chaiHttp2.default);

process.env.NODE_ENV = 'test';

describe('Testing method validateName()', function () {

    it('it should return an error object if supplied with empty string', function () {

        var output = validateName('');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validateName('');

        output.should.have.property('message');

        output.message.should.be.eql(' field is Empty');
    });

    it('it should return an an error object with message property', function () {

        var output = validateName('derjere%34&');

        output.should.have.property('message');

        output.message.should.be.eql('this field contains Strange Characters!');
    });

    it('it should return an an error object with message property', function () {

        var output = validateName('emeka');

        output.should.be.a('string');

        output.should.be.eql('Emeka');
    });
});

describe('Testing method validatePassword()', function () {

    it('it should return an error object if supplied with empty string', function () {

        var output = validatePassword('');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validatePassword('');

        output.should.have.property('message');

        output.message.should.be.eql('password fields is empty!');
    });

    it('it should return an an error object with message property', function () {

        var output = validatePassword('derjere%34&');

        output.should.be.eql('derjere%34&');
    });

    it('it should return an an error object with message property', function () {

        var output = validatePassword('');

        output.should.be.a('object');

        output.message.should.be.eql('password fields is empty!');
    });

    it('it should return an an error object with message property if password is too short', function () {

        var output = validatePassword('323');

        output.should.be.a('object');

        output.message.should.be.eql('password length must be at least 6 characters');
    });

    it('it should return an an error object with message if password contains space', function () {

        var output = validatePassword('323 3421a');

        output.should.be.a('object');

        output.message.should.be.eql('invalid password, it contains space');
    });

    it('it should return an error object if password contains only letters', function () {

        var output = validatePassword('swdfsdsdswdea');

        output.should.be.a('object');

        output.message.should.be.eql('password must contain at least a number, and any other special character');
    });
});

describe('Testing method validateEmail()', function () {

    it('it should return an error object if supplied with empty string', function () {

        var output = validateEmail('');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validateEmail('');

        output.should.have.property('message');

        output.message.should.be.eql('email field cannot be empty');
    });

    it('it should return an an error object with message property when email has space', function () {

        var output = validateEmail('augsu st inee@gmial.com');

        output.message.should.be.eql('invalid email ,contains space ');
    });

    it('it should return an an error object with message property', function () {

        var output = validateEmail('dfrerer@@gmail.com');

        output.should.be.a('object');

        output.message.should.be.eql('Invalid email, recheck your email');
    });

    it('it should return an the valid email, if email supplied is valid', function () {

        var output = validateEmail('augustineezinwa@gmail.com');

        output.should.be.eql('augustineezinwa@gmail.com');
    });
});

describe('Testing method validateEmail()', function () {

    it('it should return an error object if supplied with empty string', function () {

        var output = validateEmail('');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validateEmail('');

        output.should.have.property('message');

        output.message.should.be.eql('email field cannot be empty');
    });
});

describe('Testing method validatephoneNumber()', function () {

    it('it should return an error object if supplied with empty string', function () {

        var output = validatePhoneNumber('');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validatePhoneNumber('');

        output.should.have.property('message');

        output.message.should.be.eql('Phone number is not valid, must not contain - or _ or space');
    });
});

describe('Testing method validateCategory()', function () {

    it('it should return an error object if supplied with an invalid categoryu', function () {

        var output = validateCategory('fish');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validateCategory('donkey');

        output.should.have.property('message');

        output.message.should.be.eql('Invalid category');
    });

    it('it should return the category if category is valid', function () {

        var output = validateCategory('Recreation');

        output.should.be.eql('Recreation');
    });
});

describe('Testing method validateLocation()', function () {

    it('it should return an error object if supplied with an invalid location', function () {

        var output = validateCategory('newjersey');

        output.should.be.a('object');
    });

    it('it should return an an error object with message property', function () {

        var output = validateLocation('lake');

        output.should.have.property('message');

        output.message.should.be.eql('Location is not a valid! or supported');
    });

    it('it should return the location if location is valid', function () {

        var output = validateLocation('Netherland');

        output.should.be.eql('Netherland');
    });
});

describe('Testing method validateBusinessTextFields()', function () {

    it('it should return the same Text if the parameter is without error.', function () {

        var output = validateBusinessTextFields('newJersey');

        output.should.be.eql('newJersey');
    });

    it('it should return an an error object with message property', function () {

        var output = validateBusinessTextFields('A.B');

        output.should.have.property('message');

        output.message.should.be.eql('Field cant be too short!');
    });

    it('it should return the location if location is valid', function () {

        var output = validateBusinessTextFields('');

        output.message.should.be.eql('Field cant be empty');
    });
});