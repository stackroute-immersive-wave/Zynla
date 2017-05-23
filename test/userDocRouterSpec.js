const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
// const app = require('../bin/www');
//const carddoc = require('../server/card/carddocEntity.js');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/userdoc');

describe('Supertesting for UserDocRouter.........',()=>{
  it('Upload image in cards(find)',(done)=>{
    url
    .post('/uploadImage')
    .send({ 'email': 'akhileshwar.r1@gmail.com', 'picture':'add'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});

describe('Supertesting for UserDocRouter.........',()=>{
  it('Update educational details(find)',(done)=>{
    url
    .post('/updateEdu')
    .send({ 'emailId': 'akhileshwar.r1@gmail.com', 'primary':'add','highSchool':'add','university':'add'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});
describe('Supertesting for UserDocRouter.........',()=>{
  it('Update location details(find)',(done)=>{
    url
    .post('/updateLoc')
    .send({ 'Line1': 'akhileshwar.r1@gmail.com', 'Line2':'add','country':'add','region':'add','city':'add','postalCode':'add'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});
describe('Supertesting for UserDocRouter.........',()=>{
  it('Update profile picture of user(find)',(done)=>{
    url
    .post('/updatePro')
    .send({ 'picture': 'akhileshwar.r1@gmail.com', 'description':'add','dob':'add','gender':'add','phone':'add'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});
describe('Supertesting for UserDocRouter.........',function(err){
  it('Retrieve profile of user(find)',function(done){
  //   this.timeout(3000)
  // setTimeout(done,3000);
    url
    .post('/getuserprofile')
    .send({ 'email': 'akhileshwar.r1@gmail.com'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});
// describe('Supertesting for UserDocRouter.........',function(err){
//   it('Retrieve questions posted by user(find)',function(done){
//     url
//     .post('/getQuestions')
//     .send({ 'email': 'akhileshwar.r1@gmail.com'})
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end(function(err, response){
//             if (err) return done(err);
//             done();
//     });
//     this.timeout(7000);
//   });
// });
// describe('Supertesting for UserDocRouter.........',function(err){
//   it('Retrieve answers posted by user(find)',function(done){
//     url
//     .post('/getAnswers')
//     .send({ 'email': 'akhileshwar.r1@gmail.com'})
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end(function(err, response){
//             if (err) return done(err);
//             done();
//     });
//     this.timeout(7000);
//   });
// });
// describe('Supertesting for UserDocRouter.........',()=>{
//   it('Retreive interested category of user(find)',(done)=>{
//     url
//     .post('/getInterestedTopics')
//     .send({ 'email': 'akhileshwar.r1@gmail.com'})
//     .expect(200)
//     .expect('Content-Type', /json/)
//     .end(function(err, response){
//             if (err) return done(err);
//             done();
//     });
//   });
// });
//

describe('Supertesting for UserDocRouter.........',()=>{
  it('Retrieve watching topics of user(find)',(done)=>{
    url
    .post('/getWatching')
    .send({ 'email': 'akhileshwar.r1@gmail.com'})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});
describe('Supertesting for UserDocRouter.........',()=>{
  it('Retrieve users answer id(find)',(done)=>{
    url
    .post('/getuserAnsId')
    .send({ 'email': 'akhileshwar.r1@gmail.com'})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, response){
            if (err) return done(err);
            done();
    });
  });
});
