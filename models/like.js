import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const like = new Schema({
  picture: { type: mongoose.Types.ObjectId, required: true, ref: 'Picture' },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

export default mongoose.model('Like', like);
