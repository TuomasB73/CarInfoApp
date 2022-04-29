import { AuthenticationError } from 'apollo-server-express';
import Car from '../models/car';
import FullModelName from '../models/fullModelName';
import Brand from '../models/brand';
import Variant from '../models/variant';

export default {
  Review: {
    async car(parent, args) {
      console.log('car', parent);
      return await Car.findById(parent.car);
    },
  },
  Picture: {
    async car(parent, args) {
      console.log('car', parent);
      return await Car.findById(parent.car);
    },
  },
  Query: {
    getAllCars: async (parent, args) => {
      let filters = {};
      if (args.brand) filters.brand = args.brand;
      return await Car.find(filters);
    },
    getCarById: async (parent, args) => {
      return await Car.findById(args.id);
    },
    getCarByFullModelName: async (parent, args) => {
      const fullModelName = await FullModelName.findOne({
        name: args.fullModelName,
      });
      const fullModelNameId = fullModelName.id;
      return await Car.findOne({
        fullModelName: fullModelNameId,
      });
    },
  },
  Mutation: {
    addCar: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      // combine the full car model name of the brand, model and year
      // and do a query to check if the specific car model already exists
      const fullModelName = `${args.brand} ${args.model} (${args.year})`;
      const existingFullModelName = await FullModelName.findOne({
        name: fullModelName,
      });
      // throw an error if the specific car model already exists
      if (existingFullModelName != null) {
        throw new Error('This car model already exists in the database');
      }
      // if the specific car model doesn't exist yet, it will be created
      const newFullModelName = new FullModelName({ name: fullModelName });
      newFullModelName.save();
      const fullModelNameId = newFullModelName.id;

      // check if the car model's brand already exists, if yes, use that id, if not, create it
      let brandId;
      const existingBrand = await Brand.findOne({ name: args.brand });
      if (existingBrand != null) {
        brandId = existingBrand.id;
      } else {
        const newBrand = new Brand({ name: args.brand });
        newBrand.save();
        brandId = newBrand.id;
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
      // create the car with the IDs of the full model name, brand and variants
      const newCar = new Car({
        ...args,
        fullModelName: fullModelNameId,
        brand: brandId,
        variants: variantIds,
      });
      return newCar.save();
    },
    modifyCar: async (parent, args, context) => {
      console.log(context);
      // authorization
      if (!context.user) {
        throw new AuthenticationError('Not authorized');
      }
      // get the current car and full model name from db
      const car = await Car.findById(args.id);
      const fullModelNameId = car.fullModelName;
      const fullModelName = await FullModelName.findById(fullModelNameId);
      // combine the full car model name of the brand, model and year. If the full model name is different from the
      // current one, do a query to check if the specific car model already exists
      const fullModelNameString = `${args.brand} ${args.model} (${args.year})`;
      if (fullModelName.name !== fullModelNameString) {
        const existingFullModelName = await FullModelName.findOne({
          name: fullModelNameString,
        });
        // throw an error if the specific car model already exists
        if (existingFullModelName != null) {
          throw new Error('This car model already exists in the database');
        }
        // if the specific car model doesn't exist yet, the current full model name will be updated
        await FullModelName.findOneAndUpdate(
          { _id: fullModelNameId },
          { name: fullModelNameString }
        );
      }
      // if the brand name is different from the current one, do a query to check if the brand name already exists,
      // if yes, use that ID, if not, create a new one
      const originalBrandId = car.brand;
      const originalBrand = await Brand.findById(originalBrandId);
      let brandId;
      if (originalBrand.name !== args.brand) {
        const existingBrand = await Brand.findOne({ name: args.brand });
        if (existingBrand != null) {
          brandId = existingBrand.id;
        } else {
          const newBrand = new Brand({ name: args.brand });
          newBrand.save();
          brandId = newBrand.id;
        }
      }
      // check for each variant to be updated/added if there is id property in them. If there is, it's an existing variant
      // which will be updated. If there is not, a new variant will be created. All the variant IDs will be added to the array
      const updatedVariantIds = await Promise.all(
        args.variants.map(async (variant) => {
          if ('id' in variant) {
            const updatedVariant = await Variant.findOneAndUpdate(
              { _id: variant.id },
              variant,
              { new: true }
            );
            return updatedVariant.id;
          } else {
            const newVariant = new Variant(variant);
            newVariant.save();
            return newVariant.id;
          }
        })
      );
      // update the car with the IDs of the brand and variants
      const updatedCar = await Car.findOneAndUpdate(
        { _id: args.id },
        { ...args, brand: brandId, variants: updatedVariantIds },
        { new: true }
      );
      // when changing the brand name check if there are any more cars of the old brand, if not, delete the brand
      const carsOfOriginalBrand = await Car.find({
        brand: originalBrandId,
      });
      if (carsOfOriginalBrand.length == 0) {
        await Brand.deleteOne({ _id: originalBrandId });
      }
      return updatedCar;
    },
  },
};
