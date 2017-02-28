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
     // console.log(err);
     res.send(err, 'not saved');
   });

   // let user = req.body;
   // res.send('Hello '+user);
});

router.post('/updateEdu', function(req, res) {
        let primary = req.body.primary;
        let highSchool = req.body.highSchool;
        let university = req.body.university;
        UserModel.update({
            emailId: 'rag@123.com'
        }, {
            $set: {
                'profile.education.primary': primary,
                'profile.education.highSchool': highSchool,
                'profile.education.university': university
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }
            res.send('Updated education successfully');
        });
    });

router.post('/updateLoc', function(req, res) {
        let Line1 = req.body.Line1;
        let Line2 = req.body.Line2;
        let country = req.body.country;
        let region = req.body.region;
        let city = req.body.city;
        let postalCode = req.body.postalCode;
        UserModel.update({
            emailId: 'rag@123.com'
        }, {
            $set: {
                'profile.address.Line1': Line1,
                'profile.address.Line2': Line2,
                'profile.address.country': country,
                'profile.address.region': region,
                'profile.address.city': city,
                'profile.address.postalCode': postalCode
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }
            res.send('Updated location successfully');
        });
    });

router.post('/updatePro', function(req, res) {
        let picture = req.body.picture;
        let description = req.body.description;
        let dob = req.body.dob;
        let gender = req.body.gender;
        let phone = req.body.phone;
        UserModel.update({
            emailId: 'rag@123.com'
        }, {
            $set: {
                'profile.picture': picture,
                'profile.description': description,
                'profile.dob': dob,
                'profile.gender': gender,
                'profile.phone': phone
            }
        }, function(err) {
            if (err) {
                res.send('Error:' + err);
            }
            res.send('Updated userinfo successfully');
        });
    });

router.get('/getuserprofile', function(req, res) {
 // console.log('Inside get');
  UserModel.find(function() {
  // console.log('comes');
  }).then((docs) => {
       res.send(docs);
   }, (err) => {
       res.send('Cant get the docs', err);
   });
 });
// router.post('/addProfileEducation', userdocController.add);

// router.post('/find', userdocController.find);
//
// router.post('/update', userdocController.update);
// router.post('/login',passport.authenticate('local', {
//       failureFlash: 'Invalid Username and Password',
//       successFlash: 'Welcome to foodie App'
//    }),userdocController.login);
//
// router.get('/logout', userdocController.logout);
//
//
// router.delete('/delete', function(req, res){
// 	logger.debug('Inside user post');
// 	let db= new user(req.body);
// 	db.delete();
// 	db.send('Added successfully');
// 	})
// logger.debug('Received request'+JSON.stringify(req.body));
// if(req.body)
// {
//   let user = new UserModel(req.body);
//   user.save(function(err){
//   if(err){
//     res.send(err);
//   }
//   else{
//      res.json({message:'User saved successfully'});
//   }
//   });
// }
//
// Get details of all users in the system
module.exports = router;
