import { gql } from 'apollo-server-express';

export default gql`
  type Brand {
    id: ID
    name: String
  }
`;
