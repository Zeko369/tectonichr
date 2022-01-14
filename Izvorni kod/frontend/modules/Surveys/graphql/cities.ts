import { gql } from "@apollo/client";

export const cities = gql`
  query cities($name: String!) {
    cities(filter: $name) {
      id
      name
      latitude
      longitude
      state_name
    }
  }
`;
