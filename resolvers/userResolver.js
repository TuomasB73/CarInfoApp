import bcrypt from 'bcrypt';
import User from '../models/user';
import { login } from '../utils/auth';

export default {
  Review: {
    async user(parent, args) {
      console.log('user', parent);
      return await User.findById(parent.user);
    },
  },
  Picture: {
    async user(parent, args) {
      console.log('user', parent);
      return await User.findById(parent.user);
    },
  },
  Query: {
    user: async (parent, args) => {
      // find user by id
      return await User.findById(args.id);
    },
    login: async (parent, args, { req }) => {
      // get username and password from query and add to req.body for passport
      req.body = args;
      return await login(req);
    },
  },
  Mutation: {
    registerUser: async (parent, args) => {
      try {
        const hash = await bcrypt.hash(args.password, 12);
        const userWithHash = {
          ...args,
          password: hash,
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        return result;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
