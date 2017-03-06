'use strict';
const router = require('express').Router();
const listCtrl = require('./listdocController');

router.post('/add', listCtrl.addList);
router.get('/', listCtrl.viewList);
router.post('/invite', listCtrl.inviteFrnds);
router.post('/addquestion', listCtrl.addquestion);
router.put('/updateviews', listCtrl.updateviews);
router.get('/:id', listCtrl.getQuestion);
router.get('/suggestQues/:id', listCtrl.suggestQues);

module.exports = router;
