'use strict';
const logger = require('./../../applogger');
const router = require('express').Router();

const User = require('./userEntity');
const UserProfile = require('./userProfileEntity').userModel;
const passport = require('passport');
const nodemailer = require('nodemailer');
let neo4j = require('neo4j-driver').v1;
let driver = neo4j.driver('bolt://192.168.56.1', neo4j.auth.basic('neo4j', '9455338161'));
let session = driver.session();
// const RegisteredUser = require('./userEntity');
// const Strategy = require('passport-local').Strategy;
// const userCtrl = require('./userController');
/*eslint-disable */
var rand,
        mailOptions,
        host,
        link,
        VIDcheck;
/*eslint-enable */

// function isLoggedIn(req, res, next) {
// if (req.isAuthenticated()) {
//     return next();
// }
// res.redirect('/#/');
// }

router.post('/add', function(req, res) {
    logger.debug('Inside user post');
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save().then(()=>{
      // console.log('Insertion success',doc);
      res.send('insertion success');
    }, (err)=>{
      // console.log(err);
      res.send(err, 'not saved');
    });

    // let user = req.body;
    // res.send('Hello '+user);
});


// Get details of all user in the system
router.get('/', function(req, res) {
  // console.log('Inside get');
   User.find({_id: '58a1897ec9c1754be2ceb915'}).then((docs) => {
        res.send({
            docs
        });
    }, (err) => {
        res.send('Cant get the docs', err);
    });
  });

// Login
router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
        // console.log('ttttttttttt');
        res.cookie('token', req.user);
        res.cookie('username', req.user.name);
        res.cookie('authType', req.user.authType);
        res.cookie('profilepicture', req.user.photos);
        res.send(req.user);
    });

// SEND EMAIL
/*eslint-disable */
    var host,
        link,
        mailOptions;
/*eslint-enable */
router.post('/send', function handleSayHello(req, res) {
        // console.log(req.body.data);
        User.find({
            email: req.body.data
        }, function(err, profile) {
            if (err) {
                res.send(err);
              //  console.log('error ocuured');
            } else {
                /*eslint-disable */
                var transporter = nodemailer.createTransport({
                    /*eslint-disable */
                    service: 'Gmail',
                    secure: false,
                    auth: {
                        user: 'zynla0001@gmail.com', // Your email id
                        pass: 'Zynla@123' // Your password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                host = req.get('host');
                console.log(profile);
                /*eslint-disable */
                // var hashVID = bcrypt.hashSync(profile[0].local.verificationID, 10);
                var VID = profile[0].generateHashVID(profile[0].verificationID);
                /*eslint-enable */
                VIDcheck = VID;
                // var linkEmail = profile[0].generateHashEmail(profile[0].local.email);
                console.log(VID + ' is the VID');
                link = 'http://' + req.get('host') + '/users/verify?id=' + VID + '&email=' + profile[0].email;
                var text = 'Hello from \n\n' + req.body.data;
                mailOptions = {
                    from: 'geniegenie0001@gmail.com', // sender address
                    to: profile[0].email, // list of receivers
                    subject: 'Verify your Email with Genie', // Subject line
                    text: text,
                    html: '<center><h1>Welcome to Zynla</h1></center><br><br><br>'+
                    'Hi,<br><br>To complete Signup Click on the button to verify yourself.'+
                    '<br><br><br><a href=' + link + ' style=background-color:#44c767;'+
                    '-moz-border-radius:28px;-webkit-border-radius:28px;border-radius:28px;'+
                    'border:1px solid #18ab29;display:inline-block;padding:16px 31px;'+
                    'color:#ffffff;text-shadow:0px 1px 0px #2f6627;'+
                    'text-decoration:none;> Verify </a><br><br>'+
                    '<i>This link is valid for an hour.This is an Auto-generated mail,'+
                    'please do not reply</i></small>'
                };
                console.log(mailOptions + host);
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        console.log('Error')
                    } else {
                        console.log('Message sent: ' + info.response);
                        res.json({yo: info.response});
                    }
                });
            }
        });

    });


