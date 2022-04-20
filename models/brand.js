import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const brand = new Schema({
  name: { type: String, unique: true, required: true },
});

export default mongoose.model('Brand', brand);
