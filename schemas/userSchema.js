import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getUserById(id: ID!): FetchedUser
    login(username: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(username: String!, nickname: String!, password: String!): User
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