// LOCAL SIGN UP
    router.post('/signup', function(req, res) {
        let newUser = new User();
        // let newProfileUser = new UserProfile();
        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }
        rand = Math.floor((Math.random() * 100) + 54);
        newUser.verificationID = rand;
        // newProfileUser.id = rand;
        // newProfileUser.emailId = req.body.email;
        newUser.name = (req.body.firstName.toLowerCase().capitalizeFirstLetter() + ' ' + req.body.lastName.toLowerCase().capitalizeFirstLetter());
        newUser.email = req.body.email;
        // newProfileUser.emailId = req.body.email;
        newUser.password = User.generateHash(req.body.password);
        newUser.localType = 'Customer';
        newUser.authType = 'local';
        newUser.loggedinStatus = false;
        newUser.isEmailVerified = false;
        newUser.photos = 'defultImage.jpg';
        newUser.isnew = 'Y';
        res.cookie('profilepicture', newUser.photos);
        newUser.save(function(err) {
            if (err) {
                res.send('Error in registration');
            } else {
                res.send('Successfully registered');
            }
        });
    });


// Updated in UserProfile
    router.post('/userProfileData', function(req, res) {
        let newProfileUser = new UserProfile();
        rand = Math.floor((Math.random() * 100) + 54);
        newProfileUser.id = rand;
        newProfileUser.emailId = req.body.email;
        newProfileUser.save(function(err) {
            if (err) {
                res.send('Error in registration');
            } else {
                res.send('Successfully registered');
            }
        });
    });




// VIRIFY EMAIL ID
    router.get('/verify', function(req, res) {
        console.log('hiii');
        let checkID = req.query.id;
        let checkMail = req.query.email;
        User.find({
            'local.email': req.query.email
        }, function(err, profile) {

            if (err) {
                res.send(err);
                console.log('error occured');
            } else {
                console.log(req.protocol + ':/' + req.get('host') + ':' + ('http://' + host));
                if ((req.protocol + '://' + req.get('host')) == ('http://' + host)) {
                    console.log('Domain is matched. Information is from Authentic email');
                    if (checkID == VIDcheck) {
                        console.log('email is verified');
                        User.update({
                            'email': req.query.email
                        }, {
                            $set: {
                                'isEmailVerified': true,
                                'verificationID': 0
                            }
                        }, function(err) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Account Verified and Changed to true');
                            }
                        });
                        res.cookie('email',req.query.email);
                        var query = 'create (n:User {name : "'+req.query.email+'"})';
                        session.run(query);
                        res.redirect('/#/successfullyregistered');
                    } else {
                        console.log('email is not verified');
                        //res.end('<h1>Link expired</h1>');
                        res.redirect('/#/expiryLink');
                    }
                } else {
                    console.log('email is not verified');
                    //res.end('<h1>Link expired</h1>');
                    res.redirect('/#/expiryLink');
                }
            }
        });
        // User.update({"email":checkMail}, {"isEmailVerified":true}, function(err){
        //     if(err) {
        //         res.send("Error"+err);
        //     }
        //     else {
        //         res.send(" Success "+ checkMail);
        //     }
        // });
    });

   router.delete('/deleteuser', function(req, res) {
        let request = req.body.data;
        console.log(request);
        User.remove({
            'local.email': request
        }, function(err) {
            if (err) {
                console.log('no')
                res.send('Error in deleting the data');
            } else {
                console.log('deleted')

                res.send('Data is deleted successfully');
            }
        });
    });

// Check whether user is already exist or not
    router.post('/checkuser', function(req, res) {
        let authType;
        User.find({
            'email': req.body.email
        }, function(err, profile) {
            if (profile.length) {
                console.log(profile[0].authType);
                console.log(profile.length);
                authType = profile.authType;
                res.json({'userexists': true,'authType':profile[0].authType});
            } else {
                console.log(req.body.email);
                console.log(profile.length);
                res.json({'userexists': false,'authType':authType});
            }
            if (err) {
                res.send(err);
            }
        });
    });





