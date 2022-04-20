import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const model = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Model', model);
