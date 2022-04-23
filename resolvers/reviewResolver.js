import { AuthenticationError } from 'apollo-server-express';
import Review from '../models/review';

export default {
  Query: {
    getAllReviewsByCarId: async (parent, args) => {
      return await Review.find(args);
    },
    getReviewById: async (parent, args) => {
      return await Review.findById(args.id);
    },
  },
  Mutation: {
    addReview: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      const newReview = new Review({ ...args, user: context.user._id });
      return newReview.save();
    },
    modifyMyReview: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      return await Review.findOneAndUpdate(
        { _id: args.id, user: context.user._id },
        args,
        { new: true }
      );
    },
    deleteMyReview: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      return await Review.deleteOne({ _id: args.id, user: context.user._id });
    },
  },
};
