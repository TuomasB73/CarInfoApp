import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllPicturesByCarId(car: ID!): [Picture]
    getPictureById(id: ID!): Picture
  }

  extend type Mutation {
    addPicture(car: ID!, imageFilename: String!, text: String): Picture
    modifyMyPicture(id: ID!, text: String): Picture
    deleteMyPicture(id: ID!): Picture
  }

  type Picture {
    id: ID
    car: Car
    user: FetchedUser
    imageFilename: String
    text: String
  }
`;
