import { AuthenticationError } from 'apollo-server-express';
import Picture from '../models/picture';

export default {
  Like: {
    async picture(parent, args) {
      console.log('picture', parent);
      return await Picture.findById(parent.picture);
    },
  },
  Query: {
    getAllPictures: async (parent, args) => {
      return await Picture.find();
    },
    getAllPicturesByCarId: async (parent, args) => {
      return await Picture.find(args);
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
      const newPicture = new Picture({ ...args, user: context.user._id });
      return newPicture.save();
    },
    modifyMyPicture: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      return await Picture.findOneAndUpdate(
        { _id: args.id, user: context.user._id },
        args,
        { new: true }
      );
    },
    deleteMyPicture: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      return await Picture.deleteOne({ _id: args.id, user: context.user._id });
    },
  },
};
