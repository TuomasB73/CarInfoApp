import { AuthenticationError } from 'apollo-server-express';
import Picture from '../models/picture';

export default {
  Query: {
    getAllPicturesByCarId: async (parent, args) => {
      return await Picture.find({ car: args.car });
    },
    getPictureById: async (parent, args) => {
      return await Picture.findById(args.id);
    },
  },
  Mutation: {
    addPicture: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      const newPicture = new Picture(args);
      return newPicture.save();
    },
  },
};
