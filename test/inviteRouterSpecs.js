const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
// const app = require('../bin/www');
const carddoc = require('../server/card/carddocEntity.js');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/list');

describe('Supertesting for InviteRouter.........',()=>{
  it('Sending invite email(find)',(done)=>{
    url
    .post('/sendInviteEmail')
    .send({ 'emailId': 'akhileshwar.r1@gmail.com','questionId':'199','senderName':'akhileshwar'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            expect(response.status).to.be.equal(200);
            done();
    });
  });
});
describe('Supertesting for InviteRouter.........',()=>{
  it('followQuestion(find)',(done)=>{
    url
    .post('/followQuestion')
    .send({ 'email': 'akhileshwar.r1@gmail.com','id':'199'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            expect(response.status).to.be.equal(200);
            done();
    });
  });

});
