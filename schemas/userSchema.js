import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getUserById(id: ID!): FetchedUser
    getMyUser: User
    login(username: String!, password: String!): User
    checkIsUsernameAvailable(username: String!): Boolean
    checkIsNicknameAvailable(nickname: String!): Boolean
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
