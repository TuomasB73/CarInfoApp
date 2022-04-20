import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user(id: ID!): FetchedUser
    login(username: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(username: String!, password: String!, nickname: String): User
  }

  type User {
    id: ID
    username: String
    nickname: String
    token: String
  }

  type FetchedUser {
    id: ID
    nickname: String
  }
`;
