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
      const newReview = new Review(args);
      return newReview.save();
    },
  },
};
