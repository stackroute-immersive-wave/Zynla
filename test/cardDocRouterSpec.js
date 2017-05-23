const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
// const app = require('../bin/www');
const carddoc = require('../server/card/carddocEntity.js');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/answers');

describe('Supertesting for CardDocRouter.........',()=>{
  it('Adding data to database(find)',(done)=>{
    url
    .post('/add')
    .send({ 'mail': 'akhileshwar.r1@gmail.com', 'type':'add','questionId':'199','content':'react'})
    .expect(200)
    .end(function(err, response){
            if (err) return done(err);
            done();
  });
          });
          });
