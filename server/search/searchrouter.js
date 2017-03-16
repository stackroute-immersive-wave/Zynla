'use strict';
const router = require('express').Router();
const searchCtrl = require('./searchcontroller');
router.post('/getquestions', searchCtrl.getQuestions);
router.post('/getpeople', searchCtrl.getPeople);
router.post('/getconcepts', searchCtrl.getConcepts);
router.post('/followuser', searchCtrl.followUser);
router.post('/isfollow', searchCtrl.isFollow);
router.post('/isfollowtopic', searchCtrl.isFollowTopic);
router.post('/followtopic', searchCtrl.followTopic);
router.post('/getuserprofile', searchCtrl.getuserprofile);
module.exports = router;
