const passport = require('passport');
const UserModel = require('../../models/index').User;
const config =require('../../config.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


/*
  Local Strategy
  Verify usename and password,
  call done with user else call done with false
*/
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  UserModel.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    console.log(user);
    if (!user) { return done(false); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }

      return done(null, user);
    });

  });
});


/*
  Icoming request goes through passport library
  go on to route handler if user is logged in
  Use JwtStrategy that will attempt to validate user using a Token
*/

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

/*
  Create JWT Strategy
  payload is a decoded jwtToken {sub: id, iat: timestamp}
  done is a callback that will check if user id in payload exist
  if true call done(user) else done(false)
*/
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  UserModel.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false) }
    console.log(user)
    if (user) {
      done(null, user);
    }
    else {
      done(null, false);
    }
  });
});

/*
  Tell passport to use Strategy
*/
passport.use(jwtLogin);
passport.use(localLogin);
