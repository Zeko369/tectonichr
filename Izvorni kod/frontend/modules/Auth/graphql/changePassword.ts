import { gql } from "@apollo/client";

export const changePassword = gql`
  mutation changePassword($password: String!) {
    changePassword(password: $password) {
      id
      changedPassword
    }
  }
`;
