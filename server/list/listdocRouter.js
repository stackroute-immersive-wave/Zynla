'use strict';
const router = require('express').Router();
const listCtrl = require('./listdocController');

router.post('/add', listCtrl.addList);
router.get('/', listCtrl.viewList);
<<<<<<< HEAD
router.post('/invite', listCtrl.inviteFrnds);
=======
>>>>>>> 5a3debcb4284fbb6250b6e6b20cef7d95c656e6a

module.exports = router;
