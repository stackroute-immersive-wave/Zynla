const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
// const app = require('../bin/www');
//const listDoc = require('../server/list/listdocEntity');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/search');

describe('Supertesting for search.........', () => {
  it('should get questions(post)', (done) => {
      url
      .post('/getquestions')
      .send({'q':'react'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});

describe('Supertesting for search.........', () => {
  it('should get people(post)', (done) => {
      url
      .post('/getpeople')
      .send({'q':'disadvantages of component?'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });
});

  describe('Supertesting for search.........', () => {
    it('should get concepts(post)', (done) => {
        url
        .post('/getconcepts')
        .send({'concept':'react'})
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err)
                return done(err);
            done();
        });
    });
});
    describe('Supertesting for search.........', () => {
      it('Should follow user(post)', (done) => {
          url
          .post('/followuser')
          .send({'emailId':'akhileshwar08011995@gmail.com','id':'zynlatesting1@gmail.com'})
          .expect(200)
          .end(function(err, res) {
              if (err)
                  return done(err);
              expect(res.status).to.be.equal(200);
              done();
          });
      });
});


describe('Supertesting for search.........', () => {
  it('Checking to unfollowuser(post)', (done) => {
      url
      .put('/unfollowuser')
      .send({'emailId':'akhileshwar08011995@gmail.com','id':'zynlatesting1@gmail.com'})
      .expect(200)
      .end(function(err, res) {
          if (err)
              return done(err);
          expect(res.status).to.be.equal(200);
          done();
      });
  });

});

describe('Supertesting for search.........', () => {
  it('Checking isfollowtopic(post)', (done) => {
      url
      .post('/isfollowtopic')
      .send({'name':'zynlatesting1@gmail.com','q':'react'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});

describe('Supertesting for search.........', () => {
  it('Should follow the topic(post)', (done) => {
      url
      .post('/followtopic')
      .send({'id':'zynlatesting1@gmail.com','concept':'react'})
      .expect(200)
      .expect('Content-Type', `text/html; charset=utf-8`)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});

describe('Supertesting for search.........', () => {
  it('should get user profile(post)', (done) => {
      url
      .post('/getuserprofile')
      .send({'q':'react'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
          if (err)
              return done(err);
          done();
      });
  });

});
