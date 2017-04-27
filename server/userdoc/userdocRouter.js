'use strict';
// const logger = require('./../../applogger');
const router = require('express').Router();
const userDocController = require('./userdocController');
var multer = require('multer');
var path = require('path');
//const userProfilePicture = require('./userprofilepicture');
router.post('/uploadImage', userDocController.changeProfilePicture);
// route for adding user
router.post('/add', userDocController.addUser);
// route for Update Education of user
router.post('/updateEdu', userDocController.updateEducation);
// route for Update Location of user
router.post('/updateLoc', userDocController.updateLocation);
// route for Update Profile of user
router.post('/updatePro', userDocController.updateProfile);
// route to get profile of user
router.post('/getuserprofile', userDocController.getUserprofile);
// route for getting all details of user
router.get('/getallusers', userDocController.getallusers);
// route for retrieving Questions posted by user
router.post('/getQuestions', userDocController.getQuestions);
// route for retrieving Answers posted by user
router.post('/getAnswers', userDocController.getAnswers);
// route for retrieving interestCategory of user
router.post('/getInterestedTopics', userDocController.getInterestedTopics);
// route for retrieving followers of user
router.post('/getFollowers', userDocController.getFollowers);
// route for retrieving followings of user
router.post('/getFollowing', userDocController.getFollowings);
router.post('/addProfile', userDocController.addProfile);
router.post('/getWatching', userDocController.getWatchingTopics);
// to get user answer Ids
router.post('/getuserAnsId', userDocController.getuserAnsId);
//#Malar 27-4-2017{route for updating profile picture,multer for storing picture in server}
var imageArray = '';
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './webserver/pictures/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    imageArray=file.originalname;
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });
router.post('/upload', upload.any('IMG'), function(req, res, next){
  var uploadedImages = imageArray;
  imageArray = '';
  res.send(uploadedImages);
});
module.exports = router;
