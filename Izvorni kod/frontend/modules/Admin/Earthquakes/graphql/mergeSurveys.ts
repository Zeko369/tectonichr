import { gql } from "@apollo/client";

export const mergeSurveys = gql`
  mutation mergeSurveys($surveyIds: [Int!]!, $name: String!) {
    mergeSurveys(data: { surveyIds: $surveyIds, name: $name }) {
      id
      name
    }
  }
`;
