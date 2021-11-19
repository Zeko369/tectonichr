import { gql } from "@apollo/client";

export const getUsers = gql`
  query USERS {
    users {
      id
      email
      role
    }
  }
`;
