import { gql } from "@apollo/client";

export const deleteEarthquake = gql`
  mutation deleteEarthquake($id: Int!, $removeSurveys: Boolean) {
    deleteEarthquake(id: $id, removeSurveys: $removeSurveys)
  }
`;
