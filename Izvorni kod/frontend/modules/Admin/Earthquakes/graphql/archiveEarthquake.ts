import { gql } from "@apollo/client";

export const archiveEarthquake = gql`
  mutation archiveEarthquake($id: Int!) {
    archiveEarthquake(id: $id) {
      id
      archivedAt
    }
  }
`;
