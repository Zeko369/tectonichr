import { gql } from "@apollo/client";

export const submitSurvey = gql`
  mutation submitSurvey {
    submitSurvey(data: { lat: 0, lng: 0 }) {
      id
      lat
      lng
    }
  }
`;
