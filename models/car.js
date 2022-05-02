import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const car = new Schema({
  fullModelName: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'FullModelName',
  },
  brand: { type: mongoose.Types.ObjectId, required: true, ref: 'Brand' },
  model: { type: String, required: true },
  year: { type: Number, required: true, min: 1000, max: 9999 },
  bodyStyles: [
    {
      type: String,
      enum: [
        'hatchback',
        'sedan',
        'coupe',
        'wagon',
        'SUV',
        'truck',
        'sports car',
        'convertible',
        'minivan',
      ],
    },
  ],
  numbersOfDoors: [{ type: Number, min: 1, max: 5 }],
  drivetrains: [
    {
      type: String,
      enum: [
        'front-wheel drive',
        'rear-wheel drive',
        'four-wheel drive',
        'all-wheel drive',
      ],
    },
  ],
  variants: [{ type: mongoose.Types.ObjectId, ref: 'Variant' }],
  defaultImageFilename: String,
});

export default mongoose.model('Car', car);
