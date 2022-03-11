import { gql } from "apollo-server";

export default gql`
  type UnFollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    UnFollowUser(username: String!): UnFollowUserResult
  }
`;
