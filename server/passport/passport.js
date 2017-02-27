const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const users = require('../users/userEntity');
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
 done(null, user);
});

passport.deserializeUser(function(id, done) {
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
                email: email
            }, function(err, user) {
                if (err) {
                    return done(err);
                } else if (!user) {
                    // console.log(user);
                    const error = new Error('Your Email ID is not registered');
                    error.name = 'You have not Registered Yet! Please Sign Up first';
                    return done(error.name);
                } else if (!user.isEmailVerified) {
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
                    userData.email = user.email;
                    userData.firstname = user.firstname;
                    userData.lastname = user.lastname;
                    userData.name = user.name;
                    userData.authType = user.authType;
                    userData.localType = user.localType;
                    userData.photos = user.photos;
                    userData.token = users.generateToken(userData.email);
                    // console.log(userData.photos);
                    user.update({
                        'email': userData.email
                    }, {
                        $set: {
                            'loggedinStatus': true
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
                     email: (profile.emails[0].value || '').toLowerCase()
                /* eslint-disable*/
                }, function(err, user) {
                /* eslint-enable*/
                    if (err)
                    {
                        return done(err);
                    }
                    if (user) {
                        // if there is a user id already but no token
                        if (!user.token) {
                          users.findOne({email: (profile.emails[0].value || '').toLowerCase()},
                            function(err1, user1)
                            {
                                user1.token = token;
                                user1.save(function(err2) {
                                if (err2) {
                                    return done(err2);
                            }
                            return done(null, user);
                        });
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
                        newUser.id = profile.id;
                        newUser.token = token;
                        newUser.email = (profile.emails[0].value || '').toLowerCase();
                        newUser.name =
                          profile.displayName.toLowerCase().capitalize();
                          newUser.photos = profile.photos[0].value;
                          newUser.authType = 'facebook';
                          newUser.isnew = 'Y';
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
                user.id = profile.id;
                user.token = token;
                  // user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                  user.email = (profile.emails[0].value || '').toLowerCase();
                  user.name = profile.displayName.toLowerCase().capitalize();
                  user.photos = profile.photos[0].value;
                  user.authType = 'facebook';
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
            users.findOne({ 'email': (profile.emails[0].value || '').toLowerCase()}, function(err, user) {
            /* eslint-enable*/
                if (err) {
                    return done(err);
                }
                if (user) {
                    if (!user.token) {
                        users.findOne({email: (profile.emails[0].value || '').toLowerCase()},
                            function(err1, user1)
                            {
                                user1.token = token;
                                user1.save(function(err2) {
                                if (err2) {
                                    return done(err2);
                            }
                            return done(null, user);
                        });
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
                    newUser.id = profile.id;
                    newUser.token = token;
                    newUser.name = profile.displayName.toLowerCase().capitalize();
                    newUser.photos = profile.photos[0].value;
                    newUser.email = (profile.emails[0].value || '').toLowerCase();
                    newUser.authType = 'google';
                    newUser.isnew = 'Y';
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
            user.id = profile.id;
            user.token = token;
            user.name = profile.displayName.toLowerCase().capitalize();
            user.photos = profile.photos[0].value;
            user.email = (profile.emails[0].value || '').toLowerCase();
            // pull the first email
            user.authType = 'google';
            user.save(function(err) {
                if (err) {
                    return done(err);
                }
                return done(null, user);
            });
        }
    });
}));

module.exports = passport;

