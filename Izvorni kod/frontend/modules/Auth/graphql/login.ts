import { gql } from "@apollo/client";

export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      id
      email
      token
    }
  }
`;
