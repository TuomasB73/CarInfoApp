import { AuthenticationError } from 'apollo-server-express';
import Car from '../models/car';
import FullModelName from '../models/fullModelName';
import Brand from '../models/brand';
import Model from '../models/model';

export default {
  Query: {
    getAllCars: async (parent, args) => {
      return await Car.find();
    },
    getCarById: async (parent, args) => {
      return await Car.findById(args.id);
    },
  },
  Mutation: {
    addCar: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      const fullModelName = `${args.brand} ${args.model} (${args.year})`;
      const existingFullModelName = await FullModelName.find({
        name: fullModelName,
      });
      if (existingFullModelName.length > 0) {
        throw new Error('This car model already exists in the database');
      }
      const newFullModelName = new FullModelName({ name: fullModelName });
      newFullModelName.save();
      const fullModelNameId = newFullModelName.id;

      let brandId;
      const existingBrand = await Brand.find({ name: args.brand });
      if (existingBrand.length > 0) {
        brandId = existingBrand[0].id;
      } else {
        const newBrand = new Brand({ name: args.brand });
        newBrand.save();
        brandId = newBrand.id;
      }

      const model = `${args.model} (${args.year})`;
      const newModel = new Model({ name: model });
      newModel.save();
      const modelId = newModel.id;

      const newCar = new Car({
        ...args,
        brand: brandId,
        model: modelId,
        fullModelName: fullModelNameId,
      });
      return newCar.save();
    },
  },
};
