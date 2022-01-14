import { gql } from "@apollo/client";

export const lastSurveys = gql`
  query lastSurveys {
    surveys(filter: { merged: null }, limit: 10) {
      id
      lng
      lat
      strength
    }
  }
`;
