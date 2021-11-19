import { gql } from "@apollo/client";

export const updateUser = gql`
  mutation updateUser($id: Int!, $email: String, $role: UserRole) {
    updateUser(data: { id: $id, email: $email, role: $role }) {
      id
      email
      role
    }
  }
`;
