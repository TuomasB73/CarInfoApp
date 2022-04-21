import { AuthenticationError } from 'apollo-server-express';
import Car from '../models/car';
import FullModelName from '../models/fullModelName';
import Brand from '../models/brand';
import Model from '../models/model';
import Variant from '../models/variant';

export default {
  Query: {
    getAllCars: async (parent, args) => {
      return await Car.find();
    },
    getCarById: async (parent, args) => {
      return await Car.findById(args.id);
    },
    getCarByFullModelName: async (parent, args) => {
      const fullModelNames = await FullModelName.find({
        name: args.fullModelName,
      });
      const fullModelNameId = fullModelNames[0]._id;
      const cars = await Car.find({
        fullModelName: fullModelNameId,
      });
      return cars[0];
    },
  },
  Mutation: {
    addCar: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      // combine the full car model name of the brand, model and year,
      // and do a query to check if the specific car model already exists
      const fullModelName = `${args.brand} ${args.model} (${args.year})`;
      const existingFullModelNames = await FullModelName.find({
        name: fullModelName,
      });
      // throw an error if the specific car model already exists
      if (existingFullModelNames.length > 0) {
        throw new Error('This car model already exists in the database');
      }
      // if the specific car model doesn't exist yet, it will be created
      const newFullModelName = new FullModelName({ name: fullModelName });
      newFullModelName.save();
      const fullModelNameId = newFullModelName.id;

      // check if the car model's brand already exists, if yes, use that id, if not, create it
      let brandId;
      const existingBrands = await Brand.find({ name: args.brand });
      if (existingBrands.length > 0) {
        brandId = existingBrands[0].id;
      } else {
        const newBrand = new Brand({ name: args.brand });
        newBrand.save();
        brandId = newBrand.id;
      }

      // check if the car's model name already exists, if yes, use that id, if not, create it
      let modelId;
      const existingModels = await Model.find({ name: args.model });
      if (existingModels.length > 0) {
        modelId = existingModels[0].id;
      } else {
        const newModel = new Model({ name: args.model });
        newModel.save();
        modelId = newModel.id;
      }

      // create all the variants provided in args and add their IDs to the array
      const variantIds = [];
      const variants = args.variants;
      variants.forEach(async (variant) => {
        const newVariant = new Variant(variant);
        newVariant.save();
        const variantId = newVariant.id;
        variantIds.push(variantId);
      });

      // create the car with the IDs of the full model name, brand, model and variants
      const newCar = new Car({
        ...args,
        fullModelName: fullModelNameId,
        brand: brandId,
        model: modelId,
        variants: variantIds,
      });
      return newCar.save();
    },
  },
};
