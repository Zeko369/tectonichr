import { gql } from "@apollo/client";

export const earthquakes = gql`
  query EARTHQUAKES {
    earthquakes {
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
