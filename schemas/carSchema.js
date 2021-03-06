import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllCars(brand: ID): [Car]
    getCarById(id: ID!): Car
    getCarByFullModelName(fullModelName: String!): Car
  }

  extend type Mutation {
    addCar(
      brand: String!
      model: String!
      year: Int!
      bodyStyles: [String]
      numbersOfDoors: [Int]
      drivetrains: [String]
      variants: [VariantInput]
      defaultImageFilename: String
    ): Car

    modifyCar(
      id: ID
      brand: String
      model: String
      year: Int
      bodyStyles: [String]
      numbersOfDoors: [Int]
      drivetrains: [String]
      variants: [VariantInput]
      defaultImageFilename: String
    ): Car
  }

  type Car {
    id: ID
    fullModelName: FullModelName
    brand: Brand
    model: String
    year: Int
    bodyStyles: [String]
    numbersOfDoors: [Int]
    drivetrains: [String]
    variants: [Variant]
    defaultImageFilename: String
  }
`;
