import { gql } from "@apollo/client";

export const deleteSurvey = gql`
  mutation deleteSurvey($id: Int!) {
    deleteSurvey(id: $id)
  }
`;
