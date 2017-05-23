const should = require('chai').should();
const supertest = require('supertest');
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai').expect;
const logger = require('./../applogger');
// const app = require('../bin/www');
const listDoc = require('../server/list/listdocEntity');
var app = require('../server/service.js');
const url = supertest('http://localhost:8080/list');

describe('Supertesting for ListDocs.........', () => {

    it('Update likes for questions(save)', (done) => {
        url
        .post('/updateLike')
        .send({'id': '11111111', 'upVotes': '11111111111111', 'email': 'aaaaaaaaaa@gmail.com', 'type': 'add'})
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);

            //logger.debug(res);
            expect(res.text).to.be.equal("success");
            done();
        });
    });
});

describe('Supertesting for ListDocs.........', () => {
    it('Update Dislikes for questions(save)', (done) => {
        url
        .post('/updateunlike')
        .send({id: '2222222', downVotes: '222222222', email: 'bbbbbbbbbbbbb@gmail.com', type: 'jknjn'})
        .expect(200)
        .end(function(err, res) {
            //logger.debug(res);
            if (err)
                return done(err);
            expect(res.text).to.be.equal("success");
            done();
        });
    });
});
describe('Supertesting for ListDocs.........', () => {
    it('Update Views for questions(save)', (done) => {
        url
        .put('/updateviews')
        .send({'id': '333333333', 'views': '33333333'})
        .expect(200)
        .end(function(err, res) {
            //logger.debug(res);
            if (err)
                return done(err);
            expect(res.text).to.be.equal("");
            done();
        });
    });
});
describe('Supertesting for ListDocs.........', () => {
    it('should get Question Concept(find)', (done) => {
        url
        .post('/getQuestionConcept')
        .send({'intent': 'list'})
        .expect(200)
        .end(function(err, response) {
            var str = response.text;
            var arr = JSON.parse(str);
            if (err)
                return done(err);
            expect(arr[0]).to.be.equal("list");
            done();
        });
    });
});
describe('Supertesting for ListDocs.........', () => {
    it('nlp(find)', (done) => {
        url
        .post('/nlp')
        .send({'val': 'what is react?'})
        .expect(200)
        .end(function(err, res) {
            var str = res.text;
            var arr = JSON.parse(str);
            if (err)
                return done(err);
            expect(arr.intentsArr[0]).to.be.equal("definition");
            done();
        });
    });
});

    describe('Supertesting for ListDocs.........', () => {
    it('viewing List(find)', (done) => {
        url
        .get('/')
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.status).to.be.equal(200);
            done();
        });
    });
});
    describe('Supertesting for ListDocs.........', () => {
    it('should Update Acceptans(update)', (done) => {
        url
        .post('/UpdateAcceptans')
        .expect(200)
        .send({'id':'111','questionId':'249','email':'zynlatesting1@gmail.com'})
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.text).to.be.equal('success');
            done();
        });
    });
});
    describe('Supertesting for ListDocs.........', () => {
    it('should get Id With Question(get)', (done) => {
        url
        .get('/getIdWithQuestion')
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.ok).to.be.equal(true);
            done();
        });
    });
  });

    describe('Supertesting for ListDocs.........', () => {
    it('should get Question Intent(get)', (done) => {
        url
        .get('/getQuestionIntent')
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.ok).to.be.equal(true);
            done();
        });
    });
});
    describe('Supertesting for ListDocs.........', () => {
    it('should get concepts(get)', (done) => {
        url
        .get('/getconcepts')
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.ok).to.be.equal(true);
            done();
        });
    });
});

    describe('Supertesting for ListDocs.........', () => {
    it('should get Images(get)', (done) => {
        url
        .get('/getImages')
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.body[0]).to.be.equal('react');
            done();
        });
    });

});
    describe('Supertesting for ListDocs.........', () => {
    it('should update comment(get)', (done) => {
        url
        .put('/updatecomment')
        .send({'mail':'zynlatesting1@gmail.com','questionId':'249','content':'react'})
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            done();
        });
    });
  });
    describe('Supertesting for ListDocs.........', () => {
    it('should add answer Comment(put)', (done) => {
        url
        .put('/addanswerComment')
        .send({'email':'zynlatesting1@gmail.com','answerId':'249','content':'react'})
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.status).to.be.equal(200);
            done();
        });
    });
});

    describe('Supertesting for ListDocs.........', () => {
    it('should create Report(post)', (done) => {
        url
        .post('/createReport')
        .send({'email':'zynlatesting1@gmail.com','id':'249','content':'react','type':'add'})
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.status).to.be.equal(200);
            done();
        });
    });
});
    describe('Supertesting for ListDocs.........', () => {

    it('should change Popup(post)', (done) => {
        url
        .post('/changePopup')
        .send({'email':'zynlatesting1@gmail.com','id':'249'})
        .expect(200)
        .end(function(err, res) {
            if (err)
                return done(err);
            expect(res.text).to.be.equal("add");
            done();
        });
    });


});
