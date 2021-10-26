import { gql } from "urql";

export const getUsers = gql`
  query USERS {
    users {
      id
      email
    }
  }
`;
