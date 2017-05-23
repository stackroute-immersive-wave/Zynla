const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
// const app = require('../bin/www');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/list');

describe('Supertesting for FollowInviteRouter.........',()=>{
  it('Sending invite email to follow(find)',function(done){
    // this.timeout(4000);
    // setTimeout(done,4000);
    url
    .post('/sendInviteEmail')
    .send({ 'emailId': 'akhileshwar.r1@gmail.com', 'questionId':'199','senderName':'akhileshwar'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      expect(response.status).to.be.equal(200);
      done();
    });
  });
});
describe('Supertesting for FollowInviteRouter.........',()=>{
  it('Should follow Question(find)',(done)=>{
    url
    .post('/followQuestion')
    .send({ 'email': 'akhileshwar.r1@gmail.com', 'id':'199'})
    .expect(200)
    .end(function(err, response){
      if (err) return done(err);
      expect(response.status).to.be.equal(200);
      done();
    });
  });
});
