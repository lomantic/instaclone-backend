import { gql } from "apollo-server";

export default gql`
  type Mutation {
    UnFollowUser(username: String!): MutationResponse
  }
`;
