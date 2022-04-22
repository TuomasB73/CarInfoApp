import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const picture = new Schema({
  car: { type: mongoose.Types.ObjectId, required: true, ref: 'Car' },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  imageFilename: { type: String, unique: true, required: true },
  text: String,
});

export default mongoose.model('Picture', picture);