router.get('/logout', function(req,res){
console.log('Session deleted');
req.session.destroy();
 res.send({redirect: '/'});
});

// FACEBOOK AUTHENTICATION
router.get('/auth/facebook', passport.authenticate('facebook', {
        session: false,
        scope: 'email'
    }), (req, res) => {
        res.json(req.user);
    });

    // handle the callback after facebook has authenticated the user
    router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/#/'})
        , (req, res) => {
        res.cookie('token', req.user.token);
        res.cookie('authType', req.user.authType);
        res.cookie('username', req.user.name);
        res.cookie('profilepicture', req.user.photos);
        res.cookie('email',req.user.email);
        if(req.user.isnew ==='N')
        {
            res.redirect('/#/home');
        }
        else
        {
        var query = 'create (n:User {name : "'+req.user.email+'"})';
        session.run(query).then(function(){
            console.log("comes");
        });
            console.log(query);
            res.redirect('/#/successfullyregistered');
        }
    });


// GOOGLE AUTHENTICATION
router.get('/auth/google', passport.authenticate('google', {
        session: false,
        scope: ['email']
    }), (req, res) => {
        res.json(req.user);
    });

    // the callback after google has authorized the user
    router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/#/'}), (req, res) => {
        let user = new User();
        res.cookie('token', req.user.token);
        res.cookie('username', req.user.name);
        res.cookie('authType', req.user.authType);
        res.cookie('profilepicture', req.user.photos);
        res.cookie('email',req.user.email);
        if(req.user.isnew ==='N')
        {
            res.redirect('/#/home');
        }
        else
        {
        var query = 'create (n:User {name : "'+req.user.email+'"})';
        session.run(query).then(function(){
            console.log("comes");
        });
        console.log(query);
            res.redirect('/#/successfullyregistered');
        }
    });


router.get('/displayCatagory', function(req, res) {
    var result1 = [];
    logger.debug('Inside display catagory');
    var query = 'match (n:Domain) return n';
    session.run(query)
        .then(function(result){
            for(var x of result.records)
              result1.push(x._fields[0].properties.name);
            console.log(result1);
            res.send(result1);
        })
        .catch(function(error) {
            console.log('promise error: ', error);
        });
});

    router.post('/addCatagory', function(req, res) {
        console.log("dddddddddddddd");
        console.log(req.body);
        let arr1 = JSON.parse(req.body.catagory);
        console.log(typeof(arr1));
        console.log('got the         ',arr1);
        let newUser = new UserProfile();
        let arr = [];
        rand = Math.floor((Math.random() * 100) + 54);
        for(let y of arr1)
        {
            arr.push(y);
        }
        newUser.id=rand;
        newUser.emailId = req.body.email;
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',arr);
        newUser.interestCategory = arr;
        res.cookie('email', newUser.emailId);
        res.cookie('catagories', newUser.interestCategory);
        console.log(arr);
        newUser.save(function(err) {
            if (err) {
                res.send('Error in registration');
            } else {
                console.log("inside successfullyregistered function 11111111111");
                res.send('Successfully registered');
            }  
        });
        // res.redirect('/#/home');
    });

    router.put('/updateIsNew/:emails',function(req,res)
    {
        let isNew = req.body.isNew;
            console.log(isNew);
            User.findOne({'email':req.params.emails}, function(err,users){
              users.isnew = isNew;
              users.save(function(){
                if(err) {
                    console.log("error occured in update")
                }
                // console.log("updated successfully");
                res.send('updated successfully');
              });
            });
    });
// router.get('/auth/facebook', passport.authenticate('facebook',
//   {session: false,
//   scope : ['email']
// }),function(req, res){
//         res.send(200);
//     });


// router.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {failureRedirect: '/' },
//     (req, res) => {
//       console.log(req);
//         res.cookie('token', req.user.facebook.token);
//         res.cookie('authType', req.user.facebook.authType);
//         res.cookie('name', req.user.facebook.name);
//         res.cookie('email', req.user.facebook.email);
//         res.redirect('/#/home');
//     })
//   );

module.exports = router;
