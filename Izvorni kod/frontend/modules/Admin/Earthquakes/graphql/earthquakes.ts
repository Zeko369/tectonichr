import { gql } from "@apollo/client";

export const earthquakes = gql`
  query EARTHQUAKES($archived: Boolean, $filter: String) {
    earthquakes(archived: $archived, filter: $filter) {
      id
      name
      date
      archivedAt
      strength
      surveys {
        id
      }
    }
  }
`;
