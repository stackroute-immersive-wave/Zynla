// const chai = require('chai');
// const should = require("chai").should(),
// assert = require ("chai").assert,
// supertest = require("supertest"),
// app = require("../bin/www");
// var sinon = require('sinon');
// var expect = chai.expect;
// var mongoose = require('mongoose');
// require('sinon-mongoose');

// //Importing our resturant model for our unit testing.
// var Resturant = require('../server/resturant/resturantEntity.js');

// var url = supertest("http://localhost:8080");

// describe("Get all resturants", function(){
//          // Test will pass if we get all resturants
//         it("should return all resturants", function(done){
//             var ResturantMock = sinon.mock(Resturant);
//             var expectedResult = {status: true, res: []};
//             ResturantMock.expects('find').yields(null, expectedResult);
//             Resturant.find(function (err, result) {
//                 ResturantMock.verify();
//                 ResturantMock.restore();
//                 expect(result.status).to.be.true;
//                 done();
//             });
//         });

//         // Test will pass if we fail to get a resturant
//         it("should return error", function(done){
//             var ResturantMock = sinon.mock(Resturant);
//             var expectedResult = {status: false, error: "Something went wrong"};
//             ResturantMock.expects('find').yields(expectedResult, null);
//             Resturant.find(function (err, result) {
//                 ResturantMock.verify();
//                 ResturantMock.restore();
//                 expect(err.status).to.not.be.true;
//                 done();
//             });
//         });
//     });
// // Test will pass if the resturant is saved
//     describe("Post a new resturant", function(){
//         it("should create new post", function(done){
//             var ResturantMock = sinon.mock(new Resturant({ res: 'Save new resturant from mock'}));
//             var res = ResturantMock.object;
//             var expectedResult = { status: true };
//             ResturantMock.expects('save').yields(null, expectedResult);
//             res.save(function (err, result) {
//                 ResturantMock.verify();
//                 ResturantMock.restore();
//                 expect(result.status).to.be.true;
//                 done();
//             });
//         });
//         // Test will pass if the resturant is not saved
//         it("should return error, if post not saved", function(done){
//             var ResturantMock = sinon.mock(new Resturant({ res: 'Save new resturant from mock'}));
//             var res = ResturantMock.object;
//             var expectedResult = { status: false };
//             ResturantMock.expects('save').yields(expectedResult, null);
//             res.save(function (err, result) {
//                 ResturantMock.verify();
//                 ResturantMock.restore();
//                 expect(err.status).to.not.be.true;
//                 done();
//             });
//         });
//     });
// // Test will pass if the resturant is updated based on an ID
//   describe("Update a new resturant by id", function(){
//     it("should updated a resturant by id", function(done){
//       var ResturantMock = sinon.mock(new Resturant({ comments: "updated"}));
//       var res = ResturantMock.object;
//       var expectedResult = { status: true };
//       ResturantMock.expects('save').withArgs({_id: 2}).yields(null, expectedResult);
//       res.save({_id:2},function (err, result) {
//         ResturantMock.verify();
//         ResturantMock.restore();
//         expect(result.status).to.be.true;
//         done();
//       });
//     });
//     // Test will pass if the resturant is not updated based on an ID
//     it("should return error if update action is failed", function(done){
//       var ResturantMock = sinon.mock(new Resturant({ comments: "updated"}));
//       var res = ResturantMock.object;
//       var expectedResult = { status: false };
//       ResturantMock.expects('save').withArgs({_id: 2}).yields(expectedResult, null);
//       res.save({_id:2},function (err, result) {
//         ResturantMock.verify();
//         ResturantMock.restore();
//         expect(err.status).to.not.be.true;
//         done();
//       });
//     });
//   });
// // Test will pass if the resturant is deleted based on an ID
//     describe("Delete a resturant by id", function(){
//         it("should delete a resturant by id", function(done){
//             var ResturantMock = sinon.mock(Resturant);
//             var expectedResult = { status: true };
//             ResturantMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
//             Resturant.remove({_id: 12345}, function (err, result) {
//                 ResturantMock.verify();
//                 ResturantMock.restore();
//                 expect(result.status).to.be.true;
//                 done();
//             });
//         });
//         // Test will pass if the resturant is not deleted based on an ID
//         it("should return error if delete action is failed", function(done){
//             var ResturantMock = sinon.mock(Resturant);
//             var expectedResult = { status: false };
//             ResturantMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
//             Resturant.remove({_id: 12345}, function (err, result) {
//                 ResturantMock.verify();
//                 ResturantMock.restore();
//                 expect(err.status).to.not.be.true;
//                 done();
//             });
//         });
//     });
