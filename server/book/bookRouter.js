'use strict';
const router = require('express').Router();
//const passport = require('passport');

let bookController = require('./bookController.js');

//#swathi Add the ToC to the database
router.post('/saveToc', bookController.saveToc);
router.get('/getDomains',bookController.getDomains)
router.get('/getTocs',bookController.getTocs)
router.post('/getDomainTocs',bookController.getDomainTocs)
//router.post('/updateLikes',bookController.updateLikes)
router.post('/updateRating',bookController.updateRating)



module.exports = router;
