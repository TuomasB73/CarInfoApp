import FullModelName from '../models/fullModelName';

export default {
  Car: {
    async fullModelName(parent, args) {
      console.log('fullModelName', parent);
      return await FullModelName.findById(parent.fullModelName);
    },
  },
};
