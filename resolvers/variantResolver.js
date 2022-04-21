import Variant from '../models/variant';

export default {
  Car: {
    async variants(parent, args) {
      console.log('variants', parent);
      return await Variant.find({ _id: { $in: parent.variants } });
    },
  },
};
