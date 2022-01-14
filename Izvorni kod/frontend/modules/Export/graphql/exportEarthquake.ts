import { gql } from "@apollo/client";

export const exportEarthquake = gql`
  query exportEarthquake($id: Int!, $full: Boolean) {
    exportEarthquake(id: $id, full: $full)
  }
`;
