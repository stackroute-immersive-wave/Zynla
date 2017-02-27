const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const users = require('../users/userEntity');
// const connectFlash = require('connect-flash');
const configAuth = require('../config/auth');
passport.use(new LocalStrategy(function(username, password, cb) {
/* eslint-disable*/
 users.findOne({'username': username}, function(err, user) {
 /* eslint-enable*/
   if (err) { return cb(err); }
   if (!user) {return cb(null, false); }
   if (user.password !== password) {return cb(null, false); }
   return cb(null, user);
 });
}));

passport.serializeUser(function(user, done) {
 // console.log('serializeUser');
 done(null, user);
});

passport.deserializeUser(function(id, done) {
// console.log('deserializeUser');
users.findById(id, function(err, user) {
 done(err, user);
});
});

// Log in Via Application
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
    }, function(req, email, password, done) {
        process.nextTick(function() {
            users.findOne({
                'local.email': email
            }, function(err, user) {
                if (err) {
                    return done(err);
                } else if (!user) {
                    // console.log(user);
                    const error = new Error('Your Email ID is not registered');
                    error.name = 'You have not Registered Yet! Please Sign Up first';
                    return done(error.name);
                } else if (!user.local.isEmailVerified) {
                    // console.log(user);
                    const error = new Error('Email ID is not Verified');
                    // console.log(user.local.isEmailVerified+'fhf')
                    error.name = 'Please verify your registered mail!';
                    return done(error.name);
                } else if (!user.validPassword(password)) {
                    // console.log(user);
                    const error = new Error('Incorrect password');
                    error.name = 'Please enter correct password!';
                    return done(error.name);
                    /* eslint-disable*/
                } else {
                  // console.log(user);
                    let userData = {};
                    // let image= user.local.photos;
                    // console.log(image);
                    userData._id = user._id;
                    userData.email = user.local.email;
                    userData.firstname = user.local.firstname;
                    userData.lastname = user.local.lastname;
                    userData.name = user.local.name;
                    userData.authType = user.local.authType;
                    userData.localType = user.local.localType;
                    userData.photos = user.local.photos;
                    userData.token = users.generateToken(userData.email);
                    // console.log(userData.photos);
                    user.update({
                        'local.email': userData.email
                    }, {
                        $set: {
                            'local.loggedinStatus': true
                        }
                    }, function() {
                        if (err) {
                            // console.log('status not updated');
                        } else {
                            // console.log('LoginStatus updated Successfully');
                        }
                    });
                    // console.log(userData);
                    return done(null, userData);
                }
                /* eslint-enable*/
            });
        });
    }));
