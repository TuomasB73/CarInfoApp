import { gql } from 'apollo-server-express';

export default gql`
  type Variant {
    id: ID
    fuelType: String
    engineDisplacement: String
    transmission: String
    powerHp: Int
    acceleration0_100KmhS: Float
    fuelConsumptionL100Km: Float
    co2EmissionsGkm: Int
  }

  input VariantInput {
    fuelType: String
    engineDisplacement: String
    transmission: String
    powerHp: Int
    acceleration0_100KmhS: Float
    fuelConsumptionL100Km: Float
    co2EmissionsGkm: Int
  }
`;
