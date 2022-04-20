import { gql } from 'apollo-server-express';

export default gql`
  type Model {
    id: ID
    name: String
  }
`;
