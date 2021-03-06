import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const user = new Schema({
  username: { type: String, unique: true, required: true },
  nickname: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default mongoose.model('User', user);
