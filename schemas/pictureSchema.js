import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllPicturesByCarId(car: ID!): [Picture]
    getPictureById(id: ID!): Picture
  }

  extend type Mutation {
    addPicture(
      car: ID!
      user: ID!
      imageFilename: String!
      text: String
    ): Picture
  }

  type Picture {
    id: ID
    car: Car
    user: FetchedUser
    imageFilename: String
    text: String
  }
`;
