import { gql } from 'apollo-server-express';

export default gql`
  type FullModelName {
    id: ID
    name: String
  }
`;
