import { gql } from "@apollo/client";

export const deleteUser = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(data: { id: $id })
  }
`;
