import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllReviewsByCarId(car: ID!): [Review]
    getReviewById(id: ID!): Review
  }

  extend type Mutation {
    addReview(car: ID!, text: String!): Review
    modifyMyReview(id: ID!, text: String!): Review
    deleteMyReview(id: ID!): Review
  }

  type Review {
    id: ID
    car: Car
    user: FetchedUser
    text: String
  }
`;
