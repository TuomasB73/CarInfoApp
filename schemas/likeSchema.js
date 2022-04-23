import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllLikesByPictureId(picture: ID!): [Like]
    getAllMyLikes: [Like]
  }

  extend type Mutation {
    addLike(picture: ID!): Like
    deleteMyLike(picture: ID!): Like
  }

  type Like {
    id: ID
    picture: Picture
    user: FetchedUser
  }
`;
