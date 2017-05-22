//'use strict';
const router = require('express').Router();
const passport = require('passport');
//const file = require('./server/uploadFiles');
//let uploadBookController = require('./uploadBookController.js');
const multer = require('multer');
let imageArray = '';
let storage = multer.diskStorage({
          destination : function (req, file, cb) {
            cb(null, './server/uploadFiles')
          },
          filename: function (req, file, cb) {
            /*eslint-disable*/
            let extArray = file.mimetype.split("/");
            let extension = extArray[extArray.length - 1];
            /*eslint-enable*/
            imageArray=file.originalname;
            var filename=imageArray.split('.');
            var f=filename[1];
            if(f==='docx')
            {
              console.log(imageArray);
              cb(null, imageArray);
            }
            else {

               cb(null);

           }
          }
      });

  const upload = multer({ storage: storage });

  //var imageArray = '';

//var book = exports = module.exports = {};
//let uploadBookController={
  //uploadDoc:f
     router.post('/uploadDoc',upload.any('docx'),function(req,res){
let uploadedfile = imageArray;
imageArray='';

          //res.send(uploadedfile);
         });
     // }
module.exports = router;