/*eslint-disable */
var fbStrategy = configAuth.facebookAuth;
    String.prototype.capitalize = function(){
       return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){return p1+p2.toUpperCase(); });
      };
      /*eslint-enable */
    fbStrategy.passReqToCallback = true;
    passport.use(new FacebookStrategy(fbStrategy, function(req,
    token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function() {
            // check if the user is already logged in
            if (!req.user) {
                users.findOne({
                    'facebook.id': profile.id
                /* eslint-disable*/
                }, function(err, user) {
                /* eslint-enable*/
                    if (err)
                    {
                        return done(err);
                    }
                    if (user) {
                        // if there is a user id already but no token
                        if (!user.facebook.token) {
                          user.facebook.token = token;
                            user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                            user.facebook.name =
                            profile.displayName.toLowerCase().capitalize();
                            user.facebook.photos = profile.photos[0].value;
                            user.facebook.authType = 'facebook';
                            user.save(function() {
                                if (err) {
                                    return done(err);
                                }
                                return done(null, user);
                            });
                        }
                        return done(null, user);
                        // user found, return that user
                    }
                    /* eslint-disable*/
                    else {
                    /* eslint-enable*/
                        // if there is no user, create them
                        /*eslint-disable */
                        var newUser = new users();
                        /*eslint-enable */
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.email = (profile.emails[0].value || '').toLowerCase();
                          newUser.facebook.name =
                          profile.displayName.toLowerCase().capitalize();
                          newUser.facebook.photos = profile.photos[0].value;
                          newUser.facebook.authType = 'facebook';
                        newUser.save(function() {
                            if (err)
                            {
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });
            }
            else {
                // user already exists and is logged in, we have to link accounts
                /*eslint-disable */
                var user = req.user;
                /*eslint-enable */
                // pull the user out of the session
                user.facebook.id = profile.id;
                user.facebook.token = token;
                  // user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                  user.facebook.email = (profile.emails[0].value || '').toLowerCase();
                  user.facebook.name = profile.displayName.toLowerCase().capitalize();
                  user.facebook.photos = profile.photos[0].value;
                  user.facebook.authType = 'facebook';
                user.save(function(err) {
                    if (err) {
                        return done(err);
                    }
                    return done(null, user);
                });
                return;
            }
        });
    }));
passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback: true
},
/* eslint-disable*/
function(req, token, refreshToken, profile, done) {
/* eslint-enable*/
    // asynchronous
    // console.log(profile);
    process.nextTick(function() {
        // check if the user is already logged in
        if (!req.user) {
            /* eslint-disable*/
            users.findOne({ 'google.id': profile.id }, function(err, user) {
            /* eslint-enable*/
                if (err) {
                    return done(err);
                }
                if (user) {
                    if (!user.google.token) {
                        user.google.token = token;
                        user.google.name = profile.displayName.toLowerCase().capitalize();
                        user.google.photos = profile.photos[0].value;
                        user.google.email = (profile.emails[0].value || '').toLowerCase();
                        // pull the first email
                        user.google.authType = 'google';
                        user.save(function(err1) {
                            if (err1) {
                                return done(err1);
                            }
                            return done(null, user);
                        });
                    }
                    return done(null, user);
                }
                /* eslint-disable*/
                else {
                /* eslint-enable*/
                    /* eslint-disable*/
                    var newUser = new users();
                    /* eslint-enable*/
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name = profile.displayName.toLowerCase().capitalize();
                    newUser.google.photos = profile.photos[0].value;
                    newUser.google.email = (profile.emails[0].value || '').toLowerCase();
                    // pull the first email
                    newUser.google.authType = 'google';
                    /* eslint-disable*/
                    newUser.save(function(err) {
                    /* eslint-enable*/
                        if (err) {
                            return done(err);
                        }
                        return done(null, newUser);
                    });
                }
            });
        }
        else {
            // user already exists and is logged in, we have to link accounts
            /* eslint-disable*/
            var user = req.user;
            /* eslint-enable*/
            // pull the user out of the session
            user.google.id = profile.id;
            user.google.token = token;
            user.google.name = profile.displayName.toLowerCase().capitalize();
            user.google.photos = profile.photos[0].value;
            user.google.email = (profile.emails[0].value || '').toLowerCase();
            // pull the first email
            user.google.authType = 'google';
            user.save(function(err) {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        }
    });
}));
// passport.use(new FacebookStrategy({
//     clientID: configAuth.facebookAuth.clientID,
//     clientSecret: configAuth.facebookAuth.clientSecret,
//     // profileFields: ['id', 'displayName', 'email'],
//     callbackURL: configAuth.facebookAuth.callbackURL
//   },
//   function(req,accessToken, refreshToken, profile, done) {
//   	process.nextTick(function(){

//     users.findOne({'facebook.id': profile.id}, function(err, user) {

//       if (err) {
//       	return done(err);
//       }
//       else if(user)
//       {
//       done(null, user);
//       }
//       else
//       {
//       	var newUsers = new users();
//       	newUsers.facebook.id = profile.id;
//       	newUsers.facebook.token = accessToken;
//       	newUsers.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
//       	newUsers.facebook.email = profile.emails[0].value;
//       	console.log(newUsers);

//       	newUsers.save(function(err)
//       	{
//       		if(err)
//       		{
//       			throw err;
//       		}
//       		else
//       		{
//       			return done(err,newUsers);
//       		}
//       	})

//       }
//     })
// });
//   }
// ));
module.exports = passport;
