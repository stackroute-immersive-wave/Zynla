const should = require('chai').should();
const supertest = require('supertest');
var mongoose = require('mongoose');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
const assert = require('assert');
// const app = require('../bin/www');
const user = require('../server/users/userEntity');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/users');

describe('Supertesting for Users.........',()=>{

  it('Testing Following cards inside landing page(save)',()=>{
    url
    .put('/saveToProfile')
    .send({'id': '165',
    'emailId': 'zynlatesting1@gmail.com',
    'displayImage': '',
      'heading': 'component',
      'statement': 'Testing',
      'postedBy': 'Tester',
      'profileImage': 'dfxdfxgfcgf',
      'addedOn': '11052017',
      'category': 'react',
      'upVotes': '1',
      'downVotes': '3',
      'noofans': '5' })
    .expect(200)
    .then(function(res){
            expect(res.text).to.be.equal("success");
    },function(err){if (err){
  }});
  });
});

  describe('Supertesting for Users.........',function(err){

  it('viewFollowCard inside Answerpage(save)',function(done){
    url
    .put('/viewFollowCard/zynlatesting1@gmail.com}')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res){
            done();
          });
          this.timeout(7000);
  });
});

  describe('Supertesting for Users.........',()=>{

  it('likestatus inside Answerpage(find)',(done)=>{
    url
    .post('/likestatus}')
    .send({
        'id': '165',
        'email': 'zynlatesting1@gmail.com'})
    .expect(200)
    .end(function(err, res){
           if (err) return done(err);
            done();
          });
  });
});

describe('Supertesting for Users.........', () => {
  it('Testing getProfileQues(get)', (done) => {
      url
      .get('/getProfileQues')
      .expect(200)
      .end(function(err, res) {
          if (err)
              return done(err);
          expect(res.status).to.be.equal(200);
          done();
      });
  });

});

describe('Supertesting for Users.........', () => {
  it('Testing getAllUserName(get)', (done) => {
      url
      .get('/getAllUserName')
      .expect(200)
      .end(function(err, res) {
          if (err)
              return done(err);
          expect(res.status).to.be.equal(200);
          done();
      });
  });

});

describe('Supertesting for Users.........', () => {
  it('Testing signup(post)', (done) => {
      url
      .post('/signup')
      .send({'email':'zynlatesting1@gmail.com','firstName':'Zynla','lastName':'Testing','password':'P@ssw0rd'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});

describe('Supertesting for Users.........', () => {
  it('Testing checkuser(post)', (done) => {
      url
      .post('/checkuser')
      .send({'email':'zynlatesting1@gmail.com'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});

describe('Supertesting for Users.........', () => {
  it('Testing logOut(post)', (done) => {
      url
      .post('/logOut')
      .send({'email':'zynlatesting1@gmail.com'})
      .expect(200)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});


describe('Supertesting for Users.........', () => {
  it('Testing viewFav(get)', (done) => {
      url
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});

describe('Supertesting for User.........',()=>{
  it('Facebook authentication callback(find)',(done)=>{
    url
    .post('/auth/facebook/callback')
    .send({ 'token': 'akhileshwar.r1@gmail.com', 'authType':'199','name':'akhileshwar','photos':'akhileshwar','email':'akhileshwar'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      expect(response.status).to.be.equal(200);
      done();
    });
  });
});
describe('Supertesting for Users.........',()=>{
  it('Instagram authentication callbackfind)',(done)=>{
    url
    .post('/auth/instagram/callback')
    .send({ 'token': 'akhileshwar.r1@gmail.com', 'authType':'199','name':'akhileshwar','photos':'akhileshwar','email':'akhileshwar'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      expect(response.status).to.be.equal(200);
      done();
    });
  });
});
describe('Supertesting for Users.........',()=>{
  it('Google authentication callback(find)',(done)=>{
    url
    .post('/auth/google/callback')
    .send({ 'token': 'akhileshwar.r1@gmail.com','name':'akhileshwar','authType':'199','photos':'akhileshwar','email':'akhileshwar'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      expect(response.status).to.be.equal(200);
      done();
    });
  });
});

describe('Supertesting for Users.........',function(err){
  //this.timeout(15000);
  it('Forget password(find)',function(done){
     this.timeout(5000);
    // setTimeout(done, 5000);
    url
    .post('/forgetPassword')
    .send({ 'email': 'akhileshwar.r1@gmail.com','data':'akhileshwar'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      done();
    });
  });
});
describe('Supertesting for Users.........',()=>{
  it('Redirect forgotton password(find)',function(done){
    this.timeout(5000);
  //setTimeout(done, 5000);
    url
    .post('/redirectForgetPassword')
    .send({ 'email': 'akhileshwar.r1@gmail.com'})
    .expect(200)
    .end(function(err, response){
    if (err) return done(err);
      done();
    });
  });
});

// describe('Supertesting for Users.........',()=>{
//   it('Fetch category(find)',(done)=>{
//     url
//     .post('/fetchCatagory')
//     .send({ 'email': 'akhileshwar.r1@gmail.com'})
//     .expect(200)
//     .end(function(err, response){
//       if (err) return done(err);
//       done();
//     });
//   });
// });
describe('Supertesting for Users.........',function(err){
  it('Update isNew(find)',function(done){
    url
    .post('/updateIsNew/:emails')
    .send({ 'emails': 'akhileshwar.r1@gmail.com','isNew':'akhil'})
    .expect(200)
    .end(function(err, response){
        if (err) return done(err);
      done();
    });
    this.timeout(7000);
  });
});
describe('Supertesting for Users.........',function(err){
  it('Update basic info to profile (find)',function(done){
    url
    .post('/updateProfile/:emails')
    .send({ 'emails': 'akhileshwar.r1@gmail.com','data1':'akhil','country':'India'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      done();
    });
    this.timeout(7000);
  });
});
describe('Supertesting for Users.........',()=>{
  it('update user preference data](find)',(done)=>{
    url
    .post('/addPreference')
    .send({ 'emailId': 'akhileshwar.r1@gmail.com','id':'akhil','displayImage':'India','profileImage':'India','heading':'India','postedBy':'India','addedOn':'India','noofans':'India','upVotes':'India','downVotes':'India','views':'India','preferedPos':'India','userName':'userName'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      done();
    });
  });

});
