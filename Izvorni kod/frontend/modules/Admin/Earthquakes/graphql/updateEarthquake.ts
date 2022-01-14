import { gql } from "@apollo/client";

export const updateEarthquake = gql`
  mutation updateEarthquake(
    $id: Int!
    $name: String
    $add: [Int!]
    $remove: [Int!]
  ) {
    updateEarthquake(
      id: $id
      data: { name: $name, addSurveyIds: $add, removeSurveyIds: $remove }
    ) {
      id
      name
      surveys {
        id
      }
    }
  }
`;
