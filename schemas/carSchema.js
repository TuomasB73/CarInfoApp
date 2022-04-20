import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllCars: [Car]
    getCarById(id: ID!): Car
    getCarByFullModelName(fullModelName: ID!): Car
  }

  extend type Mutation {
    addCar(
      brand: String!
      model: String!
      year: Int!
      bodyStyle: [String]
      numberOfDoors: [Int]
      fuelType: [String]
      engineDisplacement: [String]
      power: String
      drivetrain: [String]
      transmission: [String]
      acceleration0_100Kmh: String
      fuelConsumption: String
      co2Emissions: String
    ): Car
  }

  type Car {
    id: ID
    brand: Brand
    model: Model
    year: Int
    fullModelName: FullModelName
    bodyStyle: [String]
    numberOfDoors: [Int]
    fuelType: [String]
    engineDisplacement: [String]
    power: String
    drivetrain: [String]
    transmission: [String]
    acceleration0_100Kmh: String
    fuelConsumption: String
    co2Emissions: String
  }
`;
