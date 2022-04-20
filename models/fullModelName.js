import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fullModelName = new Schema({
  name: { type: String, unique: true, required: true },
});

export default mongoose.model('FullModelName', fullModelName);
