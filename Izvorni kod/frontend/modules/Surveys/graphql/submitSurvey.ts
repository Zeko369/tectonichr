import { gql } from "@apollo/client";

export const submitSurvey = gql`
  mutation submitSurvey($data: SurveyCreateInput!) {
    submitSurvey(data: $data) {
      id
      lat
      lng
    }
  }
`;
