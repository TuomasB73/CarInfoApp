import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const review = new Schema({
  car: { type: mongoose.Types.ObjectId, required: true, ref: 'Car' },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
});

export default mongoose.model('Review', review);
