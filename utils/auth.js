'use strict';
import jwt from 'jsonwebtoken';
import passport from '../utils/pass';

const login = (req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      console.log('login', err, user, info);
      if (err || !user) {
        reject(info.message);
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          reject(err);
        }
        const token = jwt.sign(req.user, 'ls4nv7j5n8le6g');
        resolve({ ...user, token, id: user._id });
      });
    })(req);
  });
};

const checkAuth = (req) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        resolve(false);
      }
      resolve(user);
    })(req);
  });
};

export { checkAuth, login };
