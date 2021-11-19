import { gql } from "@apollo/client";

export const createUser = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(data: { email: $email, password: $password }) {
      id
      email
      role
    }
  }
`;
