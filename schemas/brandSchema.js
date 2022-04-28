import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getAllBrands: [Brand]
  }

  type Brand {
    id: ID
    name: String
  }
`;
