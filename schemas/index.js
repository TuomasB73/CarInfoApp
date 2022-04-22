import { gql } from 'apollo-server-express';
import brandSchema from './brandSchema';
import carSchema from './carSchema';
import fullModelNameSchema from './fullModelNameSchema';
import pictureSchema from './pictureSchema';
import reviewSchema from './reviewSchema';
import userSchema from './userSchema';
import variantSchema from './variantSchema';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  linkSchema,
  brandSchema,
  carSchema,
  fullModelNameSchema,
  pictureSchema,
  reviewSchema,
  userSchema,
  variantSchema,
];
