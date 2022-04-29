import { AuthenticationError } from 'apollo-server-express';
import Like from '../models/like';

export default {
  Query: {
    getAllLikesByPictureId: async (parent, args) => {
      return await Like.find(args);
    },
    getAllMyLikes: async (parent, args) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      return await Like.find({ user: context.user._id });
    },
  },
  Mutation: {
    addLike: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      const existingLike = await Like.findOne({
        ...args,
        user: context.user._id,
      });
      if (existingLike) {
        throw new Error('You have already liked this picture');
      }
      const newLike = new Like({ ...args, user: context.user._id });
      return newLike.save();
    },
    deleteMyLike: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      return await Like.deleteOne({ ...args, user: context.user._id });
    },
  },
};
