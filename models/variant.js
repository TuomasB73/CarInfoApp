import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const variant = new Schema({
  fuelType: {
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
  engineDisplacement: String,
  transmission: String,
  powerHp: { type: Number, min: 1, max: 9999 },
  acceleration0_100KmhS: { type: Number, min: 0.1, max: 60 },
  fuelConsumptionL100Km: { type: Number, min: 0, max: 99 },
  co2EmissionsGkm: { type: Number, min: 0, max: 999 },
});

export default mongoose.model('Variant', variant);
