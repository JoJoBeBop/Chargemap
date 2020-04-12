'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
  async (username, password, done) => {
    console.log("pass.js: " + username, password);
    try {
      const user = await userModel.findOne({username});

      if (user === null || undefined) {
        return done(null, false, {message: "Incorrect email (or something else)."});
      }

      const validate = await bcrypt.compare(password, user.password);
      if (!validate) {
        return done(null, false, {message: 'Incorrect password.'});
      }

      const strippedUser = {
        id: user.id,
        email: user.email,
        name: user.name
      }

      return done(null, strippedUser, {message: "Logged In Successfully"});
    }
    catch (err) {
      return done(err);
    }
  }));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'asd123',
  },
  async (jwtPayload, done) => {
    console.log('payload', jwtPayload);
    const user = await userModel.findById(jwtPayload._id);
    console.log('pl user', user);
    if (user) {
      const strippedUser = {
        id: user.id,
        email: user.email,
        name: user.name
      }
      console.log('str user', strippedUser);
      return done(null, strippedUser);

    } else {
      return done(null, false);
    }
  },
));


module.exports = passport;
