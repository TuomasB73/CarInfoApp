import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const car = new Schema({
  brand: { type: mongoose.Types.ObjectId, required: true, ref: 'Brand' },
  model: { type: mongoose.Types.ObjectId, required: true, ref: 'Model' },
  year: { type: Number, required: true, min: 1000, max: 9999 },
  fullModelName: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'FullModelName',
  },
  bodyStyle: [
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
  numberOfDoors: [{ type: Number, min: 1, max: 5 }],
  fuelType: [
    {
      type: String,
      enum: [
        'gasoline',
        'diesel',
        'hybrid',
        'plug-in hybrid',
        'electric',
        'hydrogen',
        'ethanol',
      ],
    },
  ],
  engineDisplacement: [String],
  power: String,
  drivetrain: [
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
  transmission: [String],
  acceleration0_100Kmh: String,
  fuelConsumption: String,
  co2Emissions: String,
});

export default mongoose.model('Car', car);
