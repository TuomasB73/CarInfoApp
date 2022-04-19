'use strict';
import passport from 'passport';
import Strategy from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../models/user';

passport.use(
  new Strategy(async (username, password, done) => {
    console.log('localstrategy', username, password);
    // get user by username (email) from user model
    const user = await User.findOne({ username });
    // if user is undefined
    if (!user) {
      return done(null, false, 'user not found');
    }
    // if passwords don't match
    if (!(await bcrypt.compare(password, user.password))) {
      return done(null, false, 'password incorrect');
    }
    // if all is ok convert document to object
    const strippedUser = user.toObject();
    delete strippedUser.password;
    return done(null, strippedUser);
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ls4nv7j5n8le6g',
    },
    (payload, done) => {
      console.log('jwt payload', payload);
      done(null, payload);
    }
  )
);

export default passport;
