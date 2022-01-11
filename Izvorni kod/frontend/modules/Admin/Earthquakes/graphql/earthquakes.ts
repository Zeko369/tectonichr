import { gql } from "@apollo/client";

export const earthquakes = gql`
  query EARTHQUAKES($archived: Boolean) {
    earthquakes(archived: $archived) {
      id
      name
      date
      archivedAt
      surveys {
        id
      }
    }
  }
`;
