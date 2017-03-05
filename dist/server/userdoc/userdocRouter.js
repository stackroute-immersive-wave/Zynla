'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();
const UserModel = require('../users/userProfileEntity').userModel;

router.post('/add', function(req, res) {
   logger.debug('Inside user post');
   let newUser = new UserModel(req.body);

   newUser.save().then(()=>{
     // console.log('Insertion success', doc);
     res.send('insertion success');
   }, (err)=>{
     // console.logeg(err);
     res.send(err, 'not saved');
   });

   // let user = req.body;
   // res.send('Hello '+user);
});

router.post('/updateEdu', function(req, res) {
        UserModel.update({
            emailId: req.body.emailId
        }, {
            $set: {
                'profile.education.primary': req.body.primary,
                'profile.education.highSchool': req.body.highSchool,
                'profile.education.university': req.body.university
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }
            res.send('Updated education successfully');
        });
    });

router.post('/updateLoc', function(req, res) {
        UserModel.update({
            emailId: req.body.emailId
        }, {
            $set: {
                'profile.address.Line1': req.body.Line1,
                'profile.address.Line2': req.body.Line2,
                'profile.address.country': req.body.country,
                'profile.address.region': req.body.region,
                'profile.address.city': req.body.city,
                'profile.address.postalCode': req.body.postalCode
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }
            res.send('Updated location successfully');
        });
    });

router.post('/updatePro', function(req, res) {
        UserModel.update({
            emailId: req.body.email
        }, {
            $set: {
                'profile.picture': req.body.picture,
                'profile.description': req.body.description,
                'profile.dob': req.body.dob,
                'profile.gender': req.body.gender,
                'profile.phone': req.body.phone
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }
            res.send('Updated userinfo successfully');
        });
    });

router.post('/getuserprofile', function(req, res) {
  UserModel.findOne({emailId: req.body.email}, function() {
  // console.log('comes');
  }).then((docs) => {
       res.send(docs);
   }, (err) => {
       res.send('Cant get the docs', err);
   });
 });

 router.get('/getallusers', function(req, res) {
        UserModel.find(function(err, docs) {
            if (err) {
                res.send('Error:' + err);
            } else if (docs !== null) {
                res.send(docs);
                // res.send('Fetched restaurant successfully')
            } else {
                res.send('Read Restaurant successfully');
            }
        });
    });
    router.post('/getQuestions', function(req, res) {
        // console.log('Inside get');
        UserModel.findOne({
          emailId: req.body.email
        }, function() {

          //  console.log('comes');
        }).then((docs) => {
            res.send(docs.lists);
        }, (err) => {
            res.send('Cant get the docs', err);
        });
    });
    router.post('/getAnswers', function(req, res) {
         // console.log('Inside get');
        UserModel.findOne({
            emailId: req.body.email
        }, function() {
            // console.log('comes');
        }).then((docs) => {
            res.send(docs.answers);
        }, (err) => {
            res.send('Cant get the docs', err);
        });
    });
    router.post('/getInterestedTopics', function(req, res) {
      UserModel.findOne({
          emailId: req.body.email
      }, function() {
          // console.log('comes');
      }).then((docs) => {
          res.send(docs.interestCategory);
      }, (err) => {
          res.send('Cant get the docs', err);
      });
        });
module.exports = router;
