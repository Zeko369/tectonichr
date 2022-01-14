import { gql } from "@apollo/client";

export const me = gql`
  query ME {
    me {
      id
      email
      role
      changedPassword
    }
  }
`;
