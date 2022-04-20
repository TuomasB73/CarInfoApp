import Model from '../models/model';

export default {
  Car: {
    async model(parent, args) {
      console.log('model', parent);
      return await Model.findById(parent.model);
    },
  },
};
