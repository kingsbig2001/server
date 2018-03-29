'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

var _www = require('../bin/www');

var _www2 = _interopRequireDefault(_www);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect();

_chai2.default.use(_chaiHttp2.default);
// TEST for ALL HTTP GET METHOD
describe('Test For All HTTP GET API endpoints', function () {
  describe('GET all businesses in the model ', function () {
    it('should list ALL businesses on /businessess GET', function (done) {
      _chai2.default.request(_www2.default).get('/businesses').end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('businessid');
        res.body[0].should.have.property('name');
        res.body[0].should.have.property('category');
        res.body[0].should.have.property('location');
        res.body[0].should.have.property('reviews');
        res.body[0].should.have.property('keywords');
        res.body[0].category.should.equal('Auto');
        res.body[0].location.should.equal('lagos');
        done();
      });
    });
  });

  describe('Test for a valid businessid', function () {
    it('Should return `200` status code ', function (done) {
      var businessid = 2;
      _chai2.default.request(_www2.default).get('/businesses/' + businessid).end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('business');
        res.body.should.have.property('message');
        res.body.business.should.have.property('name');
        res.body.business.should.have.property('businessid');
        res.body.business.should.have.property('category');
        res.body.business.should.have.property('location');
        res.body.business.should.have.property('reviews');
        res.body.business.should.have.property('keywords');
        res.body.business.businessid.should.equal(businessid);
        res.body.business.location.should.equal('aba');
        res.body.business.keywords.should.be.a('array');
        done();
      });
    });
    describe('Test for invalid business', function () {
      it('Should return `404` status code', function (done) {
        var businessid = 111;
        _chai2.default.request(_www2.default).get('/businesses/' + businessid).end(function (err, res) {
          res.should.have.status(404);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Business not found');
          // res.body.location.should.equal('lagos');
          done();
        });
      });
    });
  });
});
// TEST for ALL HTTP POST METHOD
describe('Test For All HTTP POST API endpoints', function () {
  describe('Test for Business Registration POST /businesses', function () {
    it('should add a new business on /businesses POST', function (done) {
      _chai2.default.request(_www2.default).post('/businesses').send({ 'name': 'Andela', 'category': 'Educational', 'businessid': '4', 'location': 'lagos',
        'review': 'Unique and outstanding', 'keywords': ['andela', 'africa arise', 'tech'] }).end(function (err, res) {
        //expect(res).to.be.json;
        res.should.have.status(201);
        //res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.newBusiness.should.be.a('object');
        res.body.newBusiness.should.have.property('name');
        res.body.newBusiness.should.have.property('category');
        res.body.newBusiness.should.have.property('businessid');
        res.body.newBusiness.name.should.equal('Andela');
        res.body.newBusiness.category.should.equal('Educational');
        done();
      });
    });
  });
  describe('Test for User Registration POST /auth/signup', function () {
    it('should add a new user on /auth/signup POST', function (done) {
      _chai2.default.request(_www2.default).post('/auth/signup').send({ 'name': 'Kelvin', 'username': 'llcoolj', 'userid': 4, 'email': 'kellcoolj@yahoo.com',
        'password': 'mustach2109' }).end(function (err, res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.should.have.property('userDetails');
        res.body.userDetails.should.have.property('email');
        res.body.userDetails.should.have.property('username');
        // res.body.newBusiness.should.be.a('object');
        // res.body.newBusiness.should.have.property('name');
        // res.body.newBusiness.should.have.property('category');
        // res.body.newBusiness.should.have.property('businessid');
        // res.body.newBusiness.name.should.equal('Andela');
        // res.body.newBusiness.category.should.equal('Educational');
        done();
      });
    });
  });
  describe('USER SignUp with email field blank POST /auth/signup', function () {
    it('should FAIL due to missing/empty email /auth/signup POST', function (done) {
      _chai2.default.request(_www2.default).post('/auth/signup').send({ 'name': 'Denzel Electronics', 'username': 'denzel_electronics', 'userid': 5, 'email': '',
        'password': 'mustach2109' }).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Missing Credentials! Please Check and Try again');
        done();
      });
    });
  });
  describe('USER SignUp with username field Blank POST /auth/signup', function () {
    it('should FAIL due to missing/empty username /auth/signup POST', function (done) {
      _chai2.default.request(_www2.default).post('/auth/signup').send({ 'name': 'GodBless Wears', 'username': '', 'userid': 6, 'email': 'GodBless@yahoo.com',
        'password': 'mustach2109' }).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Missing Credentials! Please Check and Try again');
        done();
      });
    });
  });
  describe('USER SignUp with password field Blank POST /auth/signup', function () {
    it('should FAIL due to missing/empty password /auth/signup POST', function (done) {
      _chai2.default.request(_www2.default).post('/auth/signup').send({ 'name': 'Budget Trading Co', 'username': 'alymoor_brothers', 'userid': 7, 'email': 'trade_budget@btrade.biz',
        'password': '' }).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Missing Credentials! Please Check and Try again');
        done();
      });
    });
  });
  describe('Test for user already signed up POST /auth/signup', function () {
    it('should FAIL due to user already exist /auth/signup POST', function (done) {
      var newUser = { 'name': 'chuks log', 'username': 'chuks_nlog', 'userid': 7, 'email': 'amaechichuks2000@yahoo.com',
        'password': 'mustard_seed' };
      _chai2.default.request(_www2.default).post('/auth/signup').send(newUser).end(function (err, res) {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('User already exist');
        done();
      });
    });
  });
});