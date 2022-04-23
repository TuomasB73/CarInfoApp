import { AuthenticationError } from 'apollo-server-express';
import Like from '../models/like';

export default {
  Query: {
    getAllLikesByPictureId: async (parent, args) => {
      return await Like.find(args);
    },
    getLikeByPictureAndUserIds: async (parent, args) => {
      return await Like.findOne(args);
    },
  },
  Mutation: {
    addLike: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      const existingLike = await Like.findOne(args);
      if (existingLike != null) {
        throw new Error('This user has already liked this picture');
      }
      const newLike = new Like(args);
      return newLike.save();
    },
    deleteLike: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      const existingLike = await Like.findOne(args);
      if (existingLike == null) {
        throw new Error('This like does not exist');
      }
      return await Like.deleteOne(args);
    },
  },
};
