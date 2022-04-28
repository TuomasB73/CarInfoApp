import Brand from '../models/brand';

export default {
  Car: {
    async brand(parent, args) {
      console.log('brand', parent);
      return await Brand.findById(parent.brand);
    },
  },
  Query: {
    getAllBrands: async (parent, args) => {
      return await Brand.find();
    },
  },
};
