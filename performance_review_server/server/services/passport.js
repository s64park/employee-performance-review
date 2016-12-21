import passport from 'passport';
import config  from '../config';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

/*
    This can be used for 3rd party OAuth authentication
    However, I created local authentication middleware by myself.
    This is so far just a piece of code for future implementation
 */

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy, payload is decoded JWT token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

const facebookOptions = {
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL,
    profileFields: ['emails', 'displayName']
};

const facebookLogin = new FacebookStrategy(facebookOptions, function(token, refreshToken, profile, done) {
   User.findOne({ 'facebook.id': profile.id }, function(err, user) {
       if (err) return done(err);
       if (!user) {
           var newUser = new User({
               facebook: {
                   id: profile.id,
                   token: token,
                   name: profile.displayName,
                   email: profile.emails[0].value
               }
           });
           //save our user to the database
           newUser.save(function(err) {
               if (err) done(err);
               return done(null, newUser);
            });
       }
       if (user) {
           // if there is a user id already but no token (user was linked at one point and then removed)
           // just add our token and profile information
           if (!user.facebook.token) {
               user.facebook.token = token;
               user.facebook.name = profile.displayName;
               user.facebook.email = profile.emails[0].value;

               user.save(function (err) {
                   if (err) done(err);
                   return done(null, user);
               });
           }
           return done(null, user);
       }
   })
});


// Tell passport to user this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);