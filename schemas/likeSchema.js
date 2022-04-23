import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllLikesByPictureId(picture: ID!): [Like]
    getLikeByPictureAndUserIds(picture: ID!, user: ID!): Like
  }

  extend type Mutation {
    addLike(picture: ID!, user: ID!): Like
    deleteLike(picture: ID!, user: ID!): Like
  }

  type Like {
    id: ID
    picture: Picture
    user: FetchedUser
  }
`;
