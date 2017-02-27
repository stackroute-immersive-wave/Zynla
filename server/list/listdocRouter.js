'use strict';
const router = require('express').Router();
const listCtrl = require('./listdocController');

router.post('/add', listCtrl.addList);
router.get('/', listCtrl.viewList);
router.post('/invite', listCtrl.inviteFrnds);

module.exports = router;
